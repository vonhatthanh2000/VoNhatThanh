import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateResourceDto } from './dto/create-resource.dto';
import { UpdateResourceDto } from './dto/update-resource.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Resource } from 'database/entities';
import { Repository } from 'typeorm';
import { ResourceResponse } from './dto/resource.response';
import { plainToInstance } from 'class-transformer';
import { PageDto, PageMetaDto, PageOptionsDto } from 'src/common/dto';
import { FilterResource } from './dto';

@Injectable()
export class ResourceService {
  constructor(
    @InjectRepository(Resource)
    private readonly resourceRepository: Repository<Resource>,
  ) {}

  async create(
    createResourceDto: CreateResourceDto,
    userId: string,
  ): Promise<ResourceResponse> {
    const resourceInput = this.resourceRepository.create({
      ...createResourceDto,
      createdById: userId,
    });

    await this.resourceRepository.save(resourceInput);

    return this.getDetailResource(resourceInput.id);
  }

  async getDetailResource(id: string): Promise<ResourceResponse> {
    const resource = await this.resourceRepository
      .createQueryBuilder('resources')
      .leftJoinAndSelect('resources.creator', 'creator')
      .where('resources.id = :id', { id })
      .getOne();

    if (!resource) {
      throw new NotFoundException('Resource not found');
    }

    return plainToInstance(ResourceResponse, resource);
  }

  async getUserResources(
    pageOptions: PageOptionsDto,
    filter: FilterResource,
    userId: string,
  ): Promise<PageDto<ResourceResponse>> {
    const { page, take, skip, sort, sortDirection } = pageOptions;

    const resourceQuery = this.resourceRepository
      .createQueryBuilder('resources')
      .leftJoinAndSelect('resources.creator', 'creator')
      .take(take)
      .skip(skip);

    resourceQuery.orderBy(
      `resources.${sort || 'createdAt'}`,
      sortDirection || 'DESC',
    );

    if (filter) {
      const { searchName, type } = filter;

      if (searchName) {
        const formattedQuery = searchName.trim().replace(/ /g, ' & ');
        const query = searchName ? `${formattedQuery}:*` : formattedQuery;
        resourceQuery.where(
          "resources.search_vector @@ to_tsquery('simple',:query)",
          {
            query,
          },
        );
      }

      if (type) {
        resourceQuery.andWhere('resources.type = :type', { type });
      }

      resourceQuery.andWhere('resources.createdById = :userId', { userId });

      const [{ entities }, itemCount] = await Promise.all([
        resourceQuery.getRawAndEntities(),
        resourceQuery.getCount(),
      ]);

      const data = entities.map((entity) => {
        return plainToInstance(ResourceResponse, entity);
      });

      const pageMeta = new PageMetaDto({
        take: take,
        page: page,
        itemCount,
      });

      return new PageDto(data, pageMeta);
    }
  }

  async getAllResources(
    pageOptions: PageOptionsDto,
    filter: FilterResource,
  ): Promise<PageDto<ResourceResponse>> {
    const { page, take, skip, sort, sortDirection } = pageOptions;

    const resourceQuery = this.resourceRepository
      .createQueryBuilder('resources')
      .leftJoinAndSelect('resources.creator', 'creator')
      .take(take)
      .skip(skip);

    resourceQuery.orderBy(
      `resources.${sort || 'createdAt'}`,
      sortDirection || 'DESC',
    );

    if (filter) {
      const { searchName, type } = filter;

      if (searchName) {
        const formattedQuery = searchName.trim().replace(/ /g, ' & ');
        const query = searchName ? `${formattedQuery}:*` : formattedQuery;
        resourceQuery.where(
          "resources.search_vector @@ to_tsquery('simple',:query)",
          {
            query,
          },
        );
      }

      if (type) {
        resourceQuery.andWhere('resources.type = :type', { type });
      }

      const [{ entities }, itemCount] = await Promise.all([
        resourceQuery.getRawAndEntities(),
        resourceQuery.getCount(),
      ]);

      const data = entities.map((entity) => {
        return plainToInstance(ResourceResponse, entity);
      });

      const pageMeta = new PageMetaDto({
        take: take,
        page: page,
        itemCount,
      });

      return new PageDto(data, pageMeta);
    }
  }

  async update(
    id: string,
    updateResourceDto: UpdateResourceDto,
  ): Promise<ResourceResponse> {
    const updated = await this.resourceRepository.update(id, updateResourceDto);
    if (!updated.affected) {
      return null;
    }
    return this.getDetailResource(id);
  }

  async remove(id: string): Promise<boolean> {
    const resource = this.resourceRepository.delete(id);
    return resource.then((res) => res.affected > 0);
  }
}

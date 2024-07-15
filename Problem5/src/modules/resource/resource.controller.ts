import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
} from '@nestjs/common';
import { ResourceService } from './resource.service';
import { CreateResourceDto } from './dto/create-resource.dto';
import { UpdateResourceDto } from './dto/update-resource.dto';
import { JwtAuthGuard } from '../auth/guard/jwt.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { User } from 'database/entities';
import { ResourceResponse } from './dto/resource.response';
import { PageDto, PageOptionsDto } from 'src/common/dto';
import { FilterResource } from './dto';
import { Roles } from 'src/common/decorators/has-role.decorator';
import { UserRole } from 'src/common/enums';
import { RolesGuard } from '../auth/guard/role.guard';

@Controller('resource')
@ApiTags('Resources')
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiBearerAuth('access-token')
export class ResourceController {
  constructor(private readonly resourceService: ResourceService) {}

  @Post()
  create(
    @Body() createResourceDto: CreateResourceDto,
    @CurrentUser() user: User,
  ): Promise<ResourceResponse> {
    return this.resourceService.create(createResourceDto, user.id);
  }

  @Get('')
  @Roles(UserRole.ADMIN)
  getAllResources(
    @Query() pageOptions: PageOptionsDto,
    @Query() filter: FilterResource,
  ): Promise<PageDto<ResourceResponse>> {
    return this.resourceService.getAllResources(pageOptions, filter);
  }

  @Get('me')
  @Roles(UserRole.USER)
  getUserResources(
    @Query() pageOptions: PageOptionsDto,
    @Query() filter: FilterResource,
    @CurrentUser() user: User,
  ): Promise<PageDto<ResourceResponse>> {
    return this.resourceService.getUserResources(pageOptions, filter, user.id);
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<ResourceResponse> {
    return this.resourceService.getDetailResource(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateResourceDto: UpdateResourceDto,
  ): Promise<ResourceResponse> {
    return this.resourceService.update(id, updateResourceDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<boolean> {
    return this.resourceService.remove(id);
  }
}

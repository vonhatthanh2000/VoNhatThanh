import { User } from 'database/entities/user.entity';
import { ResourceType, UserRole } from 'src/common/enums';
import { DataSource } from 'typeorm';
import { Seeder } from 'typeorm-extension';
import * as ResourceInput from './sample-resource.json';
import { faker } from '@faker-js/faker';
import { Resource } from 'database/entities';

export default class ResourceSeed implements Seeder {
  private async createResource(appDataSource: DataSource): Promise<any> {
    const userIds = await appDataSource
      .getRepository(User)
      .find({
        where: {
          role: UserRole.USER,
        },
      })
      .then((users) => {
        return users.map((user) => user.id);
      });

    const { ResourceName, ResourceDescription } = ResourceInput;

    for (let i = 0; i < 100; i++) {
      const resourceInput = {
        createdById: faker.helpers.arrayElement(userIds),
        name: faker.helpers.arrayElement(ResourceName),
        description: faker.helpers.arrayElement(ResourceDescription),
        type: faker.helpers.enumValue(ResourceType),
      };

      try {
        await appDataSource
          .createQueryBuilder()
          .insert()
          .into(Resource)
          .values(resourceInput)
          .execute();
      } catch (error: any) {
        throw new Error(error);
      }
    }
  }

  public async run(appDataSource: DataSource): Promise<any> {
    try {
      await this.createResource(appDataSource);
    } catch (error: any) {
      throw new Error(error);
    }
  }
}

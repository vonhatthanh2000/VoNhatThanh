import { DataSource } from 'typeorm';
import { Seeder, runSeeder } from 'typeorm-extension';
import UserSeed from './user.seed';
import ResourceSeed from './resource.seed';

export class MainSeeder implements Seeder {
  async run(dataSource: DataSource): Promise<void> {
    await runSeeder(dataSource, UserSeed);
    await runSeeder(dataSource, ResourceSeed);
  }
}

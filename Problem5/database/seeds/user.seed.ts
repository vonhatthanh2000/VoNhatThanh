import { User } from 'database/entities/user.entity';
import { UserRole } from 'src/common/enums';
import { DataSource } from 'typeorm';
import { Seeder } from 'typeorm-extension';
import * as bcrypt from 'bcrypt';

export default class UserSeed implements Seeder {
  private async createUser(appDataSource: DataSource): Promise<any> {
    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash('12345678', salt);

    const adminInput = {
      name: 'Admin',
      email: 'admin@gmail.com',
      password: hashPassword,
      role: UserRole.ADMIN,
    };

    const userInput = [];

    for (let i = 1; i < 5; i++) {
      userInput.push({
        name: `User ${i}`,
        email: `user${i}@gmail.com`,
        password: hashPassword,
        role: UserRole.USER,
      });
    }

    try {
      await appDataSource
        .createQueryBuilder()
        .insert()
        .into(User)
        .values([adminInput, ...userInput])
        .execute();
    } catch (error: any) {
      throw new Error(error);
    }
  }

  public async run(appDataSource: DataSource): Promise<any> {
    try {
      await this.createUser(appDataSource);
    } catch (error: any) {
      throw new Error(error);
    }
  }
}

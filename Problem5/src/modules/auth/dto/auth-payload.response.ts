import { Exclude, Expose } from 'class-transformer';
import { UserRole } from 'src/common/enums';

@Exclude()
export class AuthPayloadResponse {
  @Expose()
  id: string;

  @Expose()
  name: string;

  @Expose()
  email: string;

  @Expose()
  role: UserRole;
}

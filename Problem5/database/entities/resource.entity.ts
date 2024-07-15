import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';
import { BaseEntity } from './base.entity';
import { User } from './user.entity';
import { ResourceType } from 'src/common/enums';
import { AuthPayloadResponse } from 'src/modules/auth/dto';
import { Type } from 'class-transformer';

@Entity()
export class Resource extends BaseEntity {
  @Column()
  name: string;

  @Column()
  description: string;

  @Column({ type: 'enum', enum: ResourceType, default: ResourceType.VIDEO })
  type: ResourceType;

  @Column()
  createdById: string;

  @JoinColumn({ name: 'created_by_id' })
  @ManyToOne(() => User)
  @Type(() => AuthPayloadResponse)
  creator: AuthPayloadResponse;

  @Column({
    type: 'tsvector',
    generatedType: 'STORED',
    asExpression: "to_tsvector('simple', name)",
    select: false,
    nullable: true,
  })
  @Index('candidate_search_vector_idx', { synchronize: false })
  search_vector: string;
}

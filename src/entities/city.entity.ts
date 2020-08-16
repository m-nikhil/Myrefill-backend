import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  Index,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { State } from './state.entity';

/**
 * Represents City
 */
@Entity()
@Index(['name', 'stateId'], { unique: true })
export class City {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ type: 'uuid', nullable: true })
  stateId: string;

  @ManyToOne(() => State)
  @JoinColumn({ name: 'stateId' })
  state: State;

  @Column()
  lastUpdatedBy: string;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  @DeleteDateColumn({ type: 'timestamp' })
  deletedAt: Date;
}

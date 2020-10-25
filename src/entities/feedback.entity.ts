import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  JoinColumn,
  OneToOne,
} from 'typeorm';
import { User } from './user.entity';
import { Transaction } from './transaction.entity';

enum Rating {
  unrecognized = 'unrecognized',
  one = 'one star',
  two = 'two star',
  three = 'three star',
  four = 'four star',
  five = 'five star',
}

/**
 * Represents Feedback
 */
@Entity()
export class Feedback {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid' })
  transactionId: string;

  @OneToOne(() => User)
  @JoinColumn({ name: 'transactionId' })
  transaction: Transaction;

  @Column()
  comment: string;

  @Column({ type: 'enum', enum: Rating })
  rating: Rating;

  @Column()
  lastUpdatedBy: string;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  @DeleteDateColumn({ type: 'timestamp' })
  deletedAt: Date;
}

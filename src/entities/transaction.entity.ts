import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { Station } from './station.entity';
import { User } from './user.entity';

enum Status {
  unrecognized,
  success,
  failure,
}

enum PaymentMethod {
  unrecognized,
  razorpay,
}

/**
 * Represents Transaction
 */
@Entity()
export class Transaction {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid', nullable: true })
  stationId: string;

  @ManyToOne(() => Station)
  @JoinColumn({ name: 'stationId' })
  station: Station;

  @Column({ type: 'uuid', nullable: true })
  userId: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'userId' })
  user: User;

  @Column()
  numberOfHalfLitres: number;

  @Column()
  totalPrice: number;

  @Column()
  razorpayPaymentId: string;

  @Column()
  razorpayOrderId: string;

  @Column()
  razorpaySignature: string;

  @Column({ type: 'enum', enum: Status })
  status: Status;

  @Column({ type: 'enum', enum: PaymentMethod })
  paymentMethod: PaymentMethod;

  @Column()
  lastUpdatedBy: string;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  @DeleteDateColumn({ type: 'timestamp' })
  deletedAt: Date;
}

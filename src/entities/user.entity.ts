import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  Index,
  UpdateDateColumn,
  DeleteDateColumn,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { City } from './city.entity';
import { State } from './state.entity';

/**
 * Represents User
 */
@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Index({ unique: true })
  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  fullname: string;

  @Column()
  phoneNumber: string;

  @Column()
  razorpayCustomerId: string;

  @Column({ type: 'float', default: 0 })
  CO2saved: number;

  @Column({ type: 'float', default: 0 })
  bottlesSaved: number;

  @Column({ type: 'float', default: 0 })
  plasticSaved: number;

  @Column({nullable: true})
  stateId: string;

  @ManyToOne(() => State)
  @JoinColumn({ name: 'stateId' })
  state: State;

  @Column({nullable: true})
  cityId: string;

  @ManyToOne(()=>City)
  @JoinColumn({name:'cityId'})
  city: City

  @Column()
  lastUpdatedBy: string;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  @DeleteDateColumn({ type: 'timestamp' })
  deletedAt: Date;

  @Column({nullable: true})
  emailOTP: string;

  @Column({nullable: true})
  token: string;
}

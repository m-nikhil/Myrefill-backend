import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { State } from './state.entity';
import { City } from './city.entity';

/**
 * Represents Station
 */
@Entity()
export class Station {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  description: string;

  @Column()
  address: string;

  @Column()
  area: string;

  @Column()
  pincode: number;

  @Column({ default: true })
  open: boolean;

  @Column()
  managerName: string;

  @Column()
  mobileNumber1: string;

  @Column({ nullable: true })
  mobileNumber2: string;

  @Column({ nullable: true })
  landlineNumber: string;

  @Column()
  email: string;

  @Column({ nullable: true })
  carpetArea: string;

  @Column({ type: 'uuid' })
  stateId: string;

  @Column({ type: 'uuid' })
  cityId: string;

  @ManyToOne(() => State)
  @JoinColumn({ name: 'stateId' })
  state: State;

  @ManyToOne(() => City)
  @JoinColumn({ name: 'cityId' })
  city: City;

  @Column()
  storeType: string;

  @Column()
  typeOfWater: string;

  @Column()
  mondayTiming: string;

  @Column()
  tuesdayTiming: string;

  @Column()
  wednesdayTiming: string;

  @Column()
  thursdayTiming: string;

  @Column()
  fridayTiming: string;

  @Column()
  saturdayTiming: string;

  @Column()
  sundayTiming: string;

  @Column({ type: 'decimal' })
  latitude: number;

  @Column({ type: 'decimal' })
  longitude: number;

  @Column({ type: 'float', default: 0 })
  CO2saved: number;

  @Column({ type: 'float', default: 0 })
  bottlesSaved: number;

  @Column({ type: 'float', default: 0 })
  plasticSaved: number;

  @Column({ type: 'float', default: 0 })
  pricePerHalfLitre: number;

  @Column()
  lastUpdatedBy: string;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  @DeleteDateColumn({ type: 'timestamp' })
  deletedAt: Date;
}

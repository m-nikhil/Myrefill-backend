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

  @Column({ nullable: true })
  mondayTiming: string;

  @Column({ nullable: true })
  tuesdayTiming: string;

  @Column({ nullable: true })
  wednesdayTiming: string;

  @Column({ nullable: true })
  thursdayTiming: string;

  @Column({ nullable: true })
  fridayTiming: string;

  @Column({ nullable: true })
  saturdayTiming: string;

  @Column({ nullable: true })
  sundayTiming: string;

  @Column({type: 'json',nullable: true})
  timings: string;

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
  pricePerLitre: number;

  @Column({ type: 'float', default: 0 })
  cafeSharePerLitre: number;

  @Column({ type: 'float', default: 0 })
  ourSharePerLitre: number;

  @Column({ type: 'float', default: 0 })
  cafeSharePerHalfLitre: number;

  @Column({ type: 'float', default: 0 })
  ourSharePerHalfLitre: number;

  @Column({ type: 'float', default: 0 })
  pricePerHalfLitre: number;

  @Column({ nullable: true, unique: true })
  awsToken: string;

  @Column({ default: true })
  isActive: boolean;

  @Column()
  lastUpdatedBy: string;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  @DeleteDateColumn({ type: 'timestamp' })
  deletedAt: Date;
}

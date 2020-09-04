import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  PrimaryColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { Station } from './station.entity';

/**
 * Represents Station Metric
 *
 * one-one primary relation creates reductant unique contraint
 * Ref: https://github.com/typeorm/typeorm/issues/6670
 */
@Entity()
export class StationMetric {
  @PrimaryColumn('uuid')
  stationId: string;

  @OneToOne(() => Station, { primary: true })
  @JoinColumn({ name: 'stationId' })
  station: Station;

  @Column({ default: 0 })
  numberOfUsers: number;

  @Column({ default: 0 })
  lifetimeHalfLitres: number;

  @Column()
  lastUpdatedBy: string;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  @DeleteDateColumn({ type: 'timestamp' })
  deletedAt: Date;
}

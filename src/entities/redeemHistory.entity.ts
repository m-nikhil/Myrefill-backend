import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    DeleteDateColumn,
    JoinColumn,
    OneToOne,
    ManyToOne,
} from 'typeorm';
import { Station } from './station.entity';
import { StationCoupon } from './stationCoupon.entity';
import { User } from './user.entity';

/**
 * Represents Complaint
 */
@Entity()
export class RedeemHistory {
@PrimaryGeneratedColumn('uuid')
id: string;

@Column({ type: 'uuid' })
userId: string;

@ManyToOne(() => User)
@JoinColumn({ name: 'userId' })
user: User;

@Column({ type: 'uuid', nullable: true })
stationId: string;

@ManyToOne(() => Station)
@JoinColumn({ name: 'stationId' })
station: Station;

@Column({ type: 'uuid' })
couponId: string;

@ManyToOne(() => StationCoupon)
@JoinColumn({ name: 'couponId' })
coupon: StationCoupon;

@Column()
redeemPoints: number;

@Column({})
redeemDate: Date;

@Column()
lastUpdatedBy: string;

@CreateDateColumn({ type: 'timestamp' })
createdAt: Date;

@UpdateDateColumn({ type: 'timestamp' })
updatedAt: Date;

@DeleteDateColumn({ type: 'timestamp' })
deletedAt: Date;
}
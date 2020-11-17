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

/**
 * Represents Complaint
 */
@Entity()
export class Coupon {
@PrimaryGeneratedColumn('uuid')
id: string;

@Column({ type: 'uuid' })
userId: string;

@OneToOne(() => User)
@JoinColumn({ name: 'userId' })
user: User;

@Column()
points: number;

@Column()
lastUpdatedBy: string;

@CreateDateColumn({ type: 'timestamp' })
createdAt: Date;

@UpdateDateColumn({ type: 'timestamp' })
updatedAt: Date;

@DeleteDateColumn({ type: 'timestamp' })
deletedAt: Date;
}

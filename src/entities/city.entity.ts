import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    DeleteDateColumn,
    Index,
  } from 'typeorm';
  
  /**
   * Represents City
   */
  @Entity()
  export class City {
    @PrimaryGeneratedColumn('uuid')
    id: string;
  
    @Index({ unique: true })
    @Column()
    name: string;
  
    @Column()
    lastUpdatedBy: string;
  
    @CreateDateColumn({ type: 'timestamp' })
    createdAt: Date;
  
    @UpdateDateColumn({ type: 'timestamp' })
    updatedAt: Date;
  
    @DeleteDateColumn({ type: 'timestamp' })
    deletedAt: Date;
  }
  
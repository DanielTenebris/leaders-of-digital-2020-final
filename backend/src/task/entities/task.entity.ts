import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('task')
export class TaskEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column('varchar')
    title: string;
    
    @Column('varchar', { nullable: true })
    desc: string;

    @Column('timestamp', { nullable: true })
    deadline: Date;
    
    @Column('timestamp', { nullable: true })
    finishDate: Date;

    @Column('smallint', { name: 'worker', array: true })
    workerId: Array<number>;

    @Column('smallint', { name: 'createdBy' })
    createdById: number;

    @Column('boolean', { default: false })
    warning: boolean;

    @Column("varchar", { array: true, nullable: true })
    linked: Array<string>

    @Column("smallint", { nullable: true })
    discussionId: number;
    
    @Column("varchar", { nullable: true })
    extraDesc: string;
}

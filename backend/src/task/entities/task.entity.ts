import { ContractEntity } from "src/contract/entities/contract.entity";
import { Column, CreateDateColumn, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";

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

    @CreateDateColumn({ default: () => 'NOW()' })
    createdAt: Date;

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

    @ManyToMany(() => ContractEntity, contract => contract.tasks , { cascade: true })
    @JoinTable({
        name: 'task_use_script',
        joinColumn: {name: 'task_id', referencedColumnName: 'id'},
        inverseJoinColumn: { name: 'contract_id', referencedColumnName: 'id'}
    })
    contracts: Array<ContractEntity>
}

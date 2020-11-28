import { TaskEntity } from "src/task/entities/task.entity";
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('contract')
export class ContractEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column('varchar')
    script: string;

    @Column('varchar')
    workspace: string;

    @Column('varchar')
    toolbox: string;

    @Column('varchar')
    label: string;

    @ManyToMany(() => TaskEntity, task => task.contracts)
    tasks: Array<TaskEntity>
}
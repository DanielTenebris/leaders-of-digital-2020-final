import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

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
}
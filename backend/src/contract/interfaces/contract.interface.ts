export interface Contract {
    readonly id: number;

    readonly script: string;

    readonly workspace: string;

    readonly toolbox: string;

    readonly label: string;
}
import { IsString } from "class-validator";

export class CreateContractDto {
    @IsString()
    readonly script: string;

    @IsString()
    readonly workspace: string;

    @IsString()
    readonly toolbox: string;

    @IsString()
    readonly label: string;
}
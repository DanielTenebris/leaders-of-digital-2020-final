import { IsString } from "class-validator";

export class UpdateContractDto {
    @IsString()
    readonly script: string;

    @IsString()
    readonly workspace: string;

    @IsString()
    readonly toolbox: string;

    @IsString()
    readonly label: string;
}
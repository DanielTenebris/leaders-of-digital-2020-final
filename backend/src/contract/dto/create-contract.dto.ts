import { IsString } from "class-validator";

export class CreateContractDto {
    @IsString()
    script: string;

    @IsString()
    workspace: string;

    @IsString()
    toolbox: string;
}
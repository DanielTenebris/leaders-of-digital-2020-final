import { IsString } from "class-validator";

export class UpdateContractDto {
    @IsString()
    script: string;

    @IsString()
    workspace: string;

    @IsString()
    toolbox: string;
}
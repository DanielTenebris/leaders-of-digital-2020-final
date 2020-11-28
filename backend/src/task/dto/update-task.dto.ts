import { IsBoolean, IsNumber, IsString } from "class-validator";
import { ContractEntity } from "src/contract/entities/contract.entity";

export class UpdateTaskDto {
    @IsString()
    readonly title: string;

    @IsString()
    readonly desc?: string;

    @IsNumber()
    readonly deadline?: Date;
    
    @IsNumber()
    readonly finishDate?: Date;

    @IsNumber({},{ each: true })
    readonly workerId: Array<number>;

    @IsNumber()
    readonly createdById: number;

    @IsBoolean()
    readonly warning?: boolean;

    @IsString({ each: true })
    linked?: Array<string>

    @IsNumber()
    readonly discussionId?: number;
    
    @IsString()
    readonly extraDesc?: string;
}
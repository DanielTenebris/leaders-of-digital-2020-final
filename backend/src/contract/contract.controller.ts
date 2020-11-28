import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ContractService } from './contract.service';
import { CreateContractDto } from './dto/create-contract.dto';
import { UpdateContractDto } from './dto/update-contract.dto';
import { ContractEntity } from './entities/contract.entity';

@Controller('contract')
export class ContractController {
    constructor(
        private readonly contractService: ContractService,
    ) {}

    @Post()
    async create(@Body() createContractDto: CreateContractDto): Promise<ContractEntity> {
        console.log(createContractDto)
        return await this.contractService.create(createContractDto)
    }

    @Get()
    async findAll(): Promise<ContractEntity[]> {
        return await this.contractService.findAll()
    }

    @Get(':id')
    async findOneById(@Param('id') contractId: number): Promise<ContractEntity> {
        return await this.contractService.findOneById(contractId)
    }

    @Put(':id')
    async update(@Param('id') contractId: number, @Body() updateContractDto: UpdateContractDto): Promise<ContractEntity> {
        return await this.contractService.updateOne(contractId, updateContractDto);
    }

    @Delete(':id')
    async remove(@Param('id') contractId: number): Promise<ContractEntity[]> {
        return await this.contractService.deleteOne(contractId);
    }
}


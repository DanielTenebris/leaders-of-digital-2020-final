import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeepPartial } from 'typeorm';
import { CreateContractDto } from './dto/create-contract.dto';
import { UpdateContractDto } from './dto/update-contract.dto';
import { ContractEntity } from './entities/contract.entity';
import { ContractNotFoundException } from './exceptions/contract.exceptions';

@Injectable()
export class ContractService {
<<<<<<< HEAD
    constructor(
        @InjectRepository(ContractEntity)
        private readonly contractRepository: Repository<ContractEntity>
    ) {}
=======
  constructor(
    @InjectRepository(ContractEntity)
    private readonly contractRepository: Repository<ContractEntity>,
  ) {}
>>>>>>> 3a9a3369576a637a3972e4926a8405fc8be281d2

  async create(contract: CreateContractDto): Promise<ContractEntity> {
    const newContract = this.contractRepository.create(contract);
    return await this.contractRepository.save(newContract);
  }

  async findAll(): Promise<ContractEntity[]> {
    return await this.contractRepository.find();
  }

  async findOneById(contractId: number): Promise<ContractEntity> {
    return await this.contractRepository.findOne({ id: contractId });
  }

  async updateOne(
    contractId: number,
    updateContract: DeepPartial<UpdateContractDto>,
  ): Promise<ContractEntity> {
    await this.contractRepository.update({ id: contractId }, updateContract);
    const updatedContract = await this.contractRepository.findOne(contractId);
    if (updatedContract) {
      return updatedContract;
    }
    throw new ContractNotFoundException(contractId);
  }

<<<<<<< HEAD
    async deleteOne(contractId: number): Promise<ContractEntity[]> {
        const contractToRemove = await this.contractRepository.find({id: contractId});
        return await this.contractRepository.remove(contractToRemove);
    }
=======
  async deleteOne(contractId: number): Promise<ContractEntity[]> {
    const contractToRemove = await this.contractRepository.find({
      id: contractId,
    });
    return await this.contractRepository.remove(contractToRemove);
  }

  async execContracts(taskId: number): Promise<any> {
    const dateNow = Date.now();
    const task = this.findOneById(taskId);
    console.log(task);
    const deadline = task['deadline'];

    const emitEvents = [];
    const contracts = await this.contractRepository.find({
      relations: ['tasks'],
    });
    console.log(`UPDATE !!!!!! ${contracts}`);

    (await contracts).forEach(contract => {
      console.log(`UPDATE !!!!!! ${contract}`);
      // eval(contract["script"])
    });
    console.log(emitEvents);

    return true;
  }
>>>>>>> 3a9a3369576a637a3972e4926a8405fc8be281d2
}

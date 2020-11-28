import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { classToPlain } from 'class-transformer';
import { ContractService } from 'src/contract/contract.service';
import { Repository, DeepPartial } from 'typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TaskEntity } from './entities/task.entity';
import { TaskNotFoundException } from './exceptions/task.exceptions';

@Injectable()
export class TaskService {
    constructor(
        @InjectRepository(TaskEntity)
        private readonly taskRepository: Repository<TaskEntity>,

        private readonly contractService: ContractService,

    ) {}

    async create(task: CreateTaskDto): Promise<TaskEntity> {

        const newTask = this.taskRepository.create(task)
        
        newTask.contracts = await Promise.all(task.contractIds.map(async (contract) => await this.contractService.findOneById(contract)));

        return await this.taskRepository.save(newTask)
    }

    async findAll(): Promise<TaskEntity[]> {
        return await this.taskRepository.find();
    }

    async findOneById(taskId: number): Promise<TaskEntity> {
        return await this.taskRepository.findOne({id: taskId})
    }

    async updateOne(taskId: number, updateTask: DeepPartial<UpdateTaskDto>): Promise<TaskEntity> {
            
        await this.taskRepository.update({id: taskId}, updateTask);
        const updatedTask = await this.taskRepository.findOne(taskId);
        if (updatedTask) {
            this.execContracts(taskId)
            return updatedTask
        } 
        throw new TaskNotFoundException(taskId);
    }

    async deleteOne(taskId: number): Promise<TaskEntity[]> {
        const taskToRemove = await this.taskRepository.find({id: taskId});
        return await this.taskRepository.remove(taskToRemove);
    }

    async execContracts(taskId: number): Promise<any> {
        
        console.log(`TASK SUKA ID ->>>> ${taskId}`)
        
        
        const task = this.findOneById(taskId)
        const emitEvents = []
        
        const taskWithRelatedContracts = await this.taskRepository.findOne({ where: {id: taskId}, relations: ["contracts"]});

        const contracts = classToPlain(taskWithRelatedContracts)["contracts"]
        
        contracts.forEach( (contract) => {
            const eventToEmit = eval(`var dateNow = ${Date.now()}; var deadline = ${task["deadline"]};` + contract["script"].raw())
            console.log(eventToEmit)
            emitEvents.concat(eventToEmit)
        })
    
        console.log(emitEvents)

        emitEvents.forEach((event) => {
            event()
        });
    }
}

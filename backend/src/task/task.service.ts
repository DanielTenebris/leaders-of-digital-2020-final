import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeepPartial } from 'typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TaskEntity } from './entities/task.entity';
import { TaskNotFoundException } from './exceptions/task.exceptions';

@Injectable()
export class TaskService {
    constructor(
        @InjectRepository(TaskEntity)
        private readonly taskRepository: Repository<TaskEntity>
    ) {}

    async create(task: CreateTaskDto): Promise<TaskEntity> {
        const newTask = this.taskRepository.create(task)
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
            return updatedTask
        } 
        throw new TaskNotFoundException(taskId);
    }

    async deleteOne(taskId: number): Promise<TaskEntity[]> {
        const taskToRemove = await this.taskRepository.find({id: taskId});
        return await this.taskRepository.remove(taskToRemove);
    }
}

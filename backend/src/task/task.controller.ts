import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TaskEntity } from './entities/task.entity';
import { TaskService } from './task.service';

@Controller('task')
export class TaskController {
    constructor(
        private readonly taskService: TaskService,
    ) {}

    @Post()
    async create(@Body() createTaskDto: CreateTaskDto): Promise<TaskEntity> {
        console.log(createTaskDto)
        return await this.taskService.create(createTaskDto)
    }

    @Get()
    async findAll(): Promise<TaskEntity[]> {
        return await this.taskService.findAll()
    }

    @Get(':id')
    async findOneById(@Param('id') taskId: number): Promise<TaskEntity> {
        return await this.taskService.findOneById(taskId)
    }

    @Put(':id')
    async update(@Param('id') taskId: number, @Body() updateTaskDto: UpdateTaskDto): Promise<TaskEntity> {
        return await this.taskService.updateOne(taskId, updateTaskDto);
    }

    @Delete(':id')
    async remove(@Param('id') taskId: number): Promise<TaskEntity[]> {
        return await this.taskService.deleteOne(taskId);
    }
}


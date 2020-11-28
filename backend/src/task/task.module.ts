import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContractModule } from 'src/contract/contract.module';
import { TaskEntity } from './entities/task.entity';
import { TaskController } from './task.controller';
import { TaskService } from './task.service';

@Module({
  imports: [TypeOrmModule.forFeature([TaskEntity]), ContractModule],
  controllers: [TaskController],
  providers: [TaskService]
})
export class TaskModule {}

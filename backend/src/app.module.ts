import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContractModule } from './contract/contract.module';
import { TaskModule } from './task/task.module';

@Module({
  imports: [TypeOrmModule.forRoot(), ContractModule, TaskModule],
  controllers: [],
  providers: [],
})
export class AppModule {}

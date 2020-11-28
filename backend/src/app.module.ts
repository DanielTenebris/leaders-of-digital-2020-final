import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm/dist/typeorm.module';
import { ContractModule } from './contract/contract.module';

@Module({
  imports: [TypeOrmModule.forRoot(), ContractModule],
  controllers: [],
  providers: [],
})
export class AppModule {}

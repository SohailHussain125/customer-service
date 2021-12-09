import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { CustomerController } from './customer.controller';
import { CustomerService } from './customer.service';

@Module({
  imports:[HttpModule],
  controllers: [CustomerController],
  providers:[CustomerService]
})
export class CustomerModule {}

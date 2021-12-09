import { Controller, Get, Headers, Param, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from './../authentication/jwt-auth.guard';
import { CustomerService } from './customer.service';
@Controller('customer')
export class CustomerController {
    constructor(private customerService: CustomerService) { }

    @UseGuards(JwtAuthGuard)
    @Get('all')
    getAllCustomer(@Headers() headers) {        
       return this.customerService.getAllCustomers(headers.authorization)
    }
}

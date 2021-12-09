import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { JwtService } from '@nestjs/jwt';
import { HttpService } from '@nestjs/axios';
import { Observable ,lastValueFrom } from 'rxjs';
import { use } from 'passport';

@Injectable()
export class CustomerService {
    customer = [
        {
            id: "1",
            name: "Ali Khanasdasd"
        },
        {
            id: "2",
            name: "Hasaham Ali"
        }
    ]
    constructor(private httpService: HttpService) { }

    async getAllCustomers(token: string) {
        const product = await lastValueFrom(this.getAllProduct(token));
        let customerAndProduct = this.customer.map(obj => ({ ...obj, product:product.data }))
        return customerAndProduct;
    }

     getAllProduct(token: string): Observable<any> {
        this.httpService.axiosRef.interceptors.request.use(request => {
            request.headers = {
                ...request.headers,
                Authorization: token || '',
            };
            return request;
        })

        const response =  this.httpService.get('http://localhost:3000/product/all').pipe();
        return response;

    }

}

import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthsModule } from 'src/authentication/authentication.module';
import { CustomerModule } from 'src/customer/customer.module';

@Module({
  imports: [AuthsModule,CustomerModule,
    MongooseModule.forRoot("mongodb+srv://user:Q3JzizdgvdmhbOgI@cluster0.wcwi2.mongodb.net/myFirstDatabase?retryWrites=true&w=majority") ],
  controllers:[],
  providers:[]
})
export class AppModule {}

import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthenticationController } from './authentication.controller';
import { AuthenticationService } from './authentication.service';
import { AuthenticationSchema } from './authentication.model';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local.strategy';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [JwtModule.register({
    secret: jwtConstants.secret,
    signOptions: { expiresIn: '10m' },
  }),
    PassportModule, MongooseModule.forFeature([{ name: 'Users', schema: AuthenticationSchema }])],
  controllers: [AuthenticationController],
  providers: [AuthenticationService, LocalStrategy ,JwtStrategy],
})
export class AuthsModule { }
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from 'src/strategy/local.strategy';
import { JWTStrategy } from 'src/strategy/jwt.strategy';

@Module({
  imports: [
    UsersModule,
    JwtModule.register({
      global: true,
      signOptions: {
        expiresIn: "15m",
      }
    }),
    PassportModule
  ],
  providers: [AuthService, LocalStrategy, JWTStrategy],
  controllers: [AuthController],
})
export class AuthModule {}

import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, ValidationPipe, Put } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { LocalAuthGuard } from 'src/guard/local-auth.guard';
import { User } from 'src/decorator/request_user.decorator';
import { IReqUser } from './models/user-requesr.models';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("login")
  @UseGuards(LocalAuthGuard)
  async login(@User() user: IReqUser){
    return user;
  }

  @Post("register")
  async register(@Body(new ValidationPipe()) User: CreateAuthDto){
    return await this.authService.createUser(User);
  }

  @Put("updateCodeActive")
  async updateCodeActive(
    @Body("email") email: string,
  ){
    return await this.authService.updateCodeActive(email);
  }

  @Put("activeAccount")
  async activeAccount(
    @Body("email") email: string,
    @Body("code") code: string
  ){
    return await this.authService.activeAccount(email, code);
  }

  @Post("getCodeChangePassword")
  async getCodeChangePassword(
    @Body("email") email: string
  ){
    return await this.authService.getCodeChangePassword(email);
  }

  @Put("checkCodeChangePassword")
  async checkCodeChangePassword(
    @Body("email") email: string,
    @Body("code") code: string
  ){
    return await this.authService.checkCodeChangePassword(email, code);
  }

  @Put("changePassword")
  async changePassword(
    @Body("email") email: string,
    @Body("password") password: string
  ){
    return await this.authService.changePassword(email, password);
  }
}

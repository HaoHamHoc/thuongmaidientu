import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { ConfigService } from '@nestjs/config';
import { CreateAuthDto } from './dto/create-auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
  ){}

  async validateUser(email: string, password: string) {
    return await this.usersService.handleUserLogin(email, password);
  }

  async createUser(User: CreateAuthDto){
    return await this.usersService.handleUserRegister(User);
  }

  async updateCodeActive(email: string){
    return await this.usersService.updateCodeActive(email);
  }

  async activeAccount(email: string, code: string){
    return await this.usersService.activeAccount(email, code);
  }

  async getCodeChangePassword(email: string){
    return await this.usersService.getCodeChangePassword(email);
  }

  async checkCodeChangePassword(email: string, code: string){
    return await this.usersService.checkCodeChangePassword(email, code);
  }

  async changePassword(email: string, password: string){
    return await this.usersService.changePassword(email, password);
  }
}

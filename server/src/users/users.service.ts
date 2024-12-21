import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { ConfigService } from '@nestjs/config';
import { IPayload } from './models/payload-token.models';
import { IDataUser, IResponse } from './models/response.models';
import { JwtService } from '@nestjs/jwt';
import * as argon from "argon2";
import { MailService } from 'src/mail/mail.service';
import * as dayjs from "dayjs";

@Injectable()
export class UsersService {
  constructor(
      @Inject('USER_REPOSITORY')
      private userRepository: Repository<User>,
      private configService: ConfigService,
      private jwtService: JwtService,
      private mailService: MailService
  ){}

   async handleUserLogin(email: string, password: string): Promise<IResponse<IDataUser>>{
     const user = await this.userRepository.findOne({
      where: {
        email: email
      }
     });

      if(user){
        const isTruePassword = await argon.verify(user?.hasspassword, password);

        if(!isTruePassword){
          return {
            statusCode: 401,
            message: "Email or password incorrect"
          }
        };

        if(!user.isActive){
          return{
            statusCode: 400,
            message: "Account is not active"
          };
        }

         const token = await this.createToken({
            id: user.id,
            email: user.email
          });
      
      return {
        statusCode: 200,
        message: "Login success",
        data: {
          user: {
            id: user.id,
            name: user.firstname + user.surname,
            email: user.email
          },
          AT: token
        }
      }
      }else{
         return {
            statusCode: 401,
            message: "Email or password incorrect"
          }
      }
  };

  async createToken(payload: IPayload){
    return await this.jwtService.signAsync(payload,{
      secret: this.configService.get("SECRET_KEY")
    });
  }

  async handleUserRegister(User: CreateUserDto): Promise<IResponse<IDataUser>>{
    const isExistUser = await this.userRepository.findOne({
      where: {
        email: User.email
      }
    });

    if(isExistUser) throw new BadRequestException({
      message: "Email already exists",
      statusCode: 400
    });

    const hassPassword = await argon.hash(User.password);

    const newUser = await this.userRepository.save({
      firstname: User.firstname,
      surname: User.surname,
      email: User.email,
      hasspassword: hassPassword
    });

    if(newUser) {
      await this.updateCodeActive(newUser.email);

      return{
        message: "Register success",
        statusCode: 200,
        data: {
          user: {
            email: User.email
          }
        }
      };
    }
  }

  async updateCodeActive(email: string): Promise<IResponse<null>>{
    const codeActive = this.createStringNumber();
    const user = await this.userRepository.findOne({
      where:{email},
      select:{
        id: true,
        firstname: true,
        surname: true
      }
    });

    await this.getCodeActive(`${user.firstname} ${user.surname}`, codeActive, "confirmation");

    const updateCode = await this.userRepository.update(user.id,{
      codeActive: codeActive,
      expiredCode: dayjs().add(5, "minutes").toISOString()
    });

    if(updateCode){
      return {
        statusCode: 200,
        message: "Update success, check your email to get new code active"
      }
    }else{
      return {
        statusCode: 400,
        message: "Update error, try again!"
      }
    }
  }

  async activeAccount(email: string, activeCode: string): Promise<IResponse<null>>{
    const user = await this.userRepository.findOne({
      where:{email}
    })

    if(!user){
      return {
        statusCode: 400,
        message: "User is not exist"
      }
    };

    if( user.codeActive === activeCode && dayjs().isBefore(dayjs(user.expiredCode))){
      await this.userRepository.update(user.id, {
        isActive: true
      })

      return {
        statusCode: 200,
        message: "Your account is actived"
      }
    }else{
      return {
        statusCode: 400,
        message: "Code active is incorrect or expired"
      }
    }
  }

  createStringNumber(): string{
    return Math.floor(100000 + Math.random() * 900000)+"";
  }

  async getCodeActive(name: string, code: string, template: string): Promise<void>{
    await this.mailService.sendActiveCodeToGmail(name, code, template);
  }

  async getCodeChangePassword(email: string): Promise<IResponse<null>>{
    const codeActive = this.createStringNumber();
    const user = await this.userRepository.findOne({
      where:{email}
    });

    if(!user){
       return {
        statusCode: 400,
        message: "User is not exist"
      }
    }

    await this.mailService.sendActiveCodeToGmail(`${user.firstname} ${user.surname}`, codeActive, "changepassword");

    const updateCode = await this.userRepository.update(user.id,{
      codeChangePassword: codeActive,
      expiredCodeChangePassword: dayjs().add(5, "minutes").toISOString()
    });

    if(updateCode){
      return {
        statusCode: 200,
        message: "Update success, check your email to get new code change password"
      }
    }else{
      return {
        statusCode: 400,
        message: "Update error, try again!"
      }
    }
  }

  async checkCodeChangePassword(email: string, code: string): Promise<IResponse<null>>{
    const user = await this.userRepository.findOne({
      where:{email}
    })

    if(!user){
      return {
        statusCode: 400,
        message: "User is not exist"
      }
    };

    if( user.codeChangePassword === code){
      await this.userRepository.update(user.id, {
        expiredCodeChangePassword: dayjs().add(5, "minutes").toISOString()
      })

      return {
        statusCode: 200,
        message: "Success, change your password in 5 minutes"
      }
    }else{
      return {
        statusCode: 400,
        message: "Code to change password is incorrect or expired"
      }
    }
  }

  async changePassword(email: string, password: string){
    const user = await this.userRepository.findOne({
      where:{email}
    });

    if(!user){
      return {
        statusCode: 400,
        message: "User is not exist"
      }
    };

    const hassPassword = await argon.hash(password);

    const updatePassword = await this.userRepository.update(user.id,{
        hasspassword: hassPassword
    });

    if(updatePassword){
      return {
        statusCode: 200,
        message: "Update success, login with new password, please"
      }
    }else{
      return {
        statusCode: 400,
        message: "Update error, try again!"
      }
    }
  }
}

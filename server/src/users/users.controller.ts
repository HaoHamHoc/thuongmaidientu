import { Controller, Get, Post, Body, Patch, Param, Delete, ValidationPipe } from '@nestjs/common';
import { UsersService } from './users.service';
import { CheckUserDto } from './dto/check-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // @Post()
  // create(
  //   @Body(new ValidationPipe()) User: CheckUserDto
  // ) {
  //   return this.usersService.findOneUser(User.email, User.password);
  // }

}

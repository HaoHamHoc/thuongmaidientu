import { IsNotEmpty, IsString } from "class-validator";


export class CheckUserDto {
    @IsString()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    password: string;
}
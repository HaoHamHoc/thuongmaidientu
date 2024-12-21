import { IsNotEmpty, MinLength } from "class-validator";

export class CreateUserDto {
    @IsNotEmpty()
    firstname: string;

    @IsNotEmpty()
    surname: string;

    @IsNotEmpty()
    @MinLength(8)
    email: string;

    @IsNotEmpty()
    @MinLength(8)
    password: string;
}

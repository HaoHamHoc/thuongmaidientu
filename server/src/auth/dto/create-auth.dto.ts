import { IsNotEmpty, MinLength } from "class-validator";

export class CreateAuthDto {
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

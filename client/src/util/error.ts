import { AuthError } from "next-auth";

export class CustomAuthError extends AuthError{
    static type: string;

    constructor(message?: any){
        super();
        this.type = message;
    }
}

export class InvalidEmailPasswordError extends AuthError{
    static type = "Email or password is incorrect";
}

export class InactiveAccountError extends AuthError{
    static type = "Your account is not active";
}

export class EmailAlreadyExistsError extends AuthError{
    static type = "Email already exists";
}

export class AccountIsNotActive extends AuthError{
    static type = "Account is not active";
}

export class ServerError extends AuthError{
    static type = "Server error";
}

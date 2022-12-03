import { IsEmail, IsNotEmpty } from 'class-validator';

export class RegisterUserRequest {
    @IsNotEmpty({ message: 'Name is required' })
    name: string;

    @IsNotEmpty({ message: 'Email is required' })
    @IsEmail({ message: 'Email is not valid' })
    email: string;

    @IsNotEmpty({ message: 'Password is required' })
    password: string;

    @IsNotEmpty({ message: 'Full name is required' })
    fullname: string;

    constructor(name: string, email: string, password: string, fullname: string) {
        this.name = name;
        this.email = email;
        this.password = password;
        this.fullname = fullname;
    }
}

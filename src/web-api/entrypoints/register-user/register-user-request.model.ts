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
}

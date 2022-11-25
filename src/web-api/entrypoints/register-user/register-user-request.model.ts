import { IsEmail, IsNotEmpty } from 'class-validator';
import { IsUserNameUnique } from './is-user-name-unique.constraint';

export class RegisterUserRequest {
    @IsUserNameUnique({
        message: 'User name already exists',
    })
    @IsNotEmpty({ message: 'Name is required' })
    name: string;

    @IsNotEmpty({ message: 'Email is required' })
    @IsEmail({ message: 'Email is not valid' })
    email: string;

    @IsNotEmpty({ message: 'Password is required' })
    password: string;

    @IsNotEmpty({ message: 'Full name is required' })
    fullName: string;
}

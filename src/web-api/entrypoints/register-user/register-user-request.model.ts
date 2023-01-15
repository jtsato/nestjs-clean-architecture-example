import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class RegisterUserRequest {
    @IsNotEmpty({ message: 'Name is required' })
    @ApiProperty({
        description: 'User name',
    })
    name: string;

    @IsNotEmpty({ message: 'Email is required' })
    @ApiProperty({
        description: 'User email',
    })
    email: string;

    @IsNotEmpty({ message: 'Password is required' })
    @ApiProperty({
        description: 'User password',
    })
    password: string;

    @ApiProperty({
        description: 'User fullname',
    })
    @IsNotEmpty({ message: 'Full name is required' })
    fullname: string;
}

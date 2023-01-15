import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';

export class UserResponse {
    @ApiProperty({
        description: 'User identifier',
    })
    id: number;

    @ApiProperty({
        description: 'User name',
    })
    name: string;

    @ApiProperty({
        description: 'User email',
    })
    email: string;

    @Exclude({ toPlainOnly: true })
    @ApiProperty({
        description: 'User password',
    })
    password: string;

    @ApiProperty({
        description: 'User fullname',
    })
    @Expose({ name: 'fullname' })
    fullname: string;

    @ApiProperty({
        description: 'User creation date',
    })
    createdAt: string;

    constructor(user: UserResponse) {
        Object.assign(this, user);
    }
}

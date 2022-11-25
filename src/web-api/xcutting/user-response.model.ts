import { Exclude, Expose } from 'class-transformer';

export class UserResponse {
    id: number;
    name: string;
    email: string;
    @Exclude({ toPlainOnly: true })
    password: string;
    @Expose({ name: 'fullname' })
    fullName: string;
    createdAt: string;

    constructor(
        id: number,
        name: string,
        email: string,
        password: string,
        fullName: string,
        createdAt: string,
    ) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.password = password;
        this.fullName = fullName;
        this.createdAt = createdAt;
    }
}

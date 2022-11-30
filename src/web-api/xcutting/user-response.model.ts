import { Exclude, Expose } from 'class-transformer';

export class UserResponse {
    id: number;
    name: string;
    email: string;
    @Exclude({ toPlainOnly: true })
    password: string;
    @Expose({ name: 'fullname' })
    fullname: string;
    createdAt: string;

    constructor(
        id: number,
        name: string,
        email: string,
        password: string,
        fullname: string,
        createdAt: string,
    ) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.password = password;
        this.fullname = fullname;
        this.createdAt = createdAt;
    }
}

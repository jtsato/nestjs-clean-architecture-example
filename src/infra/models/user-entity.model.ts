export class UserEntity {
    id: number;
    name: string;
    email: string;
    password: string;
    fullname: string;
    createdAt: Date;

    constructor(
        id: number,
        name: string,
        email: string,
        password: string,
        fullname: string,
        createdAt: Date,
    ) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.password = password;
        this.fullname = fullname;
        this.createdAt = createdAt;
    }
}

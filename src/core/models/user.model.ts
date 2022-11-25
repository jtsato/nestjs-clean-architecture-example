export class User {
    id: number;
    name: string;
    email: string;
    password: string;
    fullName: string;
    createdAt: Date;

    constructor(
        id: number,
        name: string,
        email: string,
        password: string,
        fullName: string,
        createdAt: Date,
    ) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.password = password;
        this.fullName = fullName;
        this.createdAt = createdAt;
    }
}

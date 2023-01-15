import { ApiProperty } from '@nestjs/swagger';

export class Field {
    @ApiProperty({
        description: 'Name of the error.',
    })
    public name: string;

    @ApiProperty({
        description: 'Mensage of the error.',
    })
    public message: string;

    @ApiProperty({
        description: 'Value of the error.',
    })
    public value: string;

    constructor(
        name: string,
        message: string,
        value: string,
    ) {
        this.name = name;
        this.message = message;
        this.value = value;
    }
}

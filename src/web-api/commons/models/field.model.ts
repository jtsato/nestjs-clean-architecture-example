import { ApiProperty } from '@nestjs/swagger';

export class Field {
    @ApiProperty({
        description: 'Attribute name',
    })
    public name: string;

    @ApiProperty({
        description: 'Error message description',
    })
    public message: string;

    @ApiProperty({
        description: 'Submitted value',
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

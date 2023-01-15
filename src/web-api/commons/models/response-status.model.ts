import { ApiExtraModels, ApiProperty, getSchemaPath } from '@nestjs/swagger';
import { IsNotEmptyObject } from 'class-validator';
import { Field } from './field.model';

ApiExtraModels(Field);

export class ResponseStatus {
    @ApiProperty({
        description: 'HTTP response status code',
    })
    public code: number;

    @ApiProperty({
        description: 'Response error message',
    })
    public message: string;

    @ApiProperty({
        description: 'Detailed errors by field',
        oneOf: [
            { $ref: getSchemaPath(Field) },
        ],
    })
    @IsNotEmptyObject()
    public fields: Array<Field>;

    constructor(
        code: number,
        message: string,
        value: Array<Field>,
    ) {
        this.code = code;
        this.message = message;
        this.fields = value;
    }
}

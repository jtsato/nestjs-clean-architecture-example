import { ApiExtraModels, ApiProperty, getSchemaPath } from '@nestjs/swagger';
import { IsNotEmptyObject } from 'class-validator';
import { Field } from './field.model';

ApiExtraModels(Field);

export class ResponseStatus {
    @ApiProperty({
        description: 'Code of the http error.',
    })
    public code: number;

    @ApiProperty({
        description: 'Description of the error.',
    })
    public message: string;

    @ApiProperty({
        description: 'Fields with error.',
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

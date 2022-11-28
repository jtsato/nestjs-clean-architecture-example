import { Field } from '@/web-api/commons/models';

export class ResponseStatus {
    code: number;
    message: string;
    fields: Array<Field>;

    constructor(code: number, message: string, fields: Array<Field>) {
        this.code = code;
        this.message = message;
        this.fields = fields;
    }
}

import { Field } from './field.model';

export class ResponseStatus {
    constructor(
        public code: number,
        public message: string,
        public fields: Array<Field>,
    ) {}
}

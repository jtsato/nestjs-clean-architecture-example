export class HttpResponse {
    status: number;
    headers: object;
    body: object;

    constructor(httpResponse: HttpResponse) {
        Object.assign(this, httpResponse);
    }
}

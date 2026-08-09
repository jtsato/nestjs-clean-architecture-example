import { HttpResponse } from './http-response.model';

export class HttpResponseBuilder {
    private readonly httpResponse: HttpResponse = {
        status: 200,
        headers: {},
        body: {},
    };

    public withStatus(status: number): this {
        this.httpResponse.status = status;
        return this;
    }

    public withHeaders(headers: object): this {
        this.httpResponse.headers = headers;
        return this;
    }

    public withBody(body: object): this {
        this.httpResponse.body = body;
        return this;
    }

    public build(): HttpResponse {
        return new HttpResponse(this.httpResponse);
    }
}

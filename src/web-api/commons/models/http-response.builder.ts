import { HttpResponse } from './http-response.model';

export class HttpResponseBuilder {
    private httpResponse: HttpResponse = {
        status: 200,
        headers: {},
        body: {},
    };

    public withStatus(status: number): HttpResponseBuilder {
        this.httpResponse.status = status;
        return this;
    }

    public withHeaders(headers: object): HttpResponseBuilder {
        this.httpResponse.headers = headers;
        return this;
    }

    public withBody(body: object): HttpResponseBuilder {
        this.httpResponse.body = body;
        return this;
    }

    public build(): HttpResponse {
        return new HttpResponse(this.httpResponse);
    }
}

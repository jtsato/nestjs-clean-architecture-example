import { Body, Controller, Header, HttpStatus, Inject, Post } from '@nestjs/common';
import { HttpResponse, HttpResponseBuilder } from '@/web-api/commons/models';
import { RegisterUserRequest } from '@/web-api/entrypoints/register-user';
import { UserPresenter } from '@/web-api/xcutting';
import { User } from '@/core/models';
import { IRegisterUserUseCase, IRegisterUserUseCaseSymbol, RegisterUserCommand } from '@/core/usecases/register-user';

@Controller('/users')
export class RegisterUserController {
    constructor(@Inject(IRegisterUserUseCaseSymbol) private registerUserUseCase: IRegisterUserUseCase) { }

    @Post()
    @Header('Content-Type', 'application/json')
    async execute(@Body() request: RegisterUserRequest): Promise<HttpResponse> {
        const command: RegisterUserCommand = new RegisterUserCommand(
            request.name,
            request.email,
            request.password,
            request.fullname,
        );

        const user: User = await this.registerUserUseCase.execute(command);

        return new HttpResponseBuilder()
            .withStatus(HttpStatus.CREATED)
            .withHeaders({ Location: `/users/by-name?name=${user.name}` })
            .withBody(UserPresenter.of(user))
            .build();
    }
}

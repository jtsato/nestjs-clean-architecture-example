import { Controller, Post, Header, Body, HttpStatus, Inject } from '@nestjs/common';
import { HttpResponse, HttpResponseBuilder } from '@/web-api/commons/models';
import { RegisterUserRequest } from '@/web-api/entrypoints/register-user';
import { UserPresenter } from '@/web-api/xcutting';
import { User } from '@/core/models';
import { IRegisterUserUseCase, RegisterUserCommand } from '@/core/usecases/register-user';

@Controller('/users')
export class RegisterUserController {
    constructor(@Inject(IRegisterUserUseCase) private registerUserUseCase: IRegisterUserUseCase) { }

    @Post()
    @Header('Content-Type', 'application/json')
    @Header('Cache-Control', 'no-cache')
    async execute(@Body() registerUserRequest: RegisterUserRequest): Promise<HttpResponse> {
        const command: RegisterUserCommand = new RegisterUserCommand(
            registerUserRequest.name,
            registerUserRequest.email,
            registerUserRequest.password,
            registerUserRequest.fullName,
        );

        const user: User = await this.registerUserUseCase.execute(command);

        return new HttpResponseBuilder()
            .withStatus(HttpStatus.CREATED)
            .withHeaders({ Location: `/users/by-name?name=${user.name}` })
            .withBody(UserPresenter.of(user))
            .build();
    }
}

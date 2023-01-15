import { HttpStatus, Inject } from '@nestjs/common';
import { HttpResponse, HttpResponseBuilder } from '@/web-api/commons/models';
import { RegisterUserRequest } from '@/web-api/entrypoints/register-user';
import { UserPresenter } from '@/web-api/xcutting';
import { User } from '@/core/models';
import { IRegisterUserUseCase, IRegisterUserUseCaseSymbol, RegisterUserCommand } from '@/core/usecases/register-user';
import { IRegisterUserController } from './register-user.controller.interface';

export class RegisterUserController implements IRegisterUserController {
    constructor(@Inject(IRegisterUserUseCaseSymbol) private registerUserUseCase: IRegisterUserUseCase) { }

    async execute(request: RegisterUserRequest): Promise<HttpResponse> {
        const command: RegisterUserCommand = new RegisterUserCommand(
            request.name,
            request.email,
            request.password,
            request.fullname,
        );

        const user: User = await this.registerUserUseCase.execute(command);
        const userResponse = UserPresenter.of(user);

        return new HttpResponseBuilder()
            .withStatus(HttpStatus.CREATED)
            .withHeaders({ Location: `/users/by-name?name=${user.name}` })
            .withBody(userResponse)
            .build();
    }
}

import { Module } from '@nestjs/common';
import { GetUserByNameUseCase } from '@/core/usecases/get-user-by-name';
import { RegisterUserUseCase, RegisterUserGateway } from '@/core/usecases/register-user';
import { GetUserByNameModule } from '@/web-api/entrypoints/get-user-by-name';
import { IsUsernameUniqueConstraint } from './is-user-name-unique.constraint';
import { RegisterUserController } from './register-user.controller';
import { GetUserByNameProvider, RegisterUserProvider } from '@/infra/providers';
import { GetUserByNameGateway } from '@/core/usecases/xcutting';
import { UserRepository } from '@/infra/repositories';
import { IRegisterUserUseCase } from '@/core/usecases/register-user/register-user-usecase.interface';

@Module({
    imports: [GetUserByNameModule],
    controllers: [RegisterUserController],
    providers: [
        UserRepository,
        RegisterUserUseCase,
        IsUsernameUniqueConstraint,
        GetUserByNameUseCase,
        {
            provide: IRegisterUserUseCase,
            useClass: RegisterUserUseCase,
        },
        {
            provide: RegisterUserGateway,
            useClass: RegisterUserProvider,
        },
        {
            provide: GetUserByNameGateway,
            useClass: GetUserByNameProvider,
        },
    ],
})

export class RegisterUserModule { }

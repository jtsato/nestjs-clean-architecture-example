import { Module, Scope } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { GetUserByNameUseCase } from '@/core/usecases/get-user-by-name';
import { RegisterUserUseCase, RegisterUserGateway } from '@/core/usecases/register-user';
import { GetUserByNameModule } from '@/web-api/entrypoints/get-user-by-name';
import { IsUsernameUniqueConstraint, RegisterUserController } from '@/web-api/entrypoints/register-user';
import { GetUserByNameProvider, RegisterUserProvider } from '@/infra/providers';
import { GetUserByNameGateway } from '@/core/usecases/xcutting';
import { UserRepository } from '@/infra/repositories';
import { IRegisterUserUseCase } from '@/core/usecases/register-user/register-user-usecase.interface';
import { GetDateTimeService, IGetDateTimeService } from '@/core/common';
import { UniqueConstraintExceptionFilter, ValidationExceptionFilter } from '@/web-api/commons/filters';

@Module({
    imports: [GetUserByNameModule],
    controllers: [RegisterUserController],
    providers: [
        {
            provide: IGetDateTimeService,
            useClass: GetDateTimeService,
        },
        GetUserByNameUseCase,
        {
            provide: GetUserByNameGateway,
            useClass: GetUserByNameProvider,
        },
        IsUsernameUniqueConstraint,
        RegisterUserUseCase,
        {
            provide: IRegisterUserUseCase,
            useClass: RegisterUserUseCase,
        },
        {
            provide: RegisterUserGateway,
            useClass: RegisterUserProvider,
        },
        {
            provide: APP_FILTER,
            scope: Scope.REQUEST,
            useClass: ValidationExceptionFilter,
        },
        {
            provide: APP_FILTER,
            scope: Scope.REQUEST,
            useClass: UniqueConstraintExceptionFilter,
        },
        UserRepository,
    ],
})

export class RegisterUserModule { }

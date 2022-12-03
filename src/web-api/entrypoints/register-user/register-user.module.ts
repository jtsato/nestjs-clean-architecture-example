import { Module } from '@nestjs/common';
import { IRegisterUserGatewaySymbol, RegisterUserUseCase } from '@/core/usecases/register-user';
import { GetUserByNameModule } from '@/web-api/entrypoints/get-user-by-name';
import { RegisterUserController } from '@/web-api/entrypoints/register-user';
import { GetUserByNameProvider, RegisterUserProvider } from '@/infra/providers';
import { IGetUserByNameGatewaySymbol } from '@/core/usecases/xcutting';
import { UserRepository } from '@/infra/repositories';
import { IRegisterUserUseCaseSymbol } from '@/core/usecases/register-user/register-user-usecase.interface';
import { GetDateTimeService, IGetDateTimeSymbol } from '@/core/commons';
import { WebModule } from '@/web-api/commons/modules';

@Module({
    imports: [GetUserByNameModule, WebModule],
    controllers: [RegisterUserController],
    providers: [
        UserRepository,
        {
            provide: IGetDateTimeSymbol,
            useClass: GetDateTimeService,
        },
        {
            provide: IGetUserByNameGatewaySymbol,
            useClass: GetUserByNameProvider,
        },
        {
            provide: IRegisterUserUseCaseSymbol,
            useClass: RegisterUserUseCase,
        },
        {
            provide: IRegisterUserGatewaySymbol,
            useClass: RegisterUserProvider,
        },
    ],
})

export class RegisterUserModule { }

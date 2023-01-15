import { Module } from '@nestjs/common';
import { IRegisterUserGatewaySymbol, RegisterUserUseCase } from '@/core/usecases/register-user';
import { GetUserByNameModule } from '@/web-api/entrypoints/get-user-by-name';
import { GetUserByNameProvider, RegisterUserProvider } from '@/infra/providers';
import { IGetUserByNameGatewaySymbol } from '@/core/usecases/xcutting';
import { UserRepository } from '@/infra/repositories';
import { IRegisterUserUseCaseSymbol } from '@/core/usecases/register-user/register-user-usecase.interface';
import { GetDateTimeService, IGetDateTimeServiceSymbol } from '@/core/commons';
import { WebModule } from '@/web-api/commons/modules';
import { RegisterUserDecoratorController } from './register-user.decorator.controller';
import { IRegisterUserControllerSymbol } from './register-user.controller.interface';
import { RegisterUserController } from './register-user.controller';

@Module({
    imports: [GetUserByNameModule, WebModule],
    controllers: [RegisterUserDecoratorController],
    providers: [
        UserRepository,
        {
            provide: IRegisterUserControllerSymbol,
            useClass: RegisterUserController,
        },
        {
            provide: IGetDateTimeServiceSymbol,
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

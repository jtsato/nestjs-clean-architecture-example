import { Module } from '@nestjs/common';
import { RegisterUserUseCase, RegisterUserGateway } from '@/core/usecases/register-user';
import { GetUserByNameModule } from '@/web-api/entrypoints/get-user-by-name';
import { RegisterUserController } from '@/web-api/entrypoints/register-user';
import { GetUserByNameProvider, RegisterUserProvider } from '@/infra/providers';
import { GetUserByNameGateway } from '@/core/usecases/xcutting';
import { UserRepository } from '@/infra/repositories';
import { IRegisterUserUseCase } from '@/core/usecases/register-user/register-user-usecase.interface';
import { GetDateTimeService, IGetDateTimeService } from '@/core/commons';
import { WebModule } from '@/web-api/commons/modules';

@Module({
    imports: [GetUserByNameModule, WebModule],
    controllers: [RegisterUserController],
    providers: [
        // IsUsernameUniqueConstraint,
        UserRepository,
        {
            provide: IGetDateTimeService,
            useClass: GetDateTimeService,
        },
        {
            provide: GetUserByNameGateway,
            useClass: GetUserByNameProvider,
        },
        {
            provide: IRegisterUserUseCase,
            useClass: RegisterUserUseCase,
        },
        {
            provide: RegisterUserGateway,
            useClass: RegisterUserProvider,
        },
    ],
})

export class RegisterUserModule { }

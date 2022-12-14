import { Inject, Injectable } from '@nestjs/common';
import { UniqueConstraintException } from '@/core/exceptions';
import { User } from '@/core/models';
import { IRegisterUserGateway, IRegisterUserGatewaySymbol, IRegisterUserUseCase, RegisterUserCommand } from '@/core/usecases/register-user';
import { IGetUserByNameGateway, IGetUserByNameGatewaySymbol } from '@/core/usecases/xcutting';
import { IGetDateTimeSymbol, IGetDateTimeService } from '@/core/commons';

@Injectable()
export class RegisterUserUseCase implements IRegisterUserUseCase {
    constructor(
        @Inject(IGetUserByNameGatewaySymbol)
        private getUserByNameGateway: IGetUserByNameGateway,
        @Inject(IGetDateTimeSymbol)
        private getDateTimeService: IGetDateTimeService,
        @Inject(IRegisterUserGatewaySymbol)
        private registerUserGateway: IRegisterUserGateway,
    ) { }
    async execute(command: RegisterUserCommand): Promise<User> {
        await this.checkDuplicatedName(command.name);

        const user: User = {
            id: null,
            name: command.name,
            email: command.email,
            password: command.password,
            fullname: command.fullname,
            createdAt: this.getDateTimeService.now(),
        };

        return this.registerUserGateway.execute(user);
    }

    async checkDuplicatedName(name: string): Promise<void> {
        const optional = await this.getUserByNameGateway.execute(name);
        optional.ifPresent(() => this.throwUniqueConstraintException(name));
    }

    throwUniqueConstraintException(name: string): void {
        throw new UniqueConstraintException('validation.user.name.duplicated', [name]);
    }
}

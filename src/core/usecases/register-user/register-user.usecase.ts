import { Inject, Injectable } from '@nestjs/common';
import { UniqueConstraintException } from '@/core/exceptions';
import { User } from '@/core/models';
import { IRegisterUserUseCase, RegisterUserCommand, IRegisterUserGateway } from '@/core/usecases/register-user';
import { IGetUserByNameGateway } from '@/core/usecases/xcutting';
import { IGetDateTimeService } from '@/core/commons';

@Injectable()
export class RegisterUserUseCase implements IRegisterUserUseCase {
    constructor(
        @Inject(IGetUserByNameGateway)
        private getUserByNameGateway: IGetUserByNameGateway,
        @Inject(IGetDateTimeService)
        private getDateTimeService: IGetDateTimeService,
        @Inject(IRegisterUserGateway)
        private registerUserGateway: IRegisterUserGateway,
    ) { }
    async execute(command: RegisterUserCommand): Promise<User> {
        await this.checkDuplicatedName(command.name);

        const user: User = new User(
            null,
            command.name,
            command.email,
            command.password,
            command.fullname,
            this.getDateTimeService.now(),
        );

        return this.registerUserGateway.execute(user);
    }

    async checkDuplicatedName(name: string): Promise<void> {
        const user: User = await this.getUserByNameGateway.execute(name);
        if (user) {
            throw new UniqueConstraintException('validation.user.name.duplicated {}', [name]);
        }
    }
}

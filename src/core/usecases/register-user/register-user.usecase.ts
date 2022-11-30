import { Inject, Injectable } from '@nestjs/common';
import { UniqueConstraintException } from '@/core/exceptions';
import { User } from '@/core/models';
import { IRegisterUserUseCase, RegisterUserCommand, RegisterUserGateway } from '@/core/usecases/register-user';
import { GetUserByNameGateway } from '@/core/usecases/xcutting';
import { IGetDateTimeService } from '@/core/common';

@Injectable()
export class RegisterUserUseCase implements IRegisterUserUseCase {
    constructor(
        @Inject(GetUserByNameGateway)
        private getUserByNameGateway: GetUserByNameGateway,
        @Inject(IGetDateTimeService)
        private getDateTimeService: IGetDateTimeService,
        @Inject(RegisterUserGateway)
        private registerUserGateway: RegisterUserGateway,
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

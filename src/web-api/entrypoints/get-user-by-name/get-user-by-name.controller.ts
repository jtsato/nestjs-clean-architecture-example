import { Inject } from '@nestjs/common';
import { User } from '@/core/models';
import { GetUserByNameQuery, IGetUserByNameUseCase, IGetUserByNameUseCaseSymbol } from '@/core/usecases/get-user-by-name';
import { UserPresenter, UserResponse } from '@/web-api/xcutting';
import { IGetUserByNameController } from './get-user-by-name.controller.interface';

export class GetUserByNameController implements IGetUserByNameController {
    constructor(@Inject(IGetUserByNameUseCaseSymbol) private getUserByNameUseCase: IGetUserByNameUseCase) { }

    async execute(name: string): Promise<UserResponse> {
        const query: GetUserByNameQuery = new GetUserByNameQuery(name);
        const user: User = await this.getUserByNameUseCase.execute(query);
        return UserPresenter.of(user);
    }
}

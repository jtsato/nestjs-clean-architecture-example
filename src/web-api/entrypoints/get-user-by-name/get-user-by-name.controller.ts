import { Controller, Get, Header, Inject, Query } from '@nestjs/common';
import { User } from '@/core/models';
import { GetUserByNameQuery, IGetUserByNameUseCase, IGetUserByNameUseCaseSymbol } from '@/core/usecases/get-user-by-name';
import { UserPresenter, UserResponse } from '@/web-api/xcutting';

@Controller('/users/by-name')
export class GetUserByNameController {
    constructor(@Inject(IGetUserByNameUseCaseSymbol) private getUserByNameUseCase: IGetUserByNameUseCase) { }

    @Get()
    @Header('Content-Type', 'application/json')
    @Header('Cache-Control', 'no-cache')
    async execute(@Query('name') name: string): Promise<UserResponse> {
        const query: GetUserByNameQuery = new GetUserByNameQuery(name);
        const user: User = await this.getUserByNameUseCase.execute(query);
        return UserPresenter.of(user);
    }
}

import { Controller, Get, Header, Inject, Query, UseFilters } from '@nestjs/common';
import { User } from '@/core/models';
import { GetUserByNameQuery, IGetUserByNameUseCase } from '@/core/usecases/get-user-by-name';
import { UserPresenter, UserResponse } from '@/web-api/xcutting';

@Controller('/users/by-name')
export class GetUserByNameController {
    constructor(@Inject(IGetUserByNameUseCase) private getUserByNameUseCase: IGetUserByNameUseCase) { }

    @Get()
    @Header('Content-Type', 'application/json')
    @Header('Cache-Control', 'no-cache')
    async execute(@Query('name') name: string): Promise<UserResponse> {
        const command: GetUserByNameQuery = new GetUserByNameQuery(name);
        const user: User = await this.getUserByNameUseCase.execute(command);
        return UserPresenter.of(user);
    }
}

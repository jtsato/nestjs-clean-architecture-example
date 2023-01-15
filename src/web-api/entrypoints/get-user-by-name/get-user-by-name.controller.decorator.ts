/* eslint-disable sonarjs/no-duplicate-string */

import { Controller, Get, Header, Inject, Query, UseInterceptors } from '@nestjs/common';
import {
    ApiOperation,
    ApiConsumes,
    ApiProduces,
    ApiHeader,
    ApiExtraModels,
    ApiBadRequestResponse,
    ApiInternalServerErrorResponse,
    ApiTags,
    ApiSecurity,
    ApiQuery,
    ApiOkResponse,
    ApiNotFoundResponse
} from '@nestjs/swagger';
import { Field, HttpResponse, ResponseStatus } from '@/web-api/commons/models';
import { StopwatchInterceptor } from '@/web-api/commons/interceptors';
import { IGetUserByNameControllerSymbol, IGetUserByNameController } from './get-user-by-name.controller.interface';
import { UserResponse } from '@/web-api/xcutting';

@ApiSecurity('Api-Key')
@Controller('/users/by-name')
@UseInterceptors(StopwatchInterceptor)
export class GetUserByNameDecoratorController {
    constructor(@Inject(IGetUserByNameControllerSymbol) private getUserByNameController: IGetUserByNameController) { }

    @ApiExtraModels(ResponseStatus, Field, UserResponse)
    @ApiConsumes('application/json')
    @ApiProduces('application/json')
    @ApiQuery({
        name: 'name',
    })
    @ApiOkResponse({ description: 'User found successfully.', type: HttpResponse })
    @ApiNotFoundResponse({ description: 'User not found.', type: ResponseStatus })
    @ApiBadRequestResponse({ description: 'Bad Request.', type: ResponseStatus })
    @ApiInternalServerErrorResponse({ description: 'Internal Server Error.', type: ResponseStatus })
    @ApiHeader({
        name: 'Accept-Language',
        description: 'Represents a specific geographical, political, or cultural region. Language & Country.',
        required: false,
    })
    @ApiOperation({
        description: 'Get a user by name',
        summary: 'Get a user by name',
    })
    @ApiTags('Users')
    @Header('Content-Type', 'application/json')
    @Header('Cache-Control', 'no-cache')
    @Get()
    async execute(@Query('name') name: string): Promise<UserResponse> {
        return this.getUserByNameController.execute(name);
    }
}

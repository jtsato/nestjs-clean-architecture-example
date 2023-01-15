/* eslint-disable sonarjs/no-duplicate-string */

import { Body, Controller, Header, Inject, Post, UseInterceptors } from '@nestjs/common';
import { ApiOperation,
    ApiBody,
    ApiConsumes,
    ApiProduces,
    ApiCreatedResponse,
    ApiHeader,
    ApiExtraModels,
    ApiBadRequestResponse,
    ApiInternalServerErrorResponse,
    ApiTags,
    ApiSecurity } from '@nestjs/swagger';
import { Field, HttpResponse, ResponseStatus } from '@/web-api/commons/models';
import { StopwatchInterceptor } from '@/web-api/commons/interceptors';
import { IRegisterUserControllerSymbol, IRegisterUserController } from './register-user.controller.interface';
import { UserResponse } from '@/web-api/xcutting';
import { RegisterUserRequest } from './register-user-request.model';

@ApiSecurity('Api-Key')
@Controller('/users')
@UseInterceptors(StopwatchInterceptor)
export class RegisterUserDecoratorController {
    constructor(@Inject(IRegisterUserControllerSymbol) private registerUserController: IRegisterUserController) { }

    @ApiExtraModels(ResponseStatus, Field, UserResponse)
    @ApiConsumes('application/json')
    @ApiProduces('application/json')
    @ApiBody({
        required: true,
        type: RegisterUserRequest,
    })
    @ApiCreatedResponse({ description: 'User registered successfully.', type: HttpResponse })
    @ApiBadRequestResponse({ description: 'Bad Request.', type: ResponseStatus })
    @ApiInternalServerErrorResponse({ description: 'Internal Server Error.', type: ResponseStatus })
    @ApiHeader({
        name: 'Accept-Language',
        description: 'Represents a specific geographical, political, or cultural region. Language & Country.',
        required: false,
    })
    @ApiOperation({
        description: 'Register a new user.',
        summary: 'Register a new user.',
    })
    @ApiTags('Users')
    @Header('Content-Type', 'application/json')
    @Header('Cache-Control', 'no-cache')
    @Post()
    async execute(@Body() request: RegisterUserRequest): Promise<HttpResponse> {
        return this.registerUserController.execute(request);
    }
}

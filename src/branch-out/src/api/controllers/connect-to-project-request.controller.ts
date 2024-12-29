import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ApiBadRequestResponse, ApiOkResponse, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { ConnectToProjectRequestService } from '../services/connect-to-project-request.service';
import { CreateConnectToProjectRequestDTO } from '../dtos/create-connect-to-project-request.dto';
import { ConnectToProjectRequestResponse } from '../../responses/connect-to-project-request.response';

@ApiTags('Connect to Project Request')
@Controller('/connect-to-project-requests')
export class ConnectToProjectRequestController {
    constructor(private readonly connectToProjectRequestService: ConnectToProjectRequestService) {}

    @ApiOperation({
        summary: 'Get all connect-to-project requests',
        description: 'Endpoint for getting all connect-to-project requests',
    })
    @ApiOkResponse({
        type: [ConnectToProjectRequestResponse],
    })
    @Get()
    getAll() {
        return this.connectToProjectRequestService.getAll();
    }

    @ApiOperation({
        summary: 'Get connect-to-project request by id',
        description: 'Endpoint for getting a connect-to-project request by id',
    })
    @ApiOkResponse({
        type: ConnectToProjectRequestResponse,
    })
    @ApiBadRequestResponse({
        description: `\n
    InvalidEntityIdException:
      Connect-to-project request with such id not found`,
    })
    @ApiParam({
        name: 'id',
        description: 'Id of the connect-to-project request to get',
    })
    @Get('/:id')
    get(@Param('id') id: string) {
        return this.connectToProjectRequestService.getById(id);
    }

    @ApiOperation({
        summary: 'Create a new connect-to-project request',
        description: 'Endpoint for creating a new connect-to-project request',
    })
    @ApiOkResponse({
        type: ConnectToProjectRequestResponse,
    })
    @ApiBadRequestResponse({
        description: `\n
    InvalidBodyException:
      User id cannot be empty
      Project id cannot be empty`,
    })
    @Post()
    create(@Body() body: CreateConnectToProjectRequestDTO) {
        return this.connectToProjectRequestService.create(body);
    }

    @ApiOperation({
        summary: 'Delete connect-to-project request by id',
        description: 'Endpoint for deleting a connect-to-project request by id',
    })
    @ApiOkResponse({
        description: 'Connect-to-project request successfully deleted',
    })
    @ApiBadRequestResponse({
        description: `\n
    InvalidEntityIdException:
      Connect-to-project request with such id not found`,
    })
    @ApiParam({
        name: 'id',
        description: 'Id of the connect-to-project request to delete',
    })
    @Delete('/:id')
    delete(@Param('id') id: string) {
        return this.connectToProjectRequestService.deleteById(id);
    }
}

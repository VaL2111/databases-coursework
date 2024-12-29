import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiBadRequestResponse, ApiOkResponse, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { ProjectService } from '../services/project.service';
import { CreateProjectDTO } from '../dtos/create-project.dto';
import { UpdateProjectDTO } from '../dtos/update-project.dto';
import { ProjectResponse } from '../../responses/project.response';

@ApiTags('Project')
@Controller('/projects')
export class ProjectController {
    constructor(private readonly projectService: ProjectService) {}

    @ApiOperation({
        summary: 'Get all projects',
        description: 'Endpoint for getting all projects',
    })
    @ApiOkResponse({
        type: [ProjectResponse],
    })
    @Get()
    getAll() {
        return this.projectService.getAll();
    }

    @ApiOperation({
        summary: 'Get project by id',
        description: 'Endpoint for getting project by id',
    })
    @ApiOkResponse({
        type: ProjectResponse,
    })
    @ApiBadRequestResponse({
        description: `\n
    InvalidEntityIdException:
      Project with such id not found`,
    })
    @ApiParam({
        name: 'id',
        description: 'Id of the project to get',
    })
    @Get('/:id')
    get(@Param('id') id: string) {
        return this.projectService.getById(id);
    }

    @ApiOperation({
        summary: 'Create a new project',
        description: 'Endpoint for creating a new project',
    })
    @ApiOkResponse({
        type: ProjectResponse,
    })
    @ApiBadRequestResponse({
        description: `\n
    InvalidBodyException:
      Project name cannot be empty
      Project status cannot be empty`,
    })
    @Post()
    create(@Body() body: CreateProjectDTO) {
        return this.projectService.create(body);
    }

    @ApiOperation({
        summary: 'Update project by id',
        description: 'Endpoint for updating a project by id',
    })
    @ApiOkResponse({
        type: ProjectResponse,
    })
    @ApiBadRequestResponse({
        description: `\n
    InvalidEntityIdException:
      Project with such id not found`,
    })
    @ApiParam({
        name: 'id',
        description: 'Id of the project to update',
    })
    @Patch('/:id')
    update(@Param('id') id: string, @Body() body: UpdateProjectDTO) {
        return this.projectService.updateById(id, body);
    }

    @ApiOperation({
        summary: 'Delete project by id',
        description: 'Endpoint for deleting a project by id',
    })
    @ApiOkResponse({
        description: 'Project successfully deleted',
    })
    @ApiBadRequestResponse({
        description: `\n
    InvalidEntityIdException:
      Project with such id not found`,
    })
    @ApiParam({
        name: 'id',
        description: 'Id of the project to delete',
    })
    @Delete('/:id')
    delete(@Param('id') id: string) {
        return this.projectService.deleteById(id);
    }
}

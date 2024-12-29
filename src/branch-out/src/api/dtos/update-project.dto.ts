import { IsOptional, IsString, MaxLength, MinLength } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { validationOptionsMsg } from '../../utils';

export class UpdateProjectDTO {
    @ApiPropertyOptional({
        description: 'Name of the project',
    })
    @IsOptional()
    @IsString(validationOptionsMsg('Project name must be a string'))
    @MinLength(3, validationOptionsMsg('Project name is too short (min: 3)'))
    @MaxLength(50, validationOptionsMsg('Project name is too long (max: 50)'))
    name?: string;

    @ApiPropertyOptional({
        description: 'Description of the project',
    })
    @IsOptional()
    @IsString(validationOptionsMsg('Description must be a string'))
    description?: string;

    @ApiPropertyOptional({
        description: 'Status of the project',
    })
    @IsOptional()
    @IsString(validationOptionsMsg('Status must be a string'))
    status?: string;
}

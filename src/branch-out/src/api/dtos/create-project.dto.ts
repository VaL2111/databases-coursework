import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { validationOptionsMsg } from '../../utils';

export class CreateProjectDTO {
    @ApiProperty({
        description: 'Name of the project',
    })
    @IsNotEmpty(validationOptionsMsg('Project name cannot be empty'))
    @IsString(validationOptionsMsg('Project name must be a string'))
    @MinLength(3, validationOptionsMsg('Project name is too short (min: 3)'))
    @MaxLength(50, validationOptionsMsg('Project name is too long (max: 50)'))
    name: string;

    @ApiProperty({
        description: 'Description of the project',
    })
    @IsNotEmpty(validationOptionsMsg('Description cannot be empty'))
    @IsString(validationOptionsMsg('Description must be a string'))
    description: string;

    @ApiProperty({
        description: 'Status of the project',
    })
    @IsNotEmpty(validationOptionsMsg('Status cannot be empty'))
    @IsString(validationOptionsMsg('Status must be a string'))
    status: string;
}

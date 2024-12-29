import { IsNotEmpty, IsString, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { validationOptionsMsg } from '../../utils';

export class CreateConnectToProjectRequestDTO {
    @ApiProperty({
        description: 'ID of the user making the request',
    })
    @IsNotEmpty(validationOptionsMsg('User ID cannot be empty'))
    @IsUUID('4', validationOptionsMsg('User ID must be a valid UUID'))
    userId: string;

    @ApiProperty({
        description: 'ID of the project to connect to',
    })
    @IsNotEmpty(validationOptionsMsg('Project ID cannot be empty'))
    @IsUUID('4', validationOptionsMsg('Project ID must be a valid UUID'))
    projectId: string;
}
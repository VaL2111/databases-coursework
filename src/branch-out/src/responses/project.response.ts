import { ApiProperty } from '@nestjs/swagger';

export class ProjectResponse {
    @ApiProperty({ description: 'ID of the project' })
    id: string;

    @ApiProperty({ description: 'Name of the project' })
    name: string;

    @ApiProperty({ description: 'Description of the project' })
    description: string;

    @ApiProperty({ description: 'Status of the project' })
    status: string;
}

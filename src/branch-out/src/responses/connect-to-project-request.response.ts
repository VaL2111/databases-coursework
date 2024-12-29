import { ApiProperty } from '@nestjs/swagger';

export class ConnectToProjectRequestResponse {
    @ApiProperty({ description: 'ID of the connect-to-project request' })
    id: string;

    @ApiProperty({ description: 'ID of the user who made the request' })
    userId: string;

    @ApiProperty({ description: 'ID of the project to connect to' })
    projectId: string;
}

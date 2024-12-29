import { Module } from '@nestjs/common';
import { ConnectToProjectRequestController } from '../api/controllers/connect-to-project-request.controller';
import { ConnectToProjectRequestService } from '../api/services/connect-to-project-request.service';

@Module({
    controllers: [ConnectToProjectRequestController],
    providers: [ConnectToProjectRequestService],
})
export class ConnectToProjectRequestModule {}
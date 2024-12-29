import { Module } from '@nestjs/common';
import { ProjectController } from '../api/controllers/project.controller';
import { ProjectService } from '../api/services/project.service';

@Module({
    controllers: [ProjectController],
    providers: [ProjectService],
})
export class ProjectModule {}

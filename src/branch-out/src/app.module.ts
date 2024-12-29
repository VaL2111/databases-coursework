import { Module } from '@nestjs/common';
import { PrismaModule } from './modules/prisma.module';
import { ProjectModule } from './modules/project.module';
import { ConnectToProjectRequestModule } from './modules/connect-to-project-request.module';

@Module({
  imports: [PrismaModule, ProjectModule, ConnectToProjectRequestModule],
})
export class AppModule {}

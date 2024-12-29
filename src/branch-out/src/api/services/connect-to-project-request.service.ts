import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import { CreateConnectToProjectRequestDTO } from '../dtos/create-connect-to-project-request.dto';

@Injectable()
export class ConnectToProjectRequestService {
    constructor(private readonly prisma: PrismaService) {}

    // Отримати всі запити
    getAll() {
        return this.prisma.connectToProjectRequest.findMany();
    }

    // Отримати запит за ID
    async getById(id: string) {
        const request = await this.prisma.connectToProjectRequest.findUnique({ where: { id } });
        if (!request) {
            throw new NotFoundException(`Connect-to-project request with ID ${id} does not exist`);
        }
        return request;
    }

    // Створити новий запит
    async create(data: CreateConnectToProjectRequestDTO) {
        try {
            return await this.prisma.connectToProjectRequest.create({ data });
        } catch (error) {
            if (error.code === 'P2003') { // Foreign key constraint failed
                throw new BadRequestException('Invalid userId or projectId. Foreign key constraint failed.');
            }
            throw new BadRequestException('Error creating the request. Please check the data.');
        }
    }

    // Видалити запит за ID
    async deleteById(id: string) {
        const request = await this.prisma.connectToProjectRequest.findUnique({ where: { id } });
        if (!request) {
            throw new NotFoundException(`Request with ID ${id} does not exist`);
        }

        return this.prisma.connectToProjectRequest.delete({ where: { id } });
    }
}

import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import { CreateProjectDTO } from '../dtos/create-project.dto';
import { UpdateProjectDTO } from '../dtos/update-project.dto';

@Injectable()
export class ProjectService {
    constructor(private readonly prisma: PrismaService) {}

    // Отримати всі проекти
    getAll() {
        return this.prisma.project.findMany();
    }

    // Отримати проект за ID
    async getById(id: string) {
        const project = await this.prisma.project.findUnique({ where: { id } });
        if (!project) {
            throw new NotFoundException(`Project with ID ${id} does not exist`);
        }
        return project;
    }

    // Створити новий проект
    async create(data: CreateProjectDTO) {
        try {
            return await this.prisma.project.create({ data });
        } catch (error) {
            throw new BadRequestException('Error creating the project. Please check the data.');
        }
    }

    // Оновити проект за ID
    async updateById(id: string, data: UpdateProjectDTO) {
        const project = await this.prisma.project.findUnique({ where: { id } });
        if (!project) {
            throw new NotFoundException(`Project with ID ${id} does not exist`);
        }

        return this.prisma.project.update({ where: { id }, data });
    }

    // Видалити проект за ID
    async deleteById(id: string) {
        const project = await this.prisma.project.findUnique({ where: { id } });
        if (!project) {
            throw new NotFoundException(`Project with ID ${id} does not exist`);
        }

        return this.prisma.project.delete({ where: { id } });
    }
}

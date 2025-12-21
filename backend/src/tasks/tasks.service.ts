import { Injectable } from '@nestjs/common';
import { TaskStatus } from 'src/generated/prisma/enums';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TasksService {
   constructor(private prisma: PrismaService) {}

   async createTask(dto: {
      title: string;
      description?: string;
      lat: number;
      lng: number;
   }) {
      return this.prisma.$queryRaw`
         INSERT INTO tasks (
            id, title, description, status, created_at, updated_at, coordinates
         )
         VALUES (
            gen_random_uuid(),
            ${dto.title},
            ${dto.description ?? null},
            ${TaskStatus.TODO},
            now(),
            now(),
            ST_MakePoint(${dto.lng}, ${dto.lat})::geography
         )
         RETURNING *
      `;
   }

   async getTasks(status?: TaskStatus) {
      if (status) {
         return this.prisma.task.findMany({ where: { status } });
      }

      return this.prisma.task.findMany();
   }

   async getTaskById(id: string) {
      return this.prisma.task.findUnique({ where: { id } });
   }

   async updateStatus(id: string, status: TaskStatus) {
      const finishedAt = status === TaskStatus.DONE ? new Date() : null;

      return this.prisma.task.update({
         where: { id },
         data: { status, finishedAt },
      });
   }

   async updateLocation(id: string, lat: number, lng: number) {
      return this.prisma.$queryRaw`
         UPDATE tasks
         SET coordinates = ST_MakePoint(${lng}, ${lat})::geography,
            updated_at = now()
         WHERE id = ${id}
         RETURNING *
      `;
   }

   async getNearbyTasks(lat: number, lng: number, radius: number) {
      return this.prisma.$queryRaw`
         SELECT *,
         ST_Distance(
            coordinates,
            ST_MakePoint(${lng}, ${lat})::geography
         ) AS distance
         FROM tasks
         WHERE ST_DWithin(
            coordinates,
            ST_MakePoint(${lng}, ${lat})::geography,
            ${radius}
         )
         ORDER BY distance ASC
      `;
   }

   async deleteTask(id: string) {
      return this.prisma.task.delete({ where: { id } });
   }
}

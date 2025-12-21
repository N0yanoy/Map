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
   return this.prisma.$queryRawUnsafe(
      `
      INSERT INTO tasks (
         id, title, description, status, created_at, updated_at, coordinates
      )
      VALUES (
         gen_random_uuid(),
         $1, $2, $3,
         now(), now(),
         ST_MakePoint($4, $5)::geography
      )
      RETURNING *
      `,
      dto.title,
      dto.description ?? null,
      TaskStatus.TODO,
      dto.lng,
      dto.lat,
   );
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
   return this.prisma.$queryRawUnsafe(
      `
      UPDATE tasks
      SET coordinates = ST_MakePoint($1, $2)::geography,
         updated_at = now()
      WHERE id = $3
      RETURNING *
      `,
      lng,
      lat,
      id,
   );
}

   async getNearbyTasks(lat: number, lng: number, radius: number) {
   return this.prisma.$queryRawUnsafe(
      `
      SELECT *,
            ST_Distance(
               coordinates,
               ST_MakePoint($1, $2)::geography
            ) AS distance
      FROM tasks
      WHERE ST_DWithin(
         coordinates,
         ST_MakePoint($1, $2)::geography,
         $3
      )
      ORDER BY distance ASC
      `,
      lng,
      lat,
      radius,
   );
   }

  async deleteTask(id: string) {
    return this.prisma.task.delete({ where: { id } });
  }
}

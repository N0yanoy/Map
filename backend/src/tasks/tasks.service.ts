import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { TaskStatus } from 'src/generated/prisma/enums';
import { PrismaService } from 'src/prisma/prisma.service';
import { Point } from 'geojson';
import { TaskRow, TaskDTO, NearbyTaskDTO, NearbyTaskRow } from 'src/tasks/types';
import { Prisma } from 'src/generated/prisma/client';

@Injectable()
export class TasksService {
   constructor(private prisma: PrismaService) {}

   async createTask(dto: {
   title: string;
   description?: string;
   location: Point;
   }): Promise<TaskDTO> {
      const [row] = await this.prisma.$queryRaw<TaskRow[]>`
         INSERT INTO tasks (
         id, title, description, status, created_at, updated_at, coordinates
         )
         VALUES (
         gen_random_uuid(),
         ${dto.title},
         ${dto.description ?? undefined},
         ${TaskStatus.TODO},
         now(),
         now(),
         ST_GeomFromGeoJSON(${JSON.stringify(dto.location)})::geography
         )
         RETURNING
         id,
         title,
         description,
         status,
         created_at,
         updated_at,
         finished_at,
         ST_AsGeoJSON(coordinates) AS location
      `;

      return this.mapRow(row);
   }

   async getTasks(status?: TaskStatus): Promise<TaskDTO[]> {
      const rows = await this.prisma.$queryRaw<TaskRow[]>`
      SELECT
      id,
      title,
      description,
      status,
      created_at,
      updated_at,
      finished_at,
      ST_AsGeoJSON(coordinates) AS location
      FROM tasks
      ${status ? Prisma.sql`WHERE status = ${status}` : Prisma.empty}
      ORDER BY created_at DESC
      `;

      return rows.map(this.mapRow);
   }


   async getTaskById(id: string): Promise<TaskDTO> {
      const rows = await this.prisma.$queryRaw<TaskRow[]>`
         SELECT
         id,
         title,
         description,
         status,
         created_at,
         updated_at,
         finished_at,
         ST_AsGeoJSON(coordinates) AS location
         FROM tasks
         WHERE id = ${id}`;

      if (rows.length === 0) {
         throw new NotFoundException(`Task ${id} not found`);
      }

      return this.mapRow(rows[0]);
   }


async updateStatus(id: string, status: TaskStatus): Promise<TaskDTO> {
   const rows = await this.prisma.$queryRaw<TaskRow[]>`
      UPDATE tasks
      SET
      status = ${status},
      finished_at = ${status === TaskStatus.DONE ? new Date() : undefined},
      updated_at = now()
      WHERE id = ${id}
      RETURNING
      id,
      title,
      description,
      status,
      created_at,
      updated_at,
      finished_at,
      ST_AsGeoJSON(coordinates) AS location
   `;

   if (rows.length === 0) {
      throw new NotFoundException(`Task ${id} not found`);
   }

   return this.mapRow(rows[0]);
}


   async updateLocation(id: string, location: Point): Promise<TaskDTO> {
      const rows = await this.prisma.$queryRaw<TaskRow[]>`
         UPDATE tasks
         SET
         coordinates = ST_GeomFromGeoJSON(${JSON.stringify(location)})::geography,
         updated_at = now()
         WHERE id = ${id}
         RETURNING
         id,
         title,
         description,
         status,
         created_at,
         updated_at,
         finished_at,
         ST_AsGeoJSON(coordinates) AS location
      `;

      if (rows.length === 0) {
         throw new NotFoundException(`Task ${id} not found`);
      }

      return this.mapRow(rows[0]);
   }

   async getNearbyTasks(
   location: Point,
   radius: number
   ): Promise<NearbyTaskDTO[]> {
      if (radius <= 0) {
         throw new BadRequestException('Radius must be greater than 0');
      }

      const rows = await this.prisma.$queryRaw<NearbyTaskRow[]>`
         SELECT
         id,
         title,
         description,
         status,
         created_at,
         updated_at,
         finished_at,
         ST_AsGeoJSON(coordinates) AS location,
         ST_Distance(
            coordinates,
            ST_GeomFromGeoJSON(${JSON.stringify(location)})::geography
         ) AS distance
         FROM tasks
         WHERE ST_DWithin(
         coordinates,
         ST_GeomFromGeoJSON(${JSON.stringify(location)})::geography,
         ${radius}
         )
         ORDER BY distance ASC
      `;

      return rows.map(r => ({
         ...this.mapRow(r),
         distance: r.distance,
      }));
   }


   async deleteTask(id: string): Promise<void> {
      try {
         await this.prisma.task.delete({ where: { id } });
      } catch {
         throw new NotFoundException(`Task ${id} not found`);
      }
   }


   private mapRow(row: TaskRow): TaskDTO {
      return {
         id: row.id,
         title: row.title,
         description: row.description ?? undefined,
         status: row.status,
         location: JSON.parse(row.location),
         createdAt: row.created_at,
         updatedAt: row.updated_at,
         finishedAt: row.finished_at ?? undefined,
      };
  }
}

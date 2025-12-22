import { Controller, Get, Post, Patch, Delete, Param, Body, Query } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dtos/create-task.dto';
import { UpdateTaskStatusDto } from './dtos/update-task-status.dto';
import { UpdateTaskLocationDto } from './dtos/update-task-location.dto';
import { TaskStatus } from 'src/generated/prisma/enums';
import { Point } from 'geojson';

@Controller('tasks')
export class TasksController {
   constructor(private readonly tasksService: TasksService) {}

   @Post()
   create(@Body() dto: CreateTaskDto) {
      return this.tasksService.createTask(dto);
   }

   @Get()
   getAll(@Query('status') status?: TaskStatus) {
      return this.tasksService.getTasks(status);
   }

   @Get(':id')
   getOne(@Param('id') id: string) {
      return this.tasksService.getTaskById(id);
   }

   @Patch(':id/status')
   updateStatus(@Param('id') id: string, @Body() dto: UpdateTaskStatusDto) {
      return this.tasksService.updateStatus(id, dto.status);
   }

   @Patch(':id/location')
   updateLocation(@Param('id') id: string, @Body() dto: UpdateTaskLocationDto) {
      return this.tasksService.updateLocation(id, dto.location);
   }

   @Get('nearby')
   getNearby(@Query('location') location: Point, @Query('radius') radius: number) {
      return this.tasksService.getNearbyTasks(location, Number(radius));
   }

   @Delete(':id')
   delete(@Param('id') id: string) {
      return this.tasksService.deleteTask(id);
   }
}

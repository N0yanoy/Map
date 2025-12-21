import { IsString, IsOptional, IsNumber } from 'class-validator';

export class CreateTaskDto {
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsNumber()
  lat: number;

  @IsNumber()
  lng: number;
}
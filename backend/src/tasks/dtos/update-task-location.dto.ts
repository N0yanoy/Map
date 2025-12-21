import { IsNumber } from 'class-validator';

export class UpdateTaskLocationDto {
  @IsNumber()
  lat: number;

  @IsNumber()
  lng: number;
}
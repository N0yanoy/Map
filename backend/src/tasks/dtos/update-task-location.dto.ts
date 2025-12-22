import { ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { GeoPointDto } from './geo-point.dto';

export class UpdateTaskLocationDto {
  @ValidateNested()
  @Type(() => GeoPointDto)
  location: GeoPointDto;
}

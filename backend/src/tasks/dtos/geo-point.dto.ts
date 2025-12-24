import { IsNumber, IsString, IsIn } from 'class-validator';

// This is a class, so class-validator can actually validate it
export class GeoPointDto {
  @IsString()
  @IsIn(['Point'])
  type: 'Point';

  @IsNumber({}, { each: true })
  coordinates: [number, number];
}

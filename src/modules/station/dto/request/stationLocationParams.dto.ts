import { IsNumber } from 'class-validator';

export class stationLocationParams {
    @IsNumber()
    readonly latitude: number;
  
    @IsNumber()
    readonly longitude: number;

    @IsNumber()
    readonly radiusInMetres: number;
}

import { PartialType } from '@nestjs/mapped-types';
import {
  IsArray,
  IsIn,
  IsNumber,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';

export class CreateRoomTypeDto {
  @IsString() name: string;
  @IsIn(['signature', 'business', 'express']) property: string;
  @IsNumber() @Min(0) basePrice: number;
  @IsOptional() @IsNumber() @Min(1) capacity?: number;
  @IsOptional() @IsNumber() @Min(0) sizeSqft?: number;
  @IsOptional() @IsString() beds?: string;
  @IsOptional() @IsArray() @IsString({ each: true }) amenities?: string[];
  @IsOptional() @IsNumber() @Min(0) count?: number;
}

export class UpdateRoomTypeDto extends PartialType(CreateRoomTypeDto) {}

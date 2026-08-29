import { PartialType } from '@nestjs/mapped-types';
import { IsIn, IsNumber, IsOptional, IsString, Min } from 'class-validator';

export class CreatePropertyDto {
  @IsString() name: string;
  @IsString() location: string;
  @IsIn(['premium', 'mid-range', 'value']) tier: string;
  @IsOptional() @IsIn(['live', 'launching']) status?: string;
  @IsOptional() @IsNumber() @Min(0) rooms?: number;
  @IsOptional() @IsNumber() @Min(0) occupancy?: number;
  @IsOptional() @IsNumber() @Min(0) priceFrom?: number;
}

export class UpdatePropertyDto extends PartialType(CreatePropertyDto) {}

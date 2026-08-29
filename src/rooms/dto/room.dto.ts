import { PartialType } from '@nestjs/mapped-types';
import { IsIn, IsNumber, IsOptional, IsString, Min } from 'class-validator';

export class CreateRoomDto {
  @IsString() number: string;
  @IsIn(['signature', 'business', 'express']) property: string;
  @IsOptional() @IsString() typeId?: string;
  @IsOptional() @IsString() typeName?: string;
  @IsOptional() @IsNumber() @Min(0) floor?: number;
  @IsOptional()
  @IsIn(['available', 'occupied', 'cleaning', 'maintenance'])
  status?: string;
  @IsOptional() @IsNumber() @Min(0) price?: number;
}

export class UpdateRoomDto extends PartialType(CreateRoomDto) {}

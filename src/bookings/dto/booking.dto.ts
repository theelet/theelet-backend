import { PartialType } from '@nestjs/mapped-types';
import {
  IsBoolean,
  IsEmail,
  IsIn,
  IsNumber,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';

export class CreateBookingDto {
  @IsString() guestName: string;
  @IsEmail() email: string;
  @IsOptional() @IsString() whatsapp?: string;
  @IsOptional() @IsString() location?: string;
  @IsOptional() @IsString() checkIn?: string;
  @IsOptional() @IsString() checkOut?: string;
  @IsOptional() @IsNumber() @Min(1) rooms?: number;
  @IsOptional() @IsNumber() @Min(0) adults?: number;
  @IsOptional() @IsNumber() @Min(0) children?: number;
  @IsOptional() @IsString() promo?: string;
  @IsOptional() @IsBoolean() consent?: boolean;
  @IsOptional() @IsIn(['website', 'backend']) source?: string;
  @IsOptional()
  @IsIn(['confirmed', 'pending', 'cancelled', 'checked-out'])
  status?: string;
}

export class UpdateBookingDto extends PartialType(CreateBookingDto) {}

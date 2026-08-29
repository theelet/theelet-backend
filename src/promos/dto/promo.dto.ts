import { PartialType } from '@nestjs/mapped-types';
import {
  IsBoolean,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  Min,
} from 'class-validator';

export class CreatePromoDto {
  @IsString() code: string;
  @IsOptional() @IsString() label?: string;
  @IsOptional() @IsString() discount?: string;
  @IsOptional() @IsNumber() @Min(0) @Max(100) discountPct?: number;
  @IsOptional() @IsBoolean() active?: boolean;
  @IsOptional() @IsNumber() @Min(0) uses?: number;
  @IsOptional() @IsString() expiresAt?: string;
}

export class UpdatePromoDto extends PartialType(CreatePromoDto) {}

export class VerifyPromoDto {
  @IsString() code: string;
}

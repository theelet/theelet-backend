import { PartialType } from '@nestjs/mapped-types';
import {
  IsBoolean,
  IsNumber,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';

export class CreateAreaDto {
  @IsString() name: string;
  @IsOptional() @IsString() blurb?: string;
  @IsOptional() @IsNumber() @Min(0) properties?: number;
  @IsOptional() @IsBoolean() featured?: boolean;
}

export class UpdateAreaDto extends PartialType(CreateAreaDto) {}

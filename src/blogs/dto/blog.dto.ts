import { PartialType } from '@nestjs/mapped-types';
import { IsIn, IsNumber, IsOptional, IsString, Min } from 'class-validator';

export class CreateBlogDto {
  @IsString() title: string;
  @IsString() slug: string;
  @IsOptional() @IsString() author?: string;
  @IsOptional() @IsString() category?: string;
  @IsOptional() @IsIn(['published', 'draft', 'scheduled']) status?: string;
  @IsOptional() @IsString() excerpt?: string;
  @IsOptional() @IsString() cover?: string;
  @IsOptional() @IsNumber() @Min(0) views?: number;
  @IsOptional() @IsString() publishedAt?: string;
}

export class UpdateBlogDto extends PartialType(CreateBlogDto) {}

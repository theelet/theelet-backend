import { PartialType } from '@nestjs/mapped-types';
import {
  IsBoolean,
  IsEmail,
  IsIn,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateSubscriberDto {
  @IsEmail() email: string;
  @IsOptional() @IsString() name?: string;
  @IsOptional() @IsIn(['newsletter', 'booking', 'referral']) source?: string;
  @IsOptional() @IsBoolean() consent?: boolean;
  @IsOptional() @IsString() subscribedAt?: string;
}

export class UpdateSubscriberDto extends PartialType(CreateSubscriberDto) {}

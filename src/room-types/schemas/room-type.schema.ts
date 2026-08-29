import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type RoomTypeDocument = HydratedDocument<RoomType>;

@Schema({ timestamps: true, collection: 'room_types' })
export class RoomType {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, enum: ['signature', 'business', 'express'] })
  property: string;

  @Prop({ required: true })
  basePrice: number;

  @Prop({ default: 2 })
  capacity: number;

  @Prop({ default: 0 })
  sizeSqft: number;

  @Prop({ default: '' })
  beds: string;

  @Prop({ type: [String], default: [] })
  amenities: string[];

  @Prop({ default: 0 })
  count: number;
}

export const RoomTypeSchema = SchemaFactory.createForClass(RoomType);

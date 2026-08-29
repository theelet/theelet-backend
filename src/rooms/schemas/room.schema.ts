import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type RoomDocument = HydratedDocument<Room>;

@Schema({ timestamps: true, collection: 'rooms' })
export class Room {
  @Prop({ required: true })
  number: string;

  @Prop({ required: true, enum: ['signature', 'business', 'express'] })
  property: string;

  @Prop({ default: '' })
  typeId: string;

  @Prop({ default: '' })
  typeName: string;

  @Prop({ default: 1 })
  floor: number;

  @Prop({
    required: true,
    enum: ['available', 'occupied', 'cleaning', 'maintenance'],
    default: 'available',
  })
  status: string;

  @Prop({ default: 0 })
  price: number;
}

export const RoomSchema = SchemaFactory.createForClass(Room);

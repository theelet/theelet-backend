import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type PropertyDocument = HydratedDocument<Property>;

@Schema({ timestamps: true, collection: 'properties' })
export class Property {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  location: string;

  @Prop({ required: true, enum: ['premium', 'mid-range', 'value'] })
  tier: string;

  @Prop({ required: true, enum: ['live', 'launching'], default: 'live' })
  status: string;

  @Prop({ default: 0 })
  rooms: number;

  @Prop({ default: 0 })
  occupancy: number;

  @Prop({ default: 0 })
  priceFrom: number;
}

export const PropertySchema = SchemaFactory.createForClass(Property);

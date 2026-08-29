import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type AreaDocument = HydratedDocument<Area>;

@Schema({ timestamps: true, collection: 'areas' })
export class Area {
  @Prop({ required: true })
  name: string;

  @Prop({ default: '' })
  blurb: string;

  @Prop({ default: 0 })
  properties: number;

  @Prop({ default: false })
  featured: boolean;
}

export const AreaSchema = SchemaFactory.createForClass(Area);

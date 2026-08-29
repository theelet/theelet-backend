import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type PromoDocument = HydratedDocument<Promo>;

@Schema({ timestamps: true, collection: 'promos' })
export class Promo {
  @Prop({ required: true, unique: true, uppercase: true, trim: true })
  code: string;

  @Prop({ default: '' })
  label: string;

  @Prop({ default: '' })
  discount: string;

  @Prop({ default: 0 })
  discountPct: number;

  @Prop({ default: true })
  active: boolean;

  @Prop({ default: 0 })
  uses: number;

  @Prop({ default: '' })
  expiresAt: string;
}

export const PromoSchema = SchemaFactory.createForClass(Promo);

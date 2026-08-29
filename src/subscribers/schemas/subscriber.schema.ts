import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type SubscriberDocument = HydratedDocument<Subscriber>;

@Schema({ timestamps: true, collection: 'subscribers' })
export class Subscriber {
  @Prop({ required: true, unique: true, lowercase: true, trim: true })
  email: string;

  @Prop({ default: '' })
  name: string;

  @Prop({
    required: true,
    enum: ['newsletter', 'booking', 'referral'],
    default: 'newsletter',
  })
  source: string;

  @Prop({ default: true })
  consent: boolean;

  @Prop({ default: '' })
  subscribedAt: string;
}

export const SubscriberSchema = SchemaFactory.createForClass(Subscriber);

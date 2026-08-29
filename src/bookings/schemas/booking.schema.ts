import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type BookingDocument = HydratedDocument<Booking>;

// Fields mirror exactly what the website booking form collects from the guest,
// plus server-side meta (reference, source, status, timestamps).
@Schema({ timestamps: true, collection: 'bookings' })
export class Booking {
  @Prop({ required: true, unique: true })
  reference: string;

  @Prop({ required: true })
  guestName: string;

  @Prop({ required: true, lowercase: true, trim: true })
  email: string;

  @Prop({ default: '' })
  whatsapp: string;

  // The location selected on the site (all locations / clifton / shahrah-e-faisal / dha).
  @Prop({ default: 'all locations' })
  location: string;

  @Prop({ default: '' })
  checkIn: string;

  @Prop({ default: '' })
  checkOut: string;

  @Prop({ default: 1 })
  rooms: number;

  @Prop({ default: 1 })
  adults: number;

  @Prop({ default: 0 })
  children: number;

  @Prop({ default: '' })
  promo: string;

  @Prop({ default: false })
  consent: boolean;

  @Prop({ required: true, enum: ['website', 'backend'], default: 'website' })
  source: string;

  @Prop({
    required: true,
    enum: ['confirmed', 'pending', 'cancelled', 'checked-out'],
    default: 'pending',
  })
  status: string;
}

export const BookingSchema = SchemaFactory.createForClass(Booking);

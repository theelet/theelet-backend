import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type BlogDocument = HydratedDocument<Blog>;

@Schema({ timestamps: true, collection: 'blogs' })
export class Blog {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true, unique: true, trim: true })
  slug: string;

  @Prop({ default: 'The Elet Team' })
  author: string;

  @Prop({ default: 'General' })
  category: string;

  @Prop({
    required: true,
    enum: ['published', 'draft', 'scheduled'],
    default: 'draft',
  })
  status: string;

  @Prop({ default: '' })
  excerpt: string;

  @Prop({ default: '' })
  cover: string;

  @Prop({ default: 0 })
  views: number;

  @Prop({ default: '' })
  publishedAt: string;
}

export const BlogSchema = SchemaFactory.createForClass(Blog);

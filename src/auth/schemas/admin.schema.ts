import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type AdminDocument = HydratedDocument<Admin>;

@Schema({ timestamps: true, collection: 'admins' })
export class Admin {
  @Prop({ required: true, unique: true, lowercase: true, trim: true })
  email: string;

  @Prop({ required: true })
  passwordHash: string;

  @Prop({ default: 'Administrator' })
  name: string;

  @Prop({ default: 'admin', enum: ['admin', 'editor'] })
  role: string;
}

export const AdminSchema = SchemaFactory.createForClass(Admin);

// Never leak the password hash in JSON responses.
AdminSchema.set('toJSON', {
  transform: (_doc, ret) => {
    delete (ret as { passwordHash?: string }).passwordHash;
    delete (ret as { __v?: number }).__v;
    return ret;
  },
});

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseCrudService } from '../common/base-crud.service';
import { Blog, BlogDocument } from './schemas/blog.schema';

@Injectable()
export class BlogsService extends BaseCrudService<BlogDocument> {
  constructor(@InjectModel(Blog.name) model: Model<BlogDocument>) {
    super(model);
  }
}

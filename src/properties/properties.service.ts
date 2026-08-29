import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseCrudService } from '../common/base-crud.service';
import { Property, PropertyDocument } from './schemas/property.schema';

@Injectable()
export class PropertiesService extends BaseCrudService<PropertyDocument> {
  constructor(@InjectModel(Property.name) model: Model<PropertyDocument>) {
    super(model);
  }
}

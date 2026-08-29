import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseCrudService } from '../common/base-crud.service';
import { Area, AreaDocument } from './schemas/area.schema';

@Injectable()
export class AreasService extends BaseCrudService<AreaDocument> {
  constructor(@InjectModel(Area.name) model: Model<AreaDocument>) {
    super(model);
  }
}

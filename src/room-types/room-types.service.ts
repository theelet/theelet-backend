import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseCrudService } from '../common/base-crud.service';
import { RoomType, RoomTypeDocument } from './schemas/room-type.schema';

@Injectable()
export class RoomTypesService extends BaseCrudService<RoomTypeDocument> {
  constructor(@InjectModel(RoomType.name) model: Model<RoomTypeDocument>) {
    super(model);
  }
}

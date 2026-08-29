import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseCrudService } from '../common/base-crud.service';
import { Room, RoomDocument } from './schemas/room.schema';

@Injectable()
export class RoomsService extends BaseCrudService<RoomDocument> {
  constructor(@InjectModel(Room.name) model: Model<RoomDocument>) {
    super(model);
  }
}

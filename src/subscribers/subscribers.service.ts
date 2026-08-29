import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseCrudService } from '../common/base-crud.service';
import { Subscriber, SubscriberDocument } from './schemas/subscriber.schema';

@Injectable()
export class SubscribersService extends BaseCrudService<SubscriberDocument> {
  constructor(
    @InjectModel(Subscriber.name)
    private readonly subModel: Model<SubscriberDocument>,
  ) {
    super(subModel);
  }

  // Upsert on email so a repeat signup updates rather than erroring on the unique index.
  async subscribe(dto: Partial<Subscriber>) {
    const email = (dto.email ?? '').toLowerCase().trim();
    return this.subModel
      .findOneAndUpdate(
        { email },
        { ...dto, email },
        { new: true, upsert: true, setDefaultsOnInsert: true },
      )
      .exec();
  }
}

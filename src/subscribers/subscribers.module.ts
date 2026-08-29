import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Subscriber, SubscriberSchema } from './schemas/subscriber.schema';
import { SubscribersService } from './subscribers.service';
import { SubscribersController } from './subscribers.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Subscriber.name, schema: SubscriberSchema },
    ]),
  ],
  controllers: [SubscribersController],
  providers: [SubscribersService],
})
export class SubscribersModule {}

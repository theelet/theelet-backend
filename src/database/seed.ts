import { NestFactory } from '@nestjs/core';
import { getModelToken } from '@nestjs/mongoose';
import { ConfigService } from '@nestjs/config';
import { Logger } from '@nestjs/common';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { AppModule } from '../app.module';

import { Admin } from '../auth/schemas/admin.schema';
import { Property } from '../properties/schemas/property.schema';
import { RoomType } from '../room-types/schemas/room-type.schema';
import { Room } from '../rooms/schemas/room.schema';
import { Booking } from '../bookings/schemas/booking.schema';
import { Blog } from '../blogs/schemas/blog.schema';
import { Area } from '../areas/schemas/area.schema';
import { Promo } from '../promos/schemas/promo.schema';
import { Subscriber } from '../subscribers/schemas/subscriber.schema';

import {
  propertiesSeed,
  roomTypesSeed,
  roomsSeed,
  bookingsSeed,
  blogsSeed,
  areasSeed,
  promosSeed,
  subscribersSeed,
} from './seed-data';

async function seed() {
  const logger = new Logger('Seed');
  const app = await NestFactory.createApplicationContext(AppModule, {
    logger: ['error', 'warn'],
  });
  const config = app.get(ConfigService);

  const model = <T>(name: string) => app.get<Model<T>>(getModelToken(name));

  // Reset and reload each collection.
  const collections: [string, unknown[]][] = [
    [Property.name, propertiesSeed],
    [RoomType.name, roomTypesSeed],
    [Room.name, roomsSeed()],
    [Booking.name, bookingsSeed],
    [Blog.name, blogsSeed],
    [Area.name, areasSeed],
    [Promo.name, promosSeed],
    [Subscriber.name, subscribersSeed],
  ];

  for (const [name, docs] of collections) {
    const m = model(name);
    await m.deleteMany({});
    await m.insertMany(docs);
    logger.log(`seeded ${docs.length} → ${name}`);
  }

  // Default admin from env (bcrypt-hashed), upserted so re-running is safe.
  const adminEmail = (
    config.get<string>('ADMIN_EMAIL') ?? 'admin@theelet.com'
  ).toLowerCase();
  const adminPassword = config.get<string>('ADMIN_PASSWORD') ?? 'changeme123';
  const passwordHash = await bcrypt.hash(adminPassword, 10);
  const adminModel = model<Admin>(Admin.name);
  await adminModel.updateOne(
    { email: adminEmail },
    {
      $set: {
        email: adminEmail,
        passwordHash,
        name: 'Administrator',
        role: 'admin',
      },
    },
    { upsert: true },
  );
  logger.log(`admin ready → ${adminEmail}`);

  await app.close();
  logger.log('seed complete');
}

void seed();

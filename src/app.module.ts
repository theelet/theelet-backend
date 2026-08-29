import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { BookingsModule } from './bookings/bookings.module';
import { PropertiesModule } from './properties/properties.module';
import { RoomTypesModule } from './room-types/room-types.module';
import { RoomsModule } from './rooms/rooms.module';
import { AreasModule } from './areas/areas.module';
import { BlogsModule } from './blogs/blogs.module';
import { PromosModule } from './promos/promos.module';
import { SubscribersModule } from './subscribers/subscribers.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        uri:
          config.get<string>('MONGODB_URI') ??
          'mongodb://localhost:27017/thelet',
      }),
    }),
    AuthModule,
    BookingsModule,
    PropertiesModule,
    RoomTypesModule,
    RoomsModule,
    AreasModule,
    BlogsModule,
    PromosModule,
    SubscribersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

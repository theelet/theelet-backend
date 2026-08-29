import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Area, AreaSchema } from './schemas/area.schema';
import { AreasService } from './areas.service';
import { AreasController } from './areas.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Area.name, schema: AreaSchema }]),
  ],
  controllers: [AreasController],
  providers: [AreasService],
})
export class AreasModule {}

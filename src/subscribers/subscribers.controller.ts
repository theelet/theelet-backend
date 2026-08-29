import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { SubscribersService } from './subscribers.service';
import { CreateSubscriberDto } from './dto/subscriber.dto';

@Controller('subscribers')
export class SubscribersController {
  constructor(private readonly service: SubscribersService) {}

  // Public: newsletter/consent signup from the website.
  @Post()
  create(@Body() dto: CreateSubscriberDto) {
    return this.service.subscribe(dto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.service.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
}

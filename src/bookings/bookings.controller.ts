import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { BookingsService } from './bookings.service';
import { CreateBookingDto, UpdateBookingDto } from './dto/booking.dto';

@Controller('bookings')
export class BookingsController {
  constructor(private readonly service: BookingsService) {}

  // Public: the website submits a booking; it is saved and emailed.
  @Post()
  create(@Body() dto: CreateBookingDto) {
    return this.service.createBooking(dto);
  }

  // Public reads (prototype): the dashboard lists/opens bookings without a token.
  // Writes below (PATCH/DELETE) remain admin-only.
  @Get()
  findAll(@Query('source') source?: string, @Query('status') status?: string) {
    return this.service.list({ source, status });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateBookingDto) {
    return this.service.update(id, dto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
}

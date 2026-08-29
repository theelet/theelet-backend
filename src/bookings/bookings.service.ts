import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, QueryFilter } from 'mongoose';
import { BaseCrudService } from '../common/base-crud.service';
import { Booking, BookingDocument } from './schemas/booking.schema';
import { CreateBookingDto } from './dto/booking.dto';

@Injectable()
export class BookingsService extends BaseCrudService<BookingDocument> {
  constructor(
    @InjectModel(Booking.name)
    private readonly bookingModel: Model<BookingDocument>,
  ) {
    super(bookingModel);
  }

  // Optional source/status filtering for the dashboard list.
  list(filter: { source?: string; status?: string }) {
    const query: QueryFilter<BookingDocument> = {};
    if (filter.source) query.source = filter.source;
    if (filter.status) query.status = filter.status;
    return this.findAll(query);
  }

  async createBooking(dto: CreateBookingDto): Promise<BookingDocument> {
    const seq = Math.floor(1000 + Math.random() * 9000);
    return this.bookingModel.create({
      ...dto,
      reference: `ELT-${seq}`,
      source: dto.source ?? 'website',
    });
  }
}

import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { PromosService } from './promos.service';
import {
  CreatePromoDto,
  UpdatePromoDto,
  VerifyPromoDto,
} from './dto/promo.dto';

@Controller('promos')
export class PromosController {
  constructor(private readonly service: PromosService) {}

  @Get()
  findAll() {
    return this.service.findAll();
  }

  // Public: the website checks a code entered in the booking bar.
  @Post('verify')
  verify(@Body() dto: VerifyPromoDto) {
    return this.service.verify(dto.code);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() dto: CreatePromoDto) {
    return this.service.create(dto);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdatePromoDto) {
    return this.service.update(id, dto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
}

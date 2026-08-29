import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseCrudService } from '../common/base-crud.service';
import { Promo, PromoDocument } from './schemas/promo.schema';

@Injectable()
export class PromosService extends BaseCrudService<PromoDocument> {
  constructor(
    @InjectModel(Promo.name) private readonly promoModel: Model<PromoDocument>,
  ) {
    super(promoModel);
  }

  // Mirrors the website's promo check: valid only if the code exists and is active.
  async verify(code: string) {
    const normalized = (code ?? '').trim().toUpperCase();
    if (!normalized) return { valid: false, promo: null };
    const promo = await this.promoModel
      .findOne({ code: normalized, active: true })
      .exec();
    return { valid: !!promo, promo: promo ?? null };
  }
}

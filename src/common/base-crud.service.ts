import { NotFoundException } from '@nestjs/common';
import { Model, QueryFilter } from 'mongoose';

/**
 * Generic CRUD implementation shared by every resource service. Each resource
 * service extends this with its own Mongoose model, so the individual services
 * stay thin and consistent.
 */
export abstract class BaseCrudService<T> {
  protected constructor(protected readonly model: Model<T>) {}

  findAll(filter: QueryFilter<T> = {}): Promise<T[]> {
    return this.model.find(filter).sort({ createdAt: -1 }).exec();
  }

  async findOne(id: string): Promise<T> {
    const doc = await this.model.findById(id).exec();
    if (!doc) throw new NotFoundException(`resource ${id} not found`);
    return doc;
  }

  create(dto: Partial<T>): Promise<T> {
    return this.model.create(dto);
  }

  async update(id: string, dto: Partial<T>): Promise<T> {
    const doc = await this.model
      .findByIdAndUpdate(id, dto, { new: true })
      .exec();
    if (!doc) throw new NotFoundException(`resource ${id} not found`);
    return doc;
  }

  async remove(id: string): Promise<{ deleted: true; id: string }> {
    const doc = await this.model.findByIdAndDelete(id).exec();
    if (!doc) throw new NotFoundException(`resource ${id} not found`);
    return { deleted: true, id };
  }
}

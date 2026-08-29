import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { JwtService } from '@nestjs/jwt';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { Admin, AdminDocument } from './schemas/admin.schema';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(Admin.name) private readonly adminModel: Model<AdminDocument>,
    private readonly jwt: JwtService,
  ) {}

  async login(dto: LoginDto) {
    const admin = await this.adminModel
      .findOne({ email: dto.email.toLowerCase().trim() })
      .exec();
    if (!admin) throw new UnauthorizedException('invalid credentials');

    const ok = await bcrypt.compare(dto.password, admin.passwordHash);
    if (!ok) throw new UnauthorizedException('invalid credentials');

    const payload = {
      sub: admin.id,
      email: admin.email,
      role: admin.role,
    };
    return {
      accessToken: await this.jwt.signAsync(payload),
      admin: admin.toJSON(),
    };
  }

  async findById(id: string) {
    return this.adminModel.findById(id).exec();
  }
}

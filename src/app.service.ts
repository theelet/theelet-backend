import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  health() {
    return {
      status: 'ok',
      service: 'the-elet-api',
      time: new Date().toISOString(),
    };
  }
}

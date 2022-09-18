import { HttpException } from '@nestjs/common';

export class SiteSearchException extends HttpException {
  constructor(data, status) {
    super(data, status);
  }
}

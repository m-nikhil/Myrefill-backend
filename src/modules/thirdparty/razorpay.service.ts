import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
const Razorpay = require('razorpay'); // eslint-disable-line

@Injectable()
export class RazorpayService {
  constructor(private configService: ConfigService) {}

  /**
   * Create new razorpay Customer
   * email + phone is the PK
   */
  createCustomer = async (
    name: string,
    email: string,
    phoneNumber: string,
  ): Promise<RazorpayCustomer> => {
    const instance = new Razorpay({
      key_id: this.configService.get<string>('RAZORPAY_KEY'), // eslint-disable-line
      key_secret: this.configService.get<string>('RAZORPAY_SECRET'), // eslint-disable-line
    });

    return instance.customers.create({
      name: name,
      email: email,
      contact: phoneNumber,
      fail_existing: 0, // eslint-disable-line
      notes: { created_by: 'server' }, // eslint-disable-line
    });
  };
}

import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
const Razorpay = require('razorpay'); // eslint-disable-line

@Injectable()
export class RazorpayService {
  private instance;
  constructor(private configService: ConfigService) {
    this.instance = new Razorpay({
      key_id: this.configService.get<string>('RAZORPAY_KEY'), // eslint-disable-line
      key_secret: this.configService.get<string>('RAZORPAY_SECRET'), // eslint-disable-line
    });
  }

  /**
   * Create new razorpay Customer
   * email + phone is the PK
   */
  createCustomer = async (
    name: string,
    email: string,
    phoneNumber: string,
  ): Promise<RazorpayCustomer> => {
    return this.instance.customers.create({
      name: name,
      email: email,
      contact: phoneNumber,
      fail_existing: 0, // eslint-disable-line
      notes: { created_by: 'server' }, // eslint-disable-line
    });
  };

  /**
   * Create new order
   */
  createOrder = async (
    stationId: string,
    userId: string,
    numberOfhalfLitre: number,
    price: number,
  ): Promise<RazorpayOrder> => {
    return this.instance.orders.create({
      amount: price * 100, // convert to paise
      currency: 'INR',
      payment_capture: 1, // eslint-disable-line
      notes: {
        stationId: stationId,
        userId: userId,
        numberOfHalfLitre: numberOfhalfLitre,
        price: price,
      },
    });
  };

  getOrderById = async (orderId: string): Promise<RazorpayOrder> => {
    return this.instance.orders.fetch(orderId);
  };
}

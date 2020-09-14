import { Injectable } from '@nestjs/common';
import { CreateUserRequestInternal } from './dto/request/createUserRequest.dto';
import { User } from 'src/entities/user.entity';
import { CRUDService } from 'src/common/class/crud';
import { QueryRunner } from 'typeorm';
import { Builder } from 'builder-pattern';
import { RazorpayService } from '../thirdparty/razorpay.service';

@Injectable()
export class UserService extends CRUDService<User> {
  Entity = User;

  constructor(private razorpayService: RazorpayService) {
    super();
  }

  /**
   * create new entity
   */
  superCreate = this.create;
  create = async (
    queryRunner: QueryRunner,
    userId: string,
    createUserRequestDto: Partial<User>,
  ): Promise<User> => {
    const razorpayCustomer: RazorpayCustomer = await this.razorpayService.createCustomer(
      createUserRequestDto.fullname,
      createUserRequestDto.email,
      createUserRequestDto.phoneNumber,
    );

    const createUserRequestInternalDto = Builder(
      createUserRequestDto as CreateUserRequestInternal,
    )
      .razorpayCustomerId(razorpayCustomer.id)
      .build();

    return await this.superCreate(
      queryRunner,
      userId,
      createUserRequestInternalDto,
    );
  };

  /**
   * get user by email
   * Don't throw error. Null value is needed by the auth flow.
   */
  getByEmail = async (
    queryRunner: QueryRunner,
    email: string,
  ): Promise<User> => {
    return queryRunner.manager.findOne(User, { email: email });
  };
}

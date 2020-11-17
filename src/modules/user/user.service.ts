import { Injectable } from '@nestjs/common';
import { CreateUserRequestInternal } from './dto/request/createUserRequest.dto';
import { User } from 'src/entities/user.entity';
import { CRUDService } from 'src/common/class/crud';
import { QueryRunner } from 'typeorm';
import { Builder } from 'builder-pattern';
import { RazorpayService } from '../thirdparty/razorpay.service';
import { Coupon } from 'src/entities/coupon.entity';

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

    let createdUser=await this.superCreate(
      queryRunner,
      userId,
      createUserRequestInternalDto,
    );
    await queryRunner.manager.insert(Coupon,{userId:createdUser.id, points:0, lastUpdatedBy: userId});
    return createdUser;
  };

  /**
   * delete user then mask email & name for privacy
   */
  superDelete = this.delete;
  delete = async (
    queryRunner: QueryRunner,
    userId: string,
    id: string,
  ): Promise<string> => {
    const updateRequestDto = Builder<Partial<User>>()
      .fullname(id)
      .email(id)
      .build();

    console.log(updateRequestDto);

    await this.update(queryRunner, userId, id, updateRequestDto);

    return await this.superDelete(queryRunner, userId, id);
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

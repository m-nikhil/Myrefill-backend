import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserRequestInternal } from './dto/request/createUserRequest.dto';
import { User } from 'src/entities/user.entity';
import { CRUDService } from 'src/common/class/crud';
import { QueryRunner } from 'typeorm';
import { Builder } from 'builder-pattern';
import { RazorpayService } from '../thirdparty/razorpay.service';
import { Coupon } from 'src/entities/coupon.entity';
import {resetPasswordTemplate} from './../../email-templates/resetPasswordTemplate';
import { EntityNotFoundError } from 'typeorm/error/EntityNotFoundError';
import * as AWS from './../../aws';
const otplib=require('otplib');
const bcrypt=require("bcryptjs");
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
      .password(await this.encryptString(createUserRequestDto.password))
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

  getUserDetails= async (
    queryRunner: QueryRunner,
    id: string
  ): Promise<User> => {
    let user=await queryRunner.manager
      .createQueryBuilder()
      .select('"user".*')
      .from(User,'user')
      .leftJoinAndSelect(`city`,"city",`city.id="user"."cityId"`)
      .leftJoinAndSelect(`state`,"state",`state.id="user"."stateId"`)
      .where(`"user".id='${id}'`)
      .execute()
    return user[0];
  }

  sendResetPasswordOTP = async (
    queryRunner: QueryRunner,
    emailId: string,
  ): Promise<Boolean> => {
    let user=await queryRunner.manager.findOne(User, { email: emailId });
    
    if(!user){
      throw new HttpException({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: `EmailID you entered is invalid.`,
      }, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    //generate otp
    otplib.authenticator.options = {
      step: 900, //15 mins
      digits: 6
    };
    const secret = otplib.authenticator.generateSecret();
    var token = otplib.authenticator.generate(secret);

    //send email template
    resetPasswordTemplate(AWS.ses,token,[user.email]);

    //update user with last otp
    const updateResult = await queryRunner.manager
      .createQueryBuilder()
      .update(User)
      .set({
        emailOTP: token,
        token: secret
      })
      .where('id = :id', { id: user.id })
      .execute();

    const success: boolean = updateResult.affected > 0;
    if (!success) {
      throw new EntityNotFoundError(User, user.id);
    }
    
    return true;
  }

  resetForgotPassword = async (
    queryRunner: QueryRunner,
    data
  ): Promise<Boolean> => {
    let user=await queryRunner.manager.findOne(User, { email: data.emailId });
    // console.log(user);
    if(!user){
      throw new HttpException({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: `EmailID you entered is invalid.`,
      }, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    if(!user.emailOTP || user.emailOTP!==data.emailCode ){
      throw new HttpException({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: `Code invalid.Enter Valid one from Email.(or) Code used already.`,
      }, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    if(data.newPassword!==data.confirmPassword){
      throw new HttpException({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: `Passwords are not matching.`,
      }, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    //check otp valid
    otplib.authenticator.options = {
      step: 900 //15 mins
    };
    var res = otplib.authenticator.check(data.emailCode, user.token);
    console.log(res);
    if(!res){
      throw new HttpException({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: `Code Expired.`,
      }, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    const updateResult = await queryRunner.manager
      .createQueryBuilder()
      .update(User)
      .set({
        password: await this.encryptString(data.newPassword),
        emailOTP: null,
        token: null
      })
      .where('id = :id', { id: user.id })
      .execute();

    const success: boolean = updateResult.affected > 0;
    if (!success) {
      throw new EntityNotFoundError(User, user.id);
    }
    
    return true;
  }

  encryptString=async (password)=>{
    if(password){
      var salt=bcrypt.genSaltSync(10);
      var hash=bcrypt.hashSync(password,salt);
      return hash;
    }
    return "";
  }
  
  decryptAndCompareString=async (password,hash)=>{
      return bcrypt.compareSync(password,hash);
  }

  changePassword = async(
    queryRunner: QueryRunner,
    userId,
    data
  ):Promise<Boolean> =>{
    let user=await queryRunner.manager.findOne(User, { id: userId });
    console.log(user);
    if(!user){
      throw new HttpException({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: `Invalid User.`,
      }, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    if(!await this.decryptAndCompareString(data.oldPassword,user.password)){
      throw new HttpException({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: `Old password is incorrect.Enter valid one.`,
      }, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    const updateResult = await queryRunner.manager
      .createQueryBuilder()
      .update(User)
      .set({
        password: await this.encryptString(data.newPassword),
      })
      .where('id = :id', { id: userId })
      .execute();

    const success: boolean = updateResult.affected > 0;
    if (!success) {
      throw new EntityNotFoundError(User, user.id);
    }

    return true;
  }

}

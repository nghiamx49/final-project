import { BadRequestException, Injectable } from '@nestjs/common';
import { OTPRepository } from 'src/repository/optvalidation.repository';
import { UserRepository } from 'src/repository/user.repository';
import { OtpValidationDocument } from 'src/schemas/otpvalidation.schema';
import { UserDocument } from 'src/schemas/user.schema';
import { EmailUtil } from 'src/utils/email.util';

@Injectable()
export class ValidationService {
  private readonly expireIn: number = 60 * 1000;
  constructor(
    private readonly optRepository: OTPRepository,
    private readonly userRepository: UserRepository,
    private readonly emailUtil: EmailUtil,
  ) {}

  async sendOTP(email: string): Promise<void> {
    const otp: number = Math.floor(100000 + Math.random() * 900000);
    const checkUserExistedInDB: UserDocument =
      await this.userRepository.findOne({ email: email });
    if (!checkUserExistedInDB) {
      throw new BadRequestException(
        'This email is not registed for any user, please try again',
      );
    } else {
      const checkValidationExisted: OtpValidationDocument =
        await this.optRepository.findOne({ user: checkUserExistedInDB._id });
      if (checkValidationExisted) {
        await this.optRepository.findOneAndDelete({
          _id: checkValidationExisted._id,
        });
      }
      const newValidation: OtpValidationDocument =
        await this.optRepository.create({
          otp: otp,
          user: checkUserExistedInDB,
        });
      try {
        await this.emailUtil.sendMail({
          to: email,
          text: `Your recovery OTP: ${newValidation.otp}`,
        });
      } catch (error) {
          console.log(error);
        throw new BadRequestException('Email cannot sent, please retry later');
      }
    }
  }

  async validationOTP(email: string, otp: number): Promise<void> {
      const checkAccountExisted = await this.userRepository.findOne({email: email});
    const checkValidationExisted: OtpValidationDocument =
      await this.optRepository.findOne({ otp: otp, user: checkAccountExisted._id });
    if (!checkAccountExisted) {
      throw new BadRequestException(
        'This email is not belong to any account, please try again later',
      );
    }
    if(!checkValidationExisted) {
        throw new BadRequestException(
          'This OTP is incorrect, please try again',
        );
    }
    if(checkValidationExisted.otp !== otp) {
                throw new BadRequestException(
                  'This OTP is incorrect, please try again',
                );
    }
    const checkExpired: boolean = new Date().getTime() - new Date(checkValidationExisted.createdAt).getTime() < this.expireIn;
      console.log(checkExpired);
    if (!checkExpired) {
        throw new BadRequestException('This OTP is expired, please resend')
    }
    await this.optRepository.findOneAndDelete({otp: otp, user: checkAccountExisted._id});
  }
}

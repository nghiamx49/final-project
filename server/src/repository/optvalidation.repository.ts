import { Inject, Injectable } from '@nestjs/common';
import { BaseRepository } from './base.repository';
import { Model } from 'mongoose';
import { OtpValidationDocument } from '../schemas/otpvalidation.schema';

@Injectable()
export class OTPRepository extends BaseRepository<OtpValidationDocument> {
  constructor(
    @Inject('OTP_MODEL') otpValidationModel: Model<OtpValidationDocument>,
  ) {
    super(otpValidationModel);
  }
}

import {
  Body,
  Controller,
  HttpStatus,
  Post,
  Request,
  Res,
} from '@nestjs/common';
import { ValidationService } from './validation.service';
import { Response } from 'express';
import { ValidationDTO } from './dto/validationOtp.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('SEND OTP')
@Controller('api/validation')
export class ValidationController {
  constructor(private readonly validationService: ValidationService) {}

  @Post('/send-otp')
  async sendOTPToEmail(
    @Request() request,
    @Res() response: Response,
    @Body('email') email: string,
  ) {
    try {
      await this.validationService.sendOTP(email);
      response
        .status(HttpStatus.CREATED)
        .json({ message: 'otp had sent to your email' });
    } catch (error) {
      response.status(HttpStatus.BAD_REQUEST).json({ message: error.message });
    }
  }

  @Post('/validate-otp')
  async validationOtpFromClient(
    @Request() request,
    @Res() response: Response,
    @Body() validationOtp: ValidationDTO,
  ) {
    try {
      await this.validationService.validationOTP(
        validationOtp.email,
        validationOtp.otp,
      );
      response.status(HttpStatus.OK).json({ message: 'OTP matched' });
    } catch (error) {
      response.status(HttpStatus.BAD_REQUEST).json({ message: error.message });
    }
  }
}

import { Injectable } from '@nestjs/common';
import {
  SendMailOptions,
  createTransport,
  getTestMessageUrl,
} from 'nodemailer';

@Injectable()
export class EmailUtil {
  transporter: any;
  constructor() {}

  async sendMail(options: SendMailOptions): Promise<string | false> {
    this.transporter = createTransport({
      service: 'Gmail',
      port: 465,
      secure: true,
      ignoreTLS: true,
      auth: {
        user: process.env.SMTP_USER, //  username
        pass: process.env.SMTP_PASS, // password
      },
    });
    let info = await this.transporter.sendMail({
      from: process.env.SMTP_USER,
      subject: 'Your Reset Password OTP',
      ...options,
    });
    console.log('Message sent: %s', info.messageId);

    return getTestMessageUrl(info);
  }
}

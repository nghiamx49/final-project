import { Document, Types, Schema } from 'mongoose';
import { UserDocument } from './user.schema';

export interface OtpValidationDocument extends Document {
  _id: Types.ObjectId;
  user: UserDocument;
  otp: number;
  createdAt: Date;
}

export const OTP = new Schema(
  {
    user: {type: Types.ObjectId, ref: 'Users'},
    otp: Number,
  },
  { timestamps: true },
);

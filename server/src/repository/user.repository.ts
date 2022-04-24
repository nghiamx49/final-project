import { Inject, Injectable } from '@nestjs/common';
import { BaseRepository } from './base.repository';
import { UserDocument } from '../schemas/user.schema';
import { Model } from 'mongoose';

@Injectable()
export class UserRepository extends BaseRepository<UserDocument> {
  constructor(@Inject('USER_MODEL') userModel: Model<UserDocument>) {
    super(userModel);
  }
}

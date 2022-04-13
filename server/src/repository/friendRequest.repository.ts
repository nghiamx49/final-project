import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { BaseRepository } from './base.repository';
import { Model } from 'mongoose';
import { FriendRequestDocument } from 'src/schemas/friendRequest.schema';

@Injectable()
export class FriendRequestRepository extends BaseRepository<FriendRequestDocument> {
  constructor(
    @InjectModel('FRIEND_REQUEST_MODEL')
    friendRequestModel: Model<FriendRequestDocument>,
  ) {
    super(friendRequestModel);
  }
}

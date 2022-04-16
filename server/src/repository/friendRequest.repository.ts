import { Inject, Injectable } from '@nestjs/common';
import { BaseRepository } from './base.repository';
import { Model } from 'mongoose';
import { FriendRequestDocument } from 'src/schemas/friendRequest.schema';

@Injectable()
export class FriendRequestRepository extends BaseRepository<FriendRequestDocument> {
  constructor(
    @Inject('FRIEND_REQUEST_MODEL')
    friendRequestModel: Model<FriendRequestDocument>,
  ) {
    super(friendRequestModel);
  }
}

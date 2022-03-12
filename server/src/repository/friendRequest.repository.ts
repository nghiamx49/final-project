import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { BaseRepository } from './base.repository';
import { Model } from 'mongoose';
import { FriendRequest, FriendRequestDocument } from 'src/schemas/friendRequest.schema';

@Injectable()
export class FriendRequestRepository extends BaseRepository<FriendRequestDocument> {
  constructor(@InjectModel(FriendRequest.name) friendRequestModel: Model<FriendRequestDocument>) {
    super(friendRequestModel);
  }
}

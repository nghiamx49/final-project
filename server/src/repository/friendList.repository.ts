import { Inject, Injectable } from '@nestjs/common';
import { BaseRepository } from './base.repository';
import { Model } from 'mongoose';
import { FriendListDocument } from 'src/schemas/friendList.schema';

@Injectable()
export class FriendListRepository extends BaseRepository<FriendListDocument> {
  constructor(
    @Inject('FRIEND_LIST_MODEL') friendListModel: Model<FriendListDocument>,
  ) {
    super(friendListModel);
  }
}

import { Inject, Injectable } from '@nestjs/common';
import { BaseRepository } from './base.repository';
import { Model } from 'mongoose';
import { RoomDocument } from '../schemas/room.shcema';

@Injectable()
export class RoomRepository extends BaseRepository<RoomDocument> {
  constructor(@Inject('ROOM_MODEL') roomModel: Model<RoomDocument>) {
    super(roomModel);
  }
}

import { Inject, Injectable } from '@nestjs/common';
import { BaseRepository } from './base.repository';
import { Model } from 'mongoose';
import { MessageDocument } from 'src/schemas/message.schema';


@Injectable()
export class MessageRepository extends BaseRepository<MessageDocument> {
  constructor(
    @Inject('MESSAGE_MODEL') messageModel: Model<MessageDocument>,
  ) {
    super(messageModel);
  }
}
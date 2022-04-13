import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { BaseRepository } from './base.repository';
import { Model } from 'mongoose';
import { MessageDocument } from 'src/schemas/message.schema';


@Injectable()
export class MessageRepository extends BaseRepository<MessageDocument> {
  constructor(
    @InjectModel('MESSAGE_MODEL') messageModel: Model<MessageDocument>,
  ) {
    super(messageModel);
  }
}
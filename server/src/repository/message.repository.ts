import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { BaseRepository } from './base.repository';
import { Model } from 'mongoose';
import { Message, MessageDocument } from 'src/schemas/message.schema';


@Injectable()
export class MessageRepository extends BaseRepository<MessageDocument> {
  constructor(@InjectModel(Message.name) messageModel: Model<MessageDocument>) {
    super(messageModel);
  }
}
import { Inject, Injectable } from '@nestjs/common';
import { BaseRepository } from './base.repository';
import { Model } from 'mongoose';
import { NotificationDocument } from '../schemas/notification.schema';

@Injectable()
export class NotificationRepository extends BaseRepository<NotificationDocument> {
  constructor(
    @Inject('NOTIFICATION_MODEL')
    notificationModel: Model<NotificationDocument>,
  ) {
    super(notificationModel);
  }
}

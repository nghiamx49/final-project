import { NotificationDocument } from 'src/schemas/notification.schema';
import { UserResponseDto } from '../auth/dto/user.dto';

export class NotificationDto {
  constructor(notification: NotificationDocument) {
    this._id = notification._id.toString();
    this.creator = new UserResponseDto(notification.creator);
    this.description = notification.description;
    this.link = notification.link;
    this.readBy = notification.readBy.map((user) => new UserResponseDto(user));
    this.receivers = notification.receivers.map(
      (user) => new UserResponseDto(user),
    );
    this.createdAt = notification.createdAt;
  }
  _id: string;
  creator: UserResponseDto;
  description: string;
  link: string;
  readBy: UserResponseDto[];
  createdAt: Date;
  receivers: UserResponseDto[];
}

export interface PushNotificationDto {
  description: string;
  link: string;
  receiverId?: string;
}

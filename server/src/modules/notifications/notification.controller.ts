import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Response } from 'express';
import { JwtAuthenticateGuard } from 'src/middleware/authenticate.middleware';
import { PushNotificationDto } from './notification.dto';
import { NotificationService } from './notification.service';

@Controller('api/notifications')
@UseGuards(JwtAuthenticateGuard)
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @Get('/')
  async getUserNotifications(
    @Req() req,
    @Res() response: Response,
  ): Promise<void> {
    try {
      const notifications =
        await this.notificationService.getAllUserNotification(req.user._id);
      response.status(HttpStatus.OK).json({ data: notifications });
    } catch (error) {
      response.status(HttpStatus.BAD_REQUEST).json({ message: error.message });
    }
  }

  @Post('/')
  async createNotificatiom(
    @Req() req,
    @Body() createNoti: PushNotificationDto,
    @Res() response: Response,
  ): Promise<void> {
    try {
      if (createNoti.receiverId) {
        await this.notificationService.friendRequestNotification(
          createNoti,
          req.user_id,
        );
      } else {
        await this.notificationService.pushNotification(
          createNoti,
          req.user._id,
        );
      }
      response.sendStatus(HttpStatus.CREATED);
    } catch (error) {
      response.status(HttpStatus.BAD_REQUEST).json({ message: error.message });
    }
  }

  @Put('/:notificationId')
  async markAsReadNoti(
    @Req() req,
    @Param('notificationId') notificationId: string,
    @Res() response: Response,
  ): Promise<void> {
    try {
      const notifications =
        await this.notificationService.markNotifcationAsRead(
          req.user._id,
          notificationId,
        );
      response.status(HttpStatus.OK).json({ data: notifications });
    } catch (error) {
      response.status(HttpStatus.BAD_REQUEST).json({ message: error.message });
    }
  }
}

import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
  Req,
  Request,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { JwtAuthenticateGuard } from '../../middleware/authenticate.middleware';
import { SendMessageDto } from './conservation.dto';
import { ConservationService } from './conversavtion.service';

@ApiTags('Conservations')
@Controller('api/conservation')
@UseGuards(JwtAuthenticateGuard)
export class ConservationController {
  constructor(private readonly conservationService: ConservationService) {}
  @Get('/')
  async getConservation(
    @Request() request,
    @Res() response: Response,
  ): Promise<void> {
    const conservation = await this.conservationService.getUserConservation(
      request.user._id,
    );
    response.status(HttpStatus.OK).json({ data: conservation });
  }

  @Get('/single')
  async getSingleConservation(
    @Query('userId') userId: string,
    @Query('friendId') friendId: string,
    @Res() response: Response,
  ): Promise<void> {
    try {
      const conservation = await this.conservationService.getSingleConservation(
        userId,
        friendId,
      );
      response.status(HttpStatus.OK).json({ data: conservation });
    } catch (error) {
      response.status(HttpStatus.OK).json({ data: { messages: [] } });
    }
  }

  @Post('/')
  async sendMessage(
    @Body() newMessage: SendMessageDto,
    @Res() response: Response,
  ): Promise<void> {
    try {
      const messageSent = await this.conservationService.sendNewMessage(
        newMessage,
      );
      response.status(HttpStatus.CREATED).json({ data: messageSent });
    } catch (error) {
      response.status(HttpStatus.BAD_REQUEST).json({ message: error.message });
    }
  }

  @Put('/:conservationId')
  async markAsRead(
    @Req() req,
    @Param('conservationId') conservationId: string,
    @Res() response: Response,
  ): Promise<void> {
    try {
      const data = await this.conservationService.markConservationAsRead(
        conservationId,
        req.user._id,
      );
      response.status(HttpStatus.OK).json({ data });
    } catch (error) {
      response.status(HttpStatus.BAD_REQUEST).json({ message: error.message });
    }
  }
}

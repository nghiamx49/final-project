import { Injectable } from '@nestjs/common';
import { ConservationRepository } from '../../repository/conservation.repository';
import { MessageRepository } from '../../repository/message.repository';
import { UserRepository } from '../../repository/user.repository';

import { RealtimeGateWay } from '../realtime/socket.gateway';
import {
  ConservationDto,
  MessageDto,
  SendMessageDto,
} from './conservation.dto';

@Injectable()
export class ConservationService {
  constructor(
    private readonly messageRepository: MessageRepository,
    private readonly conservationRepository: ConservationRepository,
    private readonly userRepository: UserRepository,
    private readonly reatimeGateway: RealtimeGateWay,
  ) {}

  async getUserConservation(userId: string): Promise<ConservationDto[]> {
    const userConservations = await this.conservationRepository.find(
      { members: userId },
      null,
      {
        populate: [
          { path: 'members' },
          { path: 'messages', populate: { path: 'sender' } },
        ],
      },
    );

    return userConservations
      .sort(
        (a, b) =>
          new Date(b.messages[b.messages.length - 1].createdAt).getTime() -
          new Date(a.messages[a.messages.length - 1].createdAt).getTime(),
      )
      .map((conservation) => new ConservationDto(conservation));
  }

  async getSingleConservation(
    userId: string,
    friendId: string,
  ): Promise<ConservationDto> {
    const conservationInDB = await this.conservationRepository.findOne(
      {
        members: { $all: [userId, friendId] },
      },
      null,
      {
        populate: [
          { path: 'members' },
          { path: 'messages', populate: { path: 'sender' } },
          { path: 'readBy' },
        ],
      },
    );
    return new ConservationDto(conservationInDB);
  }

  async markConservationAsRead(
    conservationId: string,
    userId: string,
  ): Promise<ConservationDto[]> {
    const user = await this.userRepository.findOne({ _id: userId });
    const conservation = await this.conservationRepository.findOne({
      _id: conservationId,
    });
    const updatedReader = [...conservation.readBy, user];
    await this.conservationRepository.findOneAndUpdate(
      { _id: conservationId },
      { readBy: updatedReader },
    );
    const notReadConservations = await this.conservationRepository.find(
      { members: userId },
      null,
      {
        populate: [
          { path: 'members' },
          { path: 'messages', populate: { path: 'sender' } },
        ],
      },
    );
    return notReadConservations
      .sort(
        (a, b) =>
          new Date(b.messages[b.messages.length - 1].createdAt).getTime() -
          new Date(a.messages[a.messages.length - 1].createdAt).getTime(),
      )
      .map((conservation) => new ConservationDto(conservation));
  }

  async sendNewMessage(newMessage: SendMessageDto): Promise<MessageDto> {
    const sender = await this.userRepository.findOne({
      _id: newMessage.senderId,
    });
    const receiver = await this.userRepository.findOne({
      _id: newMessage.receiverId,
    });
    const createdMessage = await this.messageRepository.create({
      sender,
      content: newMessage.content,
      contentMedia: newMessage.contentMedia,
    });
    const conservationInDB = await this.conservationRepository.findOne(
      {
        _id: newMessage.conservationId,
      },
      null,
      { populate: { path: 'readBy' } },
    );
    if (conservationInDB) {
      const updatedMessages = [...conservationInDB.messages, createdMessage];
      await this.conservationRepository.findOneAndUpdate(
        { _id: conservationInDB._id },
        { messages: updatedMessages, readBy: [sender] },
      );
    } else {
      await this.conservationRepository.create({
        members: [sender, receiver],
        messages: [createdMessage],
        readBy: [sender],
      });
    }
    if (receiver.isOnline) {
      this.reatimeGateway
        .getServer()
        .to(receiver.socketId)
        .emit('conservation-updated');
      this.reatimeGateway
        .getServer()
        .to(receiver.socketId)
        .emit('receive-message', new MessageDto(createdMessage));
    }
    return new MessageDto(createdMessage);
  }
}

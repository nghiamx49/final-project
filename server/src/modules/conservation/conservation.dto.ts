import { ConservationDocument } from 'src/schemas/conservation.schema';
import { MessageDocument } from 'src/schemas/message.schema';
import { UserResponseDto } from '../auth/dto/user.dto';
import { ReactionDto } from '../feeds/dto/reaction.dto';

export interface SendMessageDto {
  senderId: string;
  content: string;
  contentMedia?: Map<string, string>[];
  receiverId: string;
  conservationId: string;
}

export class MessageDto {
  constructor(message: MessageDocument) {
    this._id = message._id.toString();
    this.content = message.content;
    this.contentMedia = message.contentMedia;
    this.createdAt = message.createdAt;
    this.updatedAt = message.updatedAt;
    this.isStoryReply = message.isStoryReply;
    this.sender = new UserResponseDto(message.sender);
    this.reactions = message.reactions.map(
      (reaction) => new ReactionDto(reaction),
    );
  }
  _id: string;
  content: string;
  sender: UserResponseDto;
  reactions: ReactionDto[];
  createdAt: Date;
  updatedAt: Date;
  isStoryReply: boolean;
  //story?: StoryDocument;
  contentMedia?: Map<string, string>[];
}

export class ConservationDto {
  constructor(conservation: ConservationDocument) {
    this._id = conservation._id.toString();
    this.members = conservation.members.map(
      (user) => new UserResponseDto(user),
    );
    this.messages = conservation.messages.map(
      (message) => new MessageDto(message),
    );
    this.createdAt = conservation.createdAt;
    this.updatedAt = conservation.updatedAt;
    this.readBy = conservation.readBy.map((user) => new UserResponseDto(user));
  }
  _id: string;
  members: UserResponseDto[];
  messages: MessageDto[];
  createdAt?: Date;
  updatedAt?: Date;
  readBy: UserResponseDto[];
}

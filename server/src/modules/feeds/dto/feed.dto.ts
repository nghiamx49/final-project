import { FeedDocument } from 'src/schemas/feed.shema';
import { UserResponseDto } from '../../auth/dto/user.dto';
import { CommentDto } from './comments.dto';
import { ReactionDto } from './reaction.dto';

export class FeedDto {
  constructor(feed: FeedDocument) {
    this._id = feed._id.toString();
    this.author = new UserResponseDto(feed.author);
    this.content = feed.content;
    this.contentMedia = feed?.contentMedia;
    this.createdAt = feed.createdAt;
    this.updatedAt = feed.updatedAt;
    this.comments = feed?.comments.map((comment) => new CommentDto(comment));
    this.reactions = feed?.reactions.map(
      (reaction) => new ReactionDto(reaction),
    );
  }
  _id: string;
  author: UserResponseDto;
  content: string;
  contentMedia?: Map<string, string>[];
  createdAt: Date;
  updatedAt: Date;
  comments: CommentDto[];
  reactions: ReactionDto[];
}

export class FeedCreateDto {
  constructor(feed: FeedDocument) {
    this.content = feed.content;
    this.contentMedia = feed?.contentMedia;
  }
  content: string;
  contentMedia?: Map<string, string>[];
}

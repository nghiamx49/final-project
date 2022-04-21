import { Injectable } from '@nestjs/common';
import { CommentRepository } from 'src/repository/comment.repository';
import { FeedRepository } from 'src/repository/feed.repository';
import { FriendListRepository } from 'src/repository/friendList.repository';
import { ReactionRepository } from 'src/repository/reaction.repository';
import { UserRepository } from 'src/repository/user.repository';
import { CommentDocument } from 'src/schemas/comment.schema';
import { FeedDocument } from 'src/schemas/feed.shema';
import { FriendListDocument } from 'src/schemas/friendList.schema';
import { ReactionDocument } from 'src/schemas/reaction.schema';
import { UserDocument } from 'src/schemas/user.schema';
import { CommentCreateDto, CommentDto } from './dto/comments.dto';
import { FeedCreateDto, FeedDto } from './dto/feed.dto';
import { ReactionCreateDto, ReactionDto } from './dto/reaction.dto';

@Injectable()
export class FeedService {
  constructor(
    private readonly feedRepository: FeedRepository,
    private readonly reactionRepository: ReactionRepository,
    private readonly commentRepository: CommentRepository,
    private readonly userRepository: UserRepository,
    private readonly friendListRepository: FriendListRepository,
  ) {}

  async createNewPost(userId: string, data: FeedCreateDto): Promise<FeedDto> {
    const user: UserDocument = await this.userRepository.findOne({
      _id: userId,
    });
    const newFeedItem: FeedDocument = await this.feedRepository.create({
      author: user,
      ...data,
    });
    await newFeedItem.populate('author comments reactions');
    return new FeedDto(newFeedItem);
  }

  async getAllOwnPosts(userId: string): Promise<FeedDto[]> {
    const allOwnPosts: FeedDocument[] = await this.feedRepository.find(
      {
        author: userId,
      },
      null,
      {
        sort: { createdAt: -1 },
        populate: [
          { path: 'author' },
          { path: 'comments', populate: { path: 'author' } },
          { path: 'reactions', populate: { path: 'reactionBy' } },
        ],
      },
    );
    return allOwnPosts.map((post: FeedDocument): FeedDto => new FeedDto(post));
  }

  async getSinglePost(postId: string): Promise<FeedDto> {
    const postInDb = await this.feedRepository.findOne({ _id: postId }, null, {
      populate: [
        { path: 'author' },
        { path: 'comments', populate: { path: 'author' } },
        { path: 'reactions', populate: { path: 'reactionBy' } },
      ],
    });
    return new FeedDto(postInDb);
  }

  async getNewFeeds(userId: string): Promise<FeedDto[]> {
    const userFriendsList: FriendListDocument =
      await this.friendListRepository.findOne({ user: userId }, null, {
        populate: 'allFriends',
      });
    const friendListId: string[] = userFriendsList.allFriends.map((friend) =>
      friend._id.toString(),
    );
    console.log(friendListId);
    const newFeeds = await this.feedRepository.find(
      { author: { $in: [...friendListId, userId] } },
      null,
      {
        populate: [{path: 'author'}, {path: 'comments', populate: { path: 'author'}}, {path: 'reactions', populate: {path: 'reactionBy'}}],
        sort: { createdAt: -1 },
      },
    );
    return newFeeds.map((post: FeedDocument): FeedDto => new FeedDto(post));
  }

  async commentOnAPost(
    postId: string,
    userId: string,
    commentDto: CommentCreateDto,
  ): Promise<CommentDto> {
    const postInDb: FeedDocument = await this.feedRepository.findOne({
      _id: postId,
    });
    const author: UserDocument = await this.userRepository.findOne({
      _id: userId,
    });
    const newComment: CommentDocument = await this.commentRepository.create({
      author: author,
      content: commentDto.content,
    });
    const updateComment: CommentDocument[] = [...postInDb.comments, newComment];
    await this.feedRepository.findOneAndUpdate(
      { _id: postId },
      { comments: updateComment },
    );
    return new CommentDto(newComment);
  }

  async reactionToAPost(
    postId: string,
    userId: string,
    reactionDto: ReactionCreateDto,
  ): Promise<ReactionDto> {
    const author = await this.userRepository.findOne({ _id: userId });
    const postInDb: FeedDocument = await this.feedRepository.findOne(
      { _id: postId },
      null,
      { populate: { path: 'reactions', populate: { path: 'reactionBy' } } },
    );
    const checkExisted: ReactionDocument = await this.reactionRepository.findOne({reactionBy: author, postId: postId})
    if(checkExisted) {
        const updatedReaction = await this.reactionRepository.findOneAndUpdate({
          _id: checkExisted._id,
        }, {reactionType: reactionDto.reactionType}, {populate: 'reactionBy'});
        return new ReactionDto(updatedReaction);
    }
    const newReaction: ReactionDocument = await this.reactionRepository.create({
      reactionType: reactionDto.reactionType,
      reactionBy: author,
      postId: postId
    });
    const updatedReactions: ReactionDocument[] = [
      ...postInDb.reactions,
      newReaction,
    ];
    await this.feedRepository.findOneAndUpdate(
      { _id: postId },
      { reactions: updatedReactions },
    );
    return new ReactionDto(newReaction);
  }

  async replyAComment(
    commentId: string,
    userId,
    commentDto: CommentCreateDto,
  ): Promise<CommentDto> {
    const author = await this.userRepository.findOne({ _id: userId });
    const commentInDb: CommentDocument = await this.commentRepository.findOne({
      _id: commentId,
    });
    const updatedReplies = [
      ...commentInDb.replies,
      { author, content: commentDto.content },
    ];
    return new CommentDto(
      await this.commentRepository.findOneAndUpdate(
        { _id: commentId },
        { replies: updatedReplies },
        { populate: { path: 'author replies.author' } },
      ),
    );
  }
}

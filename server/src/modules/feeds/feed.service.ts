import { Injectable } from '@nestjs/common';
import { CommentRepository } from '../../repository/comment.repository';
import { FeedRepository } from '../../repository/feed.repository';
import { FriendListRepository } from '../../repository/friendList.repository';
import { ReactionRepository } from '../../repository/reaction.repository';
import { UserRepository } from '../../repository/user.repository';
import { CommentDocument } from '../../schemas/comment.schema';
import { FeedDocument } from '../../schemas/feed.shema';
import { FriendListDocument } from '../../schemas/friendList.schema';
import { ReactionDocument } from '../../schemas/reaction.schema';
import { UserDocument } from '../../schemas/user.schema';

import { CommentDto } from './dto/comments.dto';
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
    await newFeedItem.populate([
      { path: 'author' },
      {
        path: 'comments',
        populate: [
          { path: 'author' },
          { path: 'replies', populate: { path: 'author' } },
        ],
      },
      { path: 'reactions', populate: { path: 'reactionBy' } },
    ]);
    return new FeedDto(newFeedItem);
  }

  async getAllOwnPosts(userId: string): Promise<FeedDto[]> {
    const allOwnPosts: FeedDocument[] = await this.feedRepository.find(
      {
        author: userId,
      },
      null,
      {
        populate: [
          { path: 'author' },
          {
            path: 'comments',
            populate: [
              { path: 'author' },
              { path: 'replies', populate: { path: 'author' } },
            ],
          },
          { path: 'reactions', populate: { path: 'reactionBy' } },
        ],
        sort: { createdAt: -1 },
      },
    );
    return allOwnPosts.map((post: FeedDocument): FeedDto => new FeedDto(post));
  }

  async getSinglePost(postId: string): Promise<FeedDto> {
    const postInDb = await this.feedRepository.findOne({ _id: postId }, null, {
      populate: [
        { path: 'author' },
        {
          path: 'comments',
          populate: [
            { path: 'author' },
            { path: 'replies', populate: { path: 'author' } },
          ],
        },
        { path: 'reactions', populate: { path: 'reactionBy' } },
      ],
    });
    return new FeedDto(postInDb);
  }

  async getNewFeeds(userId: string, page: number = 1): Promise<{data: FeedCreateDto[], totalPage: number}> {
    const LIMIT = process.env.PAGE_LIMIT;
    const totalPage = Math.ceil(await this.feedRepository.countDocuments({}) / parseInt(LIMIT));
    const userFriendsList: FriendListDocument =
      await this.friendListRepository.findOne({ user: userId }, null, {
        populate: 'allFriends',
      });
    const friendListId: string[] = userFriendsList.allFriends.map((friend) =>
      friend._id.toString(),
    );
    const newFeeds = await this.feedRepository.find(
      { author: { $in: [...friendListId, userId] } },
      null,
      {
        populate: [
          { path: 'author' },
          {
            path: 'comments',
            populate: [
              { path: 'author' },
              { path: 'replies', populate: { path: 'author' } },
            ],
          },
          { path: 'reactions', populate: { path: 'reactionBy' } },
        ],
        sort: { createdAt: -1 },
        skip: (page - 1) * parseInt(LIMIT),
        limit: parseInt(LIMIT),
      },
    );
    return {data: newFeeds.map((post: FeedDocument): FeedDto => new FeedDto(post)), totalPage};
  }

  async commentOnAPost(
    postId: string,
    userId: string,
    content: string,
  ): Promise<CommentDto[]> {
    const postInDb: FeedDocument = await this.feedRepository.findOne({
      _id: postId,
    });
    const author: UserDocument = await this.userRepository.findOne({
      _id: userId,
    });
    const newComment: CommentDocument = await this.commentRepository.create({
      author: author,
      content: content,
    });
    const updateComment: CommentDocument[] = [newComment, ...postInDb.comments];
    await this.feedRepository.findOneAndUpdate(
      { _id: postId },
      { comments: updateComment },
    );
    const post = await this.feedRepository.findOne({ _id: postId }, null, {
      populate: [{ path: 'comments', populate: { path: 'author' } }],
    });
    return post.comments.map((comment) => new CommentDto(comment));
  }

  async reactionToAPost(
    postId: string,
    userId: string,
    reactionDto: ReactionCreateDto,
  ): Promise<ReactionDto[]> {
    const author = await this.userRepository.findOne({ _id: userId });
    const postInDb: FeedDocument = await this.feedRepository.findOne(
      { _id: postId },
      null,
      { populate: { path: 'reactions', populate: { path: 'reactionBy' } } },
    );
    const checkExisted: ReactionDocument =
      await this.reactionRepository.findOne({
        reactionBy: author,
        postId: postId,
      });
    if (checkExisted) {
      await this.reactionRepository.findOneAndUpdate(
        {
          _id: checkExisted._id,
        },
        { reactionType: reactionDto.reactionType },
        { populate: 'reactionBy' },
      );
      const allReactions = await this.reactionRepository.find(
        { postId: postId },
        null,
        { populate: 'reactionBy' },
      );
      return allReactions.map((reaction) => new ReactionDto(reaction));
    }
    const newReaction: ReactionDocument = await this.reactionRepository.create({
      reactionType: reactionDto.reactionType,
      reactionBy: author,
      postId: postId,
    });
    const updatedReactions: ReactionDocument[] = [
      ...postInDb.reactions,
      newReaction,
    ];
    await this.feedRepository.findOneAndUpdate(
      { _id: postId },
      { reactions: updatedReactions },
    );
    const allReactions = await this.reactionRepository.find(
      { postId: postId },
      null,
      { populate: 'reactionBy' },
    );
    return allReactions.map((reaction) => new ReactionDto(reaction));
  }

  async removeReaction(
    postId: string,
    reactionId: string,
  ): Promise<ReactionDto[]> {
    await this.reactionRepository.findOneAndDelete({ _id: reactionId });
    const allReactions = await this.reactionRepository.find(
      { postId: postId },
      null,
      { populate: 'reactionBy' },
    );
    return allReactions.map((reaction) => new ReactionDto(reaction));
  }

  async replyAComment(
    commentId: string,
    userId,
    content: string,
  ): Promise<CommentDto> {
    const author = await this.userRepository.findOne({ _id: userId });
    const commentInDb: CommentDocument = await this.commentRepository.findOne({
      _id: commentId,
    });
    const updatedReplies = [
      { author, content: content },
      ...commentInDb.replies,
    ];
    return new CommentDto(
      await this.commentRepository.findOneAndUpdate(
        { _id: commentId },
        { replies: updatedReplies },
        { populate: { path: 'author replies.author' } },
      ),
    );
  }

  async editPostContent(postId: string, content: string): Promise<void> {
    await this.feedRepository.findOneAndUpdate({_id: postId}, {content})
  }

  async removePost(postId: string): Promise<void> {
    try {
      const post = await this.feedRepository.findOne({ _id: postId });
      await Promise.all(
        post.comments.map(async (item) => {
          await this.commentRepository.findOneAndDelete({ _id: item });
        }),
      );
      await Promise.all(
        post.reactions.map(async (item) => {
          await this.reactionRepository.findOneAndDelete({ _id: item });
        }),
      );
      await this.feedRepository.findOneAndDelete({ _id: postId });
    } catch (error) {
      throw new Error('Operation failed')
    }
  }
}

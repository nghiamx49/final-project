import {
  Controller,
  Req,
  Res,
  UseGuards,
  Get,
  HttpStatus,
  Post,
  Body,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { JwtAuthenticateGuard } from '../../middleware/authenticate.middleware';
import { FeedCreateDto, FeedDto } from './dto/feed.dto';
import { ReactionCreateDto } from './dto/reaction.dto';
import { FeedService } from './feed.service';

@ApiTags('New Feeds')
@Controller('api/feeds')
@UseGuards(JwtAuthenticateGuard)
export class FeedController {
  constructor(private readonly feedService: FeedService) {}

  @Get('/')
  async getPosts(@Req() req, @Res() response: Response, @Query('page') page: number): Promise<void> {
    const { _id } = req.user;
    const {data, totalPage} = await this.feedService.getNewFeeds(_id, page);
    response.status(HttpStatus.OK).json({ data, totalPage });
  }

  @Get('/:userId')
  async getUserPosts(
    @Param('userId') userId: string,
    @Res() response: Response,
  ): Promise<void> {
    const allPosts: FeedDto[] = await this.feedService.getAllOwnPosts(userId);
    response.status(HttpStatus.OK).json({ data: allPosts });
  }

  @Get('/posts/:postId')
  async getSinglePost(
    @Param('postId') postId: string,
    @Res() response: Response,
  ): Promise<void> {
    const postInDB = await this.feedService.getSinglePost(postId);
    response.status(HttpStatus.OK).json({ data: postInDB });
  }

  @Post('/posts/:postId/comment')
  async commentOnPost(
    @Req() req,
    @Param('postId') postId: string,
    @Body('content') content: string,
    @Res() response: Response,
  ): Promise<void> {
    try {
      const comment = await this.feedService.commentOnAPost(
        postId,
        req.user._id,
        content,
      );
      response.status(HttpStatus.CREATED).json({ data: comment });
    } catch (error) {
      response.status(HttpStatus.BAD_REQUEST).json({ message: error.message });
    }
  }

  @Post('/posts/:postId/reaction')
  async reactionOnPost(
    @Req() req,
    @Param('postId') postId: string,
    @Body() reaction: ReactionCreateDto,
    @Res() response: Response,
  ): Promise<void> {
    try {
      const newReaction = await this.feedService.reactionToAPost(
        postId,
        req.user._id,
        reaction,
      );
      response.status(HttpStatus.CREATED).json({ data: newReaction });
    } catch (error) {
      response.status(HttpStatus.BAD_REQUEST).json({ message: error.message });
    }
  }

  @Delete('/posts/:postId/reaction/:reactionId')
  async removeReaction(
    @Req() req,
    @Param('postId') postId: string,
    @Param('reactionId') reactionId: string,
    @Res() response: Response,
  ): Promise<void> {
    try {
      const reactions = await this.feedService.removeReaction(
        postId,
        reactionId,
      );
      response.status(HttpStatus.OK).json({ data: reactions });
    } catch (error) {
      response.status(HttpStatus.BAD_REQUEST).json({ message: error.message });
    }
  }
  @Post('/posts/:postId/:commentId')
  async replyCommentOnPost(
    @Req() req,
    @Param('commentId') commentId: string,
    @Body('content') content: string,
    @Res() response: Response,
  ): Promise<void> {
    try {
      const newComment = await this.feedService.replyAComment(
        commentId,
        req.user._id,
        content,
      );
      response.status(HttpStatus.CREATED).json({ data: newComment });
    } catch (error) {
      response.status(HttpStatus.BAD_REQUEST).json({ message: error.message });
    }
  }

  @Post('/')
  async createPosts(
    @Req() req,
    @Body() requestBody: FeedCreateDto,
    @Res() response: Response,
  ): Promise<void> {
    const { _id } = req.user;
    try {
      const newPosts = await this.feedService.createNewPost(_id, requestBody);
      response.status(HttpStatus.CREATED).json({ data: newPosts });
    } catch (error) {
      response.status(HttpStatus.BAD_REQUEST).json({ data: error.message });
    }
  }
}

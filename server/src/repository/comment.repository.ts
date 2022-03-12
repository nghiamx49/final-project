import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { BaseRepository } from './base.repository';
import { Model } from 'mongoose';
import { Comment, CommentDocument } from 'src/schemas/comment.schema';

@Injectable()
export class CommentRepository extends BaseRepository<CommentDocument> {
  constructor(
    @InjectModel(Comment.name)
    commentModel: Model<CommentDocument>,
  ) {
    super(commentModel);
  }
}

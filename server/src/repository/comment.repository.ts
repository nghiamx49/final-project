import { Inject, Injectable } from '@nestjs/common';
import { BaseRepository } from './base.repository';
import { Model } from 'mongoose';
import { CommentDocument } from '../schemas/comment.schema';

@Injectable()
export class CommentRepository extends BaseRepository<CommentDocument> {
  constructor(
    @Inject('COMMENT_MODEL')
    commentModel: Model<CommentDocument>,
  ) {
    super(commentModel);
  }
}

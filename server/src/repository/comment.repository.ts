import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { BaseRepository } from './base.repository';
import { Model } from 'mongoose';
import { CommentDocument } from 'src/schemas/comment.schema';

@Injectable()
export class CommentRepository extends BaseRepository<CommentDocument> {
  constructor(
    @InjectModel('COMMENT_MODEL')
    commentModel: Model<CommentDocument>,
  ) {
    super(commentModel);
  }
}

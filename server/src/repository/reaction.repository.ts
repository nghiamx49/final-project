import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { BaseRepository } from './base.repository';
import { Model } from 'mongoose';
import { ReactionDocument } from 'src/schemas/reaction.schema';

@Injectable()
export class ReactionRepository extends BaseRepository<ReactionDocument> {
  constructor(@InjectModel('REACTION_MODEL') reactionModel: Model<ReactionDocument>) {
    super(reactionModel);
  }
}

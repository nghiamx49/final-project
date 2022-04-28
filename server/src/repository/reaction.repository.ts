import { Inject, Injectable } from '@nestjs/common';
import { BaseRepository } from './base.repository';
import { Model } from 'mongoose';
import { ReactionDocument } from '../schemas/reaction.schema';

@Injectable()
export class ReactionRepository extends BaseRepository<ReactionDocument> {
  constructor(
    @Inject('REACTION_MODEL') reactionModel: Model<ReactionDocument>,
  ) {
    super(reactionModel);
  }
}

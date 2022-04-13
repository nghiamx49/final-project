import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { BaseRepository } from './base.repository';
import { Model } from 'mongoose';
import { StoryDocument } from 'src/schemas/story.schema';

@Injectable()
export class StoryRepository extends BaseRepository<StoryDocument> {
  constructor(
    @InjectModel('STORY_MODEL') storyModel: Model<StoryDocument>,
  ) {
    super(storyModel);
  }
}

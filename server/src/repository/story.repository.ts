import { Inject, Injectable } from '@nestjs/common';
import { BaseRepository } from './base.repository';
import { Model } from 'mongoose';
import { StoryDocument } from 'src/schemas/story.schema';

@Injectable()
export class StoryRepository extends BaseRepository<StoryDocument> {
  constructor(@Inject('STORY_MODEL') storyModel: Model<StoryDocument>) {
    super(storyModel);
  }
}

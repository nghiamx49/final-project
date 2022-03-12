import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { BaseRepository } from './base.repository';
import { Model } from 'mongoose';
import { Feed, FeedDocument } from 'src/schemas/feed.shema';

@Injectable()
export class FeedRepository extends BaseRepository<FeedDocument> {
  constructor(
    @InjectModel(Feed.name)
    feedModel: Model<FeedDocument>,
  ) {
    super(feedModel);
  }
}

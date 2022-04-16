import { Inject, Injectable } from '@nestjs/common';
import { BaseRepository } from './base.repository';
import { Model } from 'mongoose';
import { Feed, FeedDocument } from 'src/schemas/feed.shema';

@Injectable()
export class FeedRepository extends BaseRepository<FeedDocument> {
  constructor(
    @Inject('FEED_MODEL')
    feedModel: Model<FeedDocument>,
  ) {
    super(feedModel);
  }
}

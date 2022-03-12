import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { BaseRepository } from './base.repository';
import { Model } from 'mongoose';
import { Feed, FeedDocument } from 'src/schemas/feed.shema';
import { Conservation, ConservationDocument } from 'src/schemas/conservation.schema';

@Injectable()
export class ConservationRepository extends BaseRepository<ConservationDocument> {
  constructor(
    @InjectModel(Conservation.name)
    conservationModel: Model<ConservationDocument>,
  ) {
    super(conservationModel);
  }
}

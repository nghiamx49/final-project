import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { BaseRepository } from './base.repository';
import { Model } from 'mongoose';
import { ConservationDocument } from 'src/schemas/conservation.schema';

@Injectable()
export class ConservationRepository extends BaseRepository<ConservationDocument> {
  constructor(
    @InjectModel('CONSERVATION_MODEL')
    conservationModel: Model<ConservationDocument>,
  ) {
    super(conservationModel);
  }
}

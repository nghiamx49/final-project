import { Inject, Injectable } from '@nestjs/common';
import { BaseRepository } from './base.repository';
import { Model } from 'mongoose';
import { ConservationDocument } from 'src/schemas/conservation.schema';

@Injectable()
export class ConservationRepository extends BaseRepository<ConservationDocument> {
  constructor(
    @Inject('CONSERVATION_MODEL')
    conservationModel: Model<ConservationDocument>,
  ) {
    super(conservationModel);
  }
}

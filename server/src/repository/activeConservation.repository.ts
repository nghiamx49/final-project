import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { BaseRepository } from './base.repository';
import { Model } from 'mongoose';
import { ActiveConservation, ActiveConservationDocument } from 'src/schemas/activeConservation.schema';

@Injectable()
export class ActiveConservationRepository extends BaseRepository<ActiveConservationDocument> {
  constructor(
    @InjectModel(ActiveConservation.name)
    activeConservationModel: Model<ActiveConservationDocument>,
  ) {
    super(activeConservationModel);
  }
}

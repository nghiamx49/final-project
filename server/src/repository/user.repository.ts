import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { BaseRepository } from "./base.repository";
import {UserDocument} from '../schemas/user.schema';
import { Model } from "mongoose";


@Injectable()
export class UserRepository extends BaseRepository<UserDocument> {
  constructor(@InjectModel('USER_MODEL') userModel: Model<UserDocument>) {
    super(userModel);
  }
}
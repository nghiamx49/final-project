import { ReactionDocument } from "../../../schemas/reaction.schema";
import { UserResponseDto } from "../../profile/profile.dto";


export class ReactionDto {
  constructor(reaction: ReactionDocument) {
    this._id = reaction._id.toString();
    this.reactionType = reaction.reactionType;
    this.reactionBy = new UserResponseDto(reaction.reactionBy);
  }
  _id: string;
  reactionType: string;
  reactionBy: UserResponseDto;
}

export class ReactionCreateDto {
  reactionType: String;
}

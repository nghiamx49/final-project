import { UserResponseDto } from "src/modules/profile/profile.dto";
import { ReactionDocument } from "src/schemas/reaction.schema";


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
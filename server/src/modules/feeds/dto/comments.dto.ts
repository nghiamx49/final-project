import { UserResponseDto } from "src/modules/profile/profile.dto";
import { CommentDocument } from "src/schemas/comment.schema";

export class CommentDto {
    constructor(comment: CommentDocument) {
        this._id = comment._id.toString();
        this.author = new UserResponseDto(comment.author);
        this.content = comment.content;
        this.createdAt = comment.createdAt;
        this.replies = comment?.replies?.map((reply) => new CommentDto(reply));
    }
    _id: string;
    author: UserResponseDto;
    content: string;
    createdAt: Date;
    replies?: CommentDto[];
}


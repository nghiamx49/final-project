import { UserDocument } from "../../schemas/user.schema";
import { UserResponseDto } from "../auth/dto/user.dto";


export class TopUserDto {
    constructor(user: UserDocument, posts, comments) {
        this.user = new UserResponseDto(user);
        this.posts = posts;
        this.comments = comments;
    }
    user: UserResponseDto;
    posts: number;
    comments: number;
}
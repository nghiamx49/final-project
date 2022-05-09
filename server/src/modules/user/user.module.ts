import { Module } from "@nestjs/common";
import { roleProvider } from "../../middleware/authorize.middleware";
import { CommentRepository } from "../../repository/comment.repository";
import { FeedRepository } from "../../repository/feed.repository";
import { UserRepository } from "../../repository/user.repository";
import { DatabaseModule } from "../persistance/db.module";
import { commentProvider, feedProviders, userProvider } from "../persistance/db.providers";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";


@Module({
    controllers: [UserController],
    providers: [UserService, UserRepository, userProvider, feedProviders, commentProvider, FeedRepository, CommentRepository],
    imports: [DatabaseModule]
})
export class UserModule {}
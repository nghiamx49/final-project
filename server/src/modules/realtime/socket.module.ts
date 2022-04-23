import { Module } from "@nestjs/common";
import { FriendListRepository } from "src/repository/friendList.repository";
import { UserRepository } from "src/repository/user.repository";
import { DatabaseModule } from "../persistance/db.module";
import { friendListProvider, userProvider } from "../persistance/db.providers";
import { RealtimeGateWay } from "./socket.gateway";


@Module({
    providers: [RealtimeGateWay, userProvider, UserRepository,friendListProvider, FriendListRepository],
    imports: [DatabaseModule],
    exports: [FriendListRepository, friendListProvider]
})
export class RealtimeModule {}
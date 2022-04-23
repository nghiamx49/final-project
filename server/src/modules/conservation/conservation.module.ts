import { Module } from "@nestjs/common";
import { ConservationRepository } from "src/repository/conservation.repository";
import { FriendListRepository } from "src/repository/friendList.repository";
import { MessageRepository } from "src/repository/message.repository";
import { UserRepository } from "src/repository/user.repository";
import { DatabaseModule } from "../persistance/db.module";
import { conservationProvider, messageProvider, userProvider } from "../persistance/db.providers";
import { RealtimeGateWay } from "../realtime/socket.gateway";
import { RealtimeModule } from "../realtime/socket.module";
import { ConservationController } from "./conservation.controller";
import { ConservationService } from "./conversavtion.service";


@Module({
  providers: [
    RealtimeGateWay,
    userProvider,
    UserRepository,
    messageProvider,
    conservationProvider,
    MessageRepository,
    ConservationRepository,
    userProvider,
    UserRepository,
    ConservationService
  ],
  controllers: [ConservationController],
  imports: [DatabaseModule, RealtimeModule],
})
export class ConservationModule {}
import { Module } from "@nestjs/common";
import { FeedRepository } from "../../repository/feed.repository";
import { UserRepository } from "../../repository/user.repository";
import { DatabaseModule } from "../persistance/db.module";
import { feedProviders, userProvider } from "../persistance/db.providers";
import { StatisticalController } from "./statistical.controller";
import { StatisticalService } from "./statistical.service";



@Module({
    controllers: [StatisticalController],
    providers: [feedProviders, FeedRepository, StatisticalService, UserRepository, userProvider],
    imports: [DatabaseModule]
})
export class StatisticalModule {}
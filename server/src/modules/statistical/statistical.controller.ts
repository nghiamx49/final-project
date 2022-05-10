import { Controller, Get, Res } from "@nestjs/common";
import { response, Response } from "express";
import { StatisticalService } from "./statistical.service";


@Controller('api/chart')
export class StatisticalController {
  constructor(private readonly statisticalService: StatisticalService) {}

  @Get('/')
  async allDay(@Res() response: Response) {
    const data = await this.statisticalService.postsPerDay();
    response.status(200).json(data);
  }

  @Get('/column')
  async getPostThreeDaysNearby(@Res() response: Response) {
      const data = await this.statisticalService.feedIn3daysNearby();
    response.status(200).json(data);
  }

  @Get('/count')
  async getCount(@Res() response: Response) {
    const data = await this.statisticalService.applicationUsersAndPostsCount();
    response.status(200).json(data);
  }
}
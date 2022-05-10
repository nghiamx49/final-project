import { Body, Controller, Get, Param, Put, Query, Res, UseGuards } from "@nestjs/common";
import { Response } from "express";
import { JwtAuthenticateGuard } from "../../middleware/authenticate.middleware";
import {Role, Roles, RolesGuard } from "../../middleware/authorize.middleware";
import { UserService } from "./user.service";



@Controller('api/users')
@UseGuards(JwtAuthenticateGuard, RolesGuard)
@Roles(Role.ADMIN)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/top')
  async getTopUserOfApp(@Res() response: Response) {
    const data = await this.userService.getTopActiveUsers();
    response.status(200).json(data);
  }

  @Get('/')
  async getAllUser(@Query('name') name: string, @Query('page') page: number, @Query('sort') sort: string, @Res() response: Response) {
    const data = await this.userService.getAllUsers(name, page, sort);
    response.status(200).json(data);
  }

  @Put('/:userId')
  async updateUserStatus(
    @Param('userId') userId: string,
    @Body('status') status: boolean,
    @Res() response: Response,
  ) {
    await this.userService.changeUserActiveStatus(userId, status);
    response.sendStatus(200);
  }
}
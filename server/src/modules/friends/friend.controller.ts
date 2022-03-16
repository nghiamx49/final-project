import { Body, Controller, Get, HttpStatus, Param, Post, Put, Request, Res, UseGuards } from "@nestjs/common";
import { Response } from "express";
import { JwtAuthenticateGuard } from "src/middleware/authenticate.middleware";
import { UserResponseDto } from "../auth/dto/user.dto";
import { FriendRequestDTO } from "./dto/friendRequest.dto";
import { FriendService } from "./friend.service";

@Controller('api/friends')
@UseGuards(JwtAuthenticateGuard)
export class FriendController {
  constructor(private readonly friendService: FriendService) {}

  @Get('/')
  async getAllFriend(@Request() request, @Res() response: Response) {
    const allFriends: UserResponseDto[] =
      await this.friendService.getAllUserFriends(request.user._id);
    response.status(200).json({ data: allFriends });
  }

  @Post('/')
  async sendNewFriendReq(
    @Request() request,
    @Body() body: FriendRequestDTO,
    @Res() response: Response,
  ) {
    const { receiverId } = body;
    await this.friendService.sendNewFriendRequest(request.user._id, receiverId);
    response.status(201).json({ message: 'Your Request Had Sent' });
  }
  @Get('/pending')
  async listWaitingForResponse(@Request() request, @Res() response: Response) {
    const { _id } = request.user;
    const listWaitingForResponse: UserResponseDto[] =
      await this.friendService.getAllFriendRequests(_id);
    response.status(200).json({ data: listWaitingForResponse });
  }

  @Get('/waiting')
  async listWaitingForAccept(@Request() request, @Res() response: Response) {
    const { _id } = request.user;
    const listWaitingForAccept: UserResponseDto[] = await this.friendService.getAllReceivedFriendRequests(_id);
      response.status(200).json({ data: listWaitingForAccept });
  }

  @Get('/status/:userId')
  async friendRequestStatus(
    @Param('userId') userId: string,
    @Request() request,
    @Res() response: Response,
  ) {
    const { _id } = request.user;
    const currentStatus = await this.friendService.checkCurrentFriendStatus(
      _id,
      userId,
    );
    response.status(200).json({ data: currentStatus });
  }

  @Post('/:requestId')
  async handleFriendRequest(
    @Param('requestId') requestId: string,
    @Request() request,
    @Body('status') status: string, 
    @Res() response: Response,
  ) {
    try {
      const { _id } = request.user;
      await this.friendService.handleFriendRequest(_id, requestId, status);
      response
        .status(200)
        .json({ message: 'You had accepted this friend request' });
    } catch (error) {
        response.status(HttpStatus.BAD_REQUEST).json({message: error?.message})
    }
  }

  @Put('/unfriend')
  async handleUnfriend(@Request() request, @Body('friendId') friendId: string, @Res() response: Response) {
      const { _id } = request.user;
      await this.friendService.handleUnfriend(_id, friendId);
      response.status(200).json({message: "Unfriend successfully"});
  }
}
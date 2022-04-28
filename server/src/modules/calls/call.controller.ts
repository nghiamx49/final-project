import { Body, Controller, Get, Post, Req, Res, UseGuards } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { Response } from "express";
import { JwtAuthenticateGuard } from "../../middleware/authenticate.middleware";
import { CallService } from "./call.service";


@ApiTags('Call API')
@Controller('api/call')
@UseGuards(JwtAuthenticateGuard)
export class CallController{
    constructor(
        private readonly callService: CallService
    ){}

    @Post('/')
    generateVideoAppToken(@Req() req,@Body('role') role: string, @Body('roomId') roomId: string, @Res() response: Response) {
        const token = this.callService.tokenGenerator(role, roomId, req.user._id);
        response.status(201).json({token})
    }

    @Get('/token')
    manageToken(@Req() req, @Res() response: Response) {
        const token = this.callService.manageToken();
        response.status(200).json({token})
    }
}
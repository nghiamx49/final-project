import {
  BadRequestException,
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Put,
  Request,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { request } from 'http';
import { JwtAuthenticateGuard } from '../../middleware/authenticate.middleware';
import { UpdateAccountDto } from './profile.dto';
import { ProfileService } from './profile.service';

@ApiTags('Profile')
@Controller('api/profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}
  @Get('/:profile')
  async getProfile(
    @Param('profile') profile: string,
    @Res() res: Response,
  ): Promise<void> {
    try {
      const user = await this.profileService.getAccountProfile(profile);
      res.status(200).json({ user: user });
    } catch (error) {
      throw new BadRequestException();
    }
  }

  @UseGuards(JwtAuthenticateGuard)
  @Put('/')
  async updateProfile(
    @Body() updateProfileDto: UpdateAccountDto,
    @Res() res: Response,
    @Request() request,
  ) {
    try {
      await this.profileService.updateProfile(
        request.user._id,
        updateProfileDto,
      );
      res.status(HttpStatus.OK).json({ message: 'profile updated' });
    } catch (error) {
      res.status(HttpStatus.BAD_REQUEST).json({ message: 'updated failed' });
    }
  }
}

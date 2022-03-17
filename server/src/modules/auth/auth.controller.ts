import {
  Controller,
  Post,
  Res,
  Request,
  Get,
  Body,
  UseGuards,
  HttpStatus,
  Param,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Response } from 'express';
import { RegisterDto, UserResponseDto } from './dto/user.dto';
import { JwtAuthenticateGuard, LocalAuthenticateGuard } from 'src/middleware/authenticate.middleware';
import { Roles, Role, RolesGuard } from 'src/middleware/authorize.middleware';

@Controller('api/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  // @UseGuards(JwtAuthenticateGuard, RolesGuard)
  // @Roles(Role.USER)
  @Get('/profile/:profile')
  async getProfile(
    @Param('profile') profile: string,
    @Request() req,
    @Res({ passthrough: true }) res: Response,
  ): Promise<void> {
    try {
      const user = await this.authService.getAccountProfile(profile);
      res.status(200).json({ user });
    } catch (error) {
      res.status(HttpStatus.NOT_FOUND).json({message: error.message})
    }
  }

  @UseGuards(LocalAuthenticateGuard)
  @Post('login')
  async login(
    @Request() request,
    @Res({ passthrough: true }) res: Response,
  ): Promise<void> {
    const response = await this.authService.login(request.user);
    res.status(HttpStatus.OK).json(response);
  }

  @Post('register')
  async register(
    @Body() registerDto: RegisterDto,
    @Res({ passthrough: true }) response: Response,
  ): Promise<void> {
    try {
      await this.authService.register(registerDto);
      response
        .status(HttpStatus.CREATED)
        .json({ message: 'Account Created Successfully' });
    } catch (error) {
      response.status(HttpStatus.BAD_REQUEST).json({ message: error?.message });
    }
  }
}

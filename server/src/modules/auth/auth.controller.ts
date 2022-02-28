import {
  Controller,
  Post,
  Res,
  Request,
  Get,
  Body,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Response } from 'express';
import { RegisterDto, UserResponseDto } from './dto/user.dto';
import { JwtAuthenticateGuard, LocalAuthenticateGuard } from 'src/middleware/authenticate.middleware';
import { Roles, Role, RolesGuard } from 'src/middleware/authorize.middleware';

@Controller('api/v1/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @UseGuards(JwtAuthenticateGuard, RolesGuard)
  @Roles(Role.USER)
  @Get('/profile')
  async getProfile(
    @Request() req,
    @Res({ passthrough: true }) res: Response,
  ): Promise<void> {
    res.status(200).json({ user: new UserResponseDto(req?.user) });
  }

  @UseGuards(LocalAuthenticateGuard)
  @Post('login')
  async login(
    @Request() request,
    @Res({ passthrough: true }) response: Response,
  ): Promise<void> {
    return await this.authService.login(request, response);
  }

  @Post('register')
  async register(
    @Body() registerDto: RegisterDto,
    @Res({ passthrough: true }) response: Response,
  ): Promise<void> {
    await this.authService.register(registerDto, response);
  }
}

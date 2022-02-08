import {
  Controller,
  Post,
  Res,
  Request,
  Body,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Response } from 'express';
import { RegisterDto } from './dto/user.dto';
import { LocalAuthenticateGuard } from 'src/middleware/authenticate.middleware';

@Controller('api/v1/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

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

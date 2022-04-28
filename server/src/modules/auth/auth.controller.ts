import { Controller, UseGuards, Post, Res, HttpStatus, Body, Request } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { Response } from "express";
import { LocalAuthenticateGuard } from "../../middleware/authenticate.middleware";
import { AuthService } from "./auth.service";
import { RegisterDto } from "./dto/user.dto";

@ApiTags('Authentication')
@Controller('api/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthenticateGuard)
  @Post('login')
  async login(
    @Request() request,
    @Res({ passthrough: true }) res: Response,
  ): Promise<void> {
    const response = await this.authService.login(request.user);
    res.status(HttpStatus.OK).json(response);
  }

  @Post('change-password')
  async resetPassword(
    @Res({ passthrough: true }) res: Response,
    @Body('email') email: string,
    @Body('password') password: string,
  ) {
    try {
      await this.authService.changePassword(email, password);
      res.status(HttpStatus.OK).json({ message: 'Password changed' });
    } catch (error) {
      res.status(HttpStatus.BAD_REQUEST).json({ message: error.message });
    }
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

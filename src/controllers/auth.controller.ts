import { Controller, Post, Request, UseGuards } from '@nestjs/common';
import { LocalAuthGuard } from 'src/auth/local-auth.guard';
import { AuthService } from 'src/services';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  login(@Request() req: { user: { email: string; id: number } }) {
    return this.authService.login(req.user);
  }
}

import { Injectable, Inject } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from './user.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    @Inject(JwtService) private jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    return this.userService.validateUser(email, pass);
  }

  login(user: { email: string }) {
    const payload = { email: user.email };
    const access_token = this.jwtService.sign(payload);
    return {
      access_token,
    };
  }
}

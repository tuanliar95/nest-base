/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from './user.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService, // Update the type of jwtService to JwtService
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    return this.userService.validateUser(email, pass);
  }

  async signIn(email: string, pass: string): Promise<{ access_token: string }> {
    const user: { id: string; email: string } = await this.validateUser(
      email,
      pass,
    );
    if (!user) {
      throw new UnauthorizedException();
    }
    const payload = { sub: user.id, username: user.email };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}

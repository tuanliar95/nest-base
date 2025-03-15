/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/services';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private userService: UserService) {
    super();
  }
  async validate(username: string, password: string) {
    const user = await this.userService.validateUser(username, password);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}

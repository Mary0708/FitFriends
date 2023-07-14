import { User } from '@fit-friends/shared/app-types';
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { UserService } from '../user/user.service';


@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(
    private userService: UserService
  ) {
    super({
      nameField: 'email'
    });
  }

  public async validate(email: string, password: string): Promise<User> {
    return this.userService.verifyUser({ email, password });
  }
}

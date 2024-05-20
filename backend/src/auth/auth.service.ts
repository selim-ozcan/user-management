import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Response } from 'express';
import { TokenPayload } from './token-payload.interface';
import { User } from 'src/users/entities/user.entity';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
  ) {}

  login(user: User, response: Response) {
    const expires = new Date();
    expires.setSeconds(
      expires.getSeconds() +
        Number(this.configService.getOrThrow('JWT_EXPIRATION')),
    );

    const tokenPayload: TokenPayload = {
      id: user.id,
      username: user.username,
      role: user.role,
    };

    const token = this.jwtService.sign(tokenPayload);

    response.cookie('Authentication', token, { httpOnly: true, expires });
    response.json({ id: user.id, username: user.username, role: user.role });
  }
}

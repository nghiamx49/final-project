import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { RoomRepository } from '../../repository/room.repository';
import { UserRepository } from '../../repository/user.repository';
import * as uuid4 from 'uuid4';
@Injectable()
export class CallService {
  constructor(
        private readonly jwtService: JwtService,
  ) {}

  tokenGenerator(role: string, roomId:string, userId: string) {
    const app_access_key = process.env.CALL_ACCESS_KEY;
    console.log(app_access_key);
    const payload = {
      access_key: app_access_key,
      room_id: roomId,
      user_id: userId,
      role: role,
      type: 'app',
      version: 2,
      iat: Math.floor(Date.now() / 1000),
      nbf: Math.floor(Date.now() / 1000),
    };
    return this.jwtService.sign(payload, {
      algorithm: 'HS256',
      expiresIn: '7d',
      jwtid: uuid4(),
    });
  }

  manageToken() {
    const app_access_key = process.env.CALL_ACCESS_KEY;
    console.log(app_access_key);
    const payload = {
      access_key: app_access_key,
      type: 'management',
      version: 2,
      iat: Math.floor(Date.now() / 1000),
      nbf: Math.floor(Date.now() / 1000),
    };
    return this.jwtService.sign(payload, {
      algorithm: 'HS256',
      expiresIn: '24h',
      jwtid: uuid4(),
    });
  }

  async createRoom(room: string) {

  }
}

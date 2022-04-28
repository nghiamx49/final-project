import { UserResponseDto } from '../auth/dto/user.dto';

export interface CallFriend {
  senderId: string;
  receiverId: string;
  roomId: string;
}

export interface CallResponse {
  roomId: string;
  from: UserResponseDto;
}


export interface CallAccept {
  friend: UserResponseDto;
  signal: any;
}

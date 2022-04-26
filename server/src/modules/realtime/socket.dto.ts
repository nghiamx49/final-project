import { UserResponseDto } from "../auth/dto/user.dto";

export interface CallFriend {
    senderId: string;
    receiverId: string;
    signal: any;
    name: string;
}

export interface CallResponse {
    from: UserResponseDto;
    signal: any;
}

export interface CallAnswer {
    to: string;
    signal: any;
    userId: string;
}

export interface CallAccept {
    friend: UserResponseDto;
    signal: any;
}
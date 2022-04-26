import { RoomDocument } from "src/schemas/room.shcema";
import { UserResponseDto } from "../auth/dto/user.dto";

export class RoomDto {
    constructor(room: RoomDocument) {
        this._id = room._id.toString();
        this.sender = new UserResponseDto(room.sender);
        this.receiver = new UserResponseDto(room.receiver);
        this.signal = room.signal;
    }
    _id: string;
    sender: UserResponseDto;
    receiver: UserResponseDto;
    signal: string;
}
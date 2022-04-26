import { RoomDocument } from "src/schemas/room.shcema";
import { UserResponseDto } from "../auth/dto/user.dto";

export class RoomDto {
    constructor(room: RoomDocument) {
        this._id = room._id.toString();
       this.members = room.members.map(user => new UserResponseDto(user));
    }
    _id: string;
   members: UserResponseDto[];
}
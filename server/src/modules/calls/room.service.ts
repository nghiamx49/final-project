import { Injectable } from "@nestjs/common";
import { RoomRepository } from "src/repository/room.repository";
import { UserRepository } from "src/repository/user.repository";
import { RoomDto } from "./room.dto";


@Injectable()
export class RoomService{
    constructor(
        private readonly roomRepository: RoomRepository,
        private readonly userRepository: UserRepository
    ){}

    async createRoom(senderId: string, receiverId: string, signal: string): Promise<RoomDto> {
        const sender = await this.userRepository.findOne({_id: senderId});
        const receiver = await this.userRepository.find({_id: receiverId});
        const room = await this.roomRepository.create({sender, receiver, signal});
        return new RoomDto(room);
    }
}
import { FriendRequest } from "src/schemas/friendRequest.schema"

export class StatusChecking {
    status: string
    receiverId: string
    senderId: string
    requestId: string
    constructor(status: string, senderId: string, receiverId: string, requestId: string) {
        this.status = status;
        this.receiverId = receiverId;
        this.senderId = senderId;
        this.requestId = requestId;
    }
}
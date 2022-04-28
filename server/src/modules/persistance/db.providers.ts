import * as mongoose from 'mongoose';
import { Conservation } from '../../schemas/conservation.schema';
import { Feed } from '../../schemas/feed.shema';
import { FriendList } from '../../schemas/friendList.schema';
import { FriendRequest } from '../../schemas/friendRequest.schema';
import { Message } from '../../schemas/message.schema';
import { OTP } from '../../schemas/otpvalidation.schema';
import { Reaction } from '../../schemas/reaction.schema';
import { Room } from '../../schemas/room.shcema';
import { User } from '../../schemas/user.schema';
import { Notification } from '../../schemas/notification.schema';
import { Comment } from '../../schemas/comment.schema';


export const databaseProviders = [
  {
    provide: 'DATABASE_CONNECTION',
    useFactory: (): Promise<typeof mongoose> =>
      //mongoose.connect('mongodb://mongo/final-project'),
      mongoose.connect('mongodb://localhost/final-project'),
  },
];

export const feedProviders = {
  provide: 'FEED_MODEL',
  useFactory: (connection: mongoose.Connection) =>
    connection.model('Feeds', Feed),
  inject: ['DATABASE_CONNECTION'],
};

export const commentProvider = {
  provide: 'COMMENT_MODEL',
  useFactory: (connection: mongoose.Connection) =>
    connection.model('Comments', Comment),
  inject: ['DATABASE_CONNECTION'],
};

export const reactionProvider = {
  provide: 'REACTION_MODEL',
  useFactory: (connection: mongoose.Connection) =>
    connection.model('Reactions', Reaction),
  inject: ['DATABASE_CONNECTION'],
};

export const conservationProvider = {
  provide: 'CONSERVATION_MODEL',
  useFactory: (connection: mongoose.Connection) =>
    connection.model('Conservations', Conservation),
  inject: ['DATABASE_CONNECTION'],
};

export const messageProvider = {
  provide: 'MESSAGE_MODEL',
  useFactory: (connection: mongoose.Connection) =>
    connection.model('Messages', Message),
  inject: ['DATABASE_CONNECTION'],
};

export const friendRequestProvider = {
  provide: 'FRIEND_REQUEST_MODEL',
  useFactory: (connection: mongoose.Connection) =>
    connection.model('FriendRequests', FriendRequest),
  inject: ['DATABASE_CONNECTION'],
};

export const userProvider = {
  provide: 'USER_MODEL',
  useFactory: (connection: mongoose.Connection) =>
    connection.model('Users', User),
  inject: ['DATABASE_CONNECTION'],
};

export const otpProvider = {
  provide: 'OTP_MODEL',
  useFactory: (connection: mongoose.Connection) =>
    connection.model('OTPs', OTP),
  inject: ['DATABASE_CONNECTION'],
};

export const friendListProvider = {
  provide: 'FRIEND_LIST_MODEL',
  useFactory: (connection: mongoose.Connection) =>
    connection.model('FriendLists', FriendList),
  inject: ['DATABASE_CONNECTION'],
};

export const notificationProvider = {
  provide: 'NOTIFICATION_MODEL',
  useFactory: (connection: mongoose.Connection) =>
    connection.model('Notifications', Notification),
  inject: ['DATABASE_CONNECTION'],
};

export const roomProvider = {
  provide: 'ROOM_MODEL',
  useFactory: (connection: mongoose.Connection) =>
    connection.model('Rooms', Room),
  inject: ['DATABASE_CONNECTION'],
};

// export const storyProvider = {
//   provide: 'STORY_MODEL',
//   useFactory: (connection: mongoose.Connection) =>
//     connection.model('Stories', Story),
//   inject: ['DATABASE_CONNECTION'],
// };

import { Avatar, Container, Link, Spacer, Text } from "@nextui-org/react";
import { FC } from "react";
import { IUser } from "../../store/interface/user.interface";

interface ChatItemProps {
  user: IUser;
  key: number;
}

const ChatItem: FC<ChatItemProps> = ({ user, key }) => {
  return (
    <>
      <Link
        key={key}
        block
        css={{
          display: 'flex',
          width: "100%",
          justifyContent: "flex-start",
          margin: 0,
          padding: "3px 5px",
          gap: 10,
          alignItems: "center",
          cursor: "pointer",
        }}
        className="chat-items"
      >
        <div style={{ position: "relative"}}>
          <Avatar pointer bordered color="primary" src={user?.avatar || '/images/default_avt.jpg'} />
          {/* {user.isOnline && (
            <span
              style={{
                position: 'absolute',
                width: 10,
                height: 10,
                backgroundColor: "green",
                zIndex: 100,
                borderRadius: '100%',
                right: 0,
                bottom: 3
              }}
            ></span>
          )} */}
        </div>
        <Text h5>{user.fullname}</Text>
      </Link>
    </>
  );
};

export default ChatItem;

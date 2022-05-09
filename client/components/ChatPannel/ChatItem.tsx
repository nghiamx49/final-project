import { Avatar, Container, Link, Spacer, Text } from "@nextui-org/react";
import { FC, SyntheticEvent, useContext } from "react";
import { ChatWidgetContext } from "../../hocs/ChatWidgetContext";
import { IUser } from "../../store/interface/user.interface";

interface ChatItemProps {
  user: IUser;
}

const ChatItem: FC<ChatItemProps> = ({ user }) => {
  const {setOpen, setFriend} = useContext(ChatWidgetContext);

  const onItemClick = () => {
    setFriend && setFriend(user);
    setOpen && setOpen(true);
  }

  return (
    <>
      <Link
        onClick={onItemClick}
        block
        css={{
          display: "flex",
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
        <div style={{ position: "relative" }}>
          <Avatar
            pointer
            bordered
            color="gradient"
            src={user?.avatar || "/images/default_avt.jpg"}
          />
          {user.isOnline ? (
            <span
              style={{
                position: "absolute",
                width: 12,
                height: 12,
                backgroundColor: "#17c964",
                zIndex: 100,
                borderRadius: "100%",
                right: 0,
                bottom: 3,
                border: "1px solid gray",
              }}
            ></span>
          ) : (
            <span
              style={{
                position: "absolute",
                width: 12,
                height: 12,
                backgroundColor: "gray",
                zIndex: 100,
                borderRadius: "100%",
                right: 0,
                bottom: 3,
                border: "1px solid gray",
              }}
            ></span>
          )}
        </div>
        <Text h5>{user.fullname}</Text>
      </Link>
    </>
  );
};

export default ChatItem;

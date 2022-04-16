import { Avatar, Container, Spacer, Text } from "@nextui-org/react";
import { FC } from "react";

interface ChatItemProps {
  user: {
    fullname: string;
    avatar: string;
    isOnline: boolean;
  };
  key: number;
}

const ChatItem: FC<ChatItemProps> = ({ user, key }) => {
  return (
    <>
      <Container
        fluid
        key={key}
        display="flex"
        css={{
          width: "fit-content",
          justifyContent: "flex-start",
          margin: 0,
          padding: 0,
          gap: 10,
          alignItems: "center",
          cursor: "pointer",
        }}
      >
        <div style={{ position: "relative" }}>
          <Avatar bordered color="secondary" src={user.avatar} />
          {user.isOnline && (
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
          )}
        </div>
        <Text h5>{user.fullname}</Text>
      </Container>
      <Spacer y={1} />
    </>
  );
};

export default ChatItem;

import { Container, Avatar, Text, Tooltip } from "@nextui-org/react";
import { FC, Ref, useEffect, useRef } from "react";
import { IUser } from "../../store/interface/user.interface"
import { IMessage } from "../../type/message.interface";
import dayjs from "dayjs";

interface Props {
    currentUser: IUser;
    message: IMessage;
}

export const MessageItem: FC<Props> = ({currentUser, message}) => {
    const messageRef = useRef<HTMLParagraphElement>(null);
    useEffect(() => {
      messageRef.current?.scrollIntoView({
        behavior: 'auto',
      });
    }, []);
    return currentUser._id === message.sender._id ? (
      <>
        <Container
          css={{
            margin: 0,
            padding: "0 10px",
            display: "flex",
            justifyContent: "flex-end",
            gap: 5,
            alignItems: "flex-end",
            flexWrap: "nowrap",
            height: 'fit-content'
          }}
        >
          <Tooltip
            placement="left"
            css={{ marginTop: -80 }}
            content={
              <Text small>{dayjs(message.createdAt).format("hh:mm, DD/MM/YYYY")}</Text>
            }
          >
            <Text
              ref={messageRef}
              css={{
                backgroundColor: "$primary",
                borderRadius: "$sm",
                padding: "0 7px",
                maxWidth: 250,
              }}
            >
              {message.content}
            </Text>
          </Tooltip>
          <Avatar
            size="sm"
            src={currentUser?.avatar || "/images/default_avt.jpg"}
          />
        </Container>
      </>
    ) : (
      <>
        <Container
          css={{
            margin: 0,
            padding: "0 10px",
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "flex-end",
            gap: 5,
          }}
        >
          <Avatar
            size="sm"
            src={message.sender?.avatar || "/images/default_avt.jpg"}
          />
          <Tooltip
            css={{ marginTop: -80 }}
            placement="right"
            content={
              <Text small>{dayjs(message.createdAt).format("hh:mm, DD/MM/YYYY")}</Text>
            }
          >
            <Text
              ref={messageRef}
              css={{
                backgroundColor: "$gray700",
                borderRadius: "$sm",
                padding: "0 7px",
                maxWidth: 250,
              }}
            >
              {message.content}
            </Text>
          </Tooltip>
        </Container>
      </>
    );
}
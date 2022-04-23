import {
  Avatar,
  Card,
  Container,
  Divider,
  Input,
  Tooltip,
  Text,
  FormElement,
  Button,
} from "@nextui-org/react";
import { BaseEmoji, NimblePicker } from "emoji-mart";
import { FaVideo, FaSmile } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import SendIcon from "../reactions/SendIcon";
import { SendButton } from "../SendButton";
import data from "emoji-mart/data/facebook.json";
import { IUser } from "../../store/interface/user.interface";
import { connect } from "react-redux";
import { IRootState } from "../../store/interface/root.interface";
import { IAuthenciateState } from "../../store/interface/authenticate.interface";
import {
  ChangeEvent,
  FC,
  KeyboardEvent,
  SyntheticEvent,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { ChatWidgetContext } from "../../hocs/ChatWidgetContext";
import { IMessage, ISendMessage } from "../../type/message.interface";
import { getSingleConservation, sendMessage } from "../../axiosClient/chat.api";
import { MessageItem } from "./MessageItem";
import {SocketContext } from "../../hocs/socketContext";

interface Props {
  authenticateReducer: IAuthenciateState;
}

const ChatWidget: FC<Props> = ({ authenticateReducer }) => {
  const { open, setOpen, friend, setFriend } = useContext(ChatWidgetContext);


  const { user, token } = authenticateReducer;

  const [messages, setMessages] = useState<IMessage[]>([]);

  const [content, setContent] = useState<string>("");
  const socket = useContext(SocketContext);
  const buttonRef = useRef<HTMLButtonElement | null>(null);

  const [conservationId, setConservationId] = useState<string>("");

  const onChange = (e: ChangeEvent<FormElement>) => {
    setContent(e.target.value);
  };

  const loadConservation = useCallback(async () => {
    if (friend) {
      const { data, status } = await getSingleConservation(
        user._id,
        friend?._id,
        token
      );
      if (status === 200) {
        setMessages(data?.data?.messages);
        setConservationId(data.data._id);
      }
    }
  }, [token, user, friend]);

  useEffect(() => {
    loadConservation();
  }, [loadConservation]);

  const sound = new Audio("/sounds/message.mp3");

  useEffect(() => {
    socket.on("receive-message", (data: IMessage) => {
      const checkExised = messages.findIndex(
        (message) => message._id === data._id
      );
      if (checkExised < 0) {
        setFriend && setFriend(data.sender);
        setOpen && setOpen(true);
        buttonRef.current?.click();   
        setMessages((prev) => [...prev, data]);
      }
    });
  }, []);

  const sendNewMessage = async () => {
    const message: ISendMessage = {
      senderId: user._id,
      receiverId: friend?._id,
      content: content,
      conservationId: conservationId,
    };
    const { data, status } = await sendMessage(message, token);
    if (status === 201) {
      setMessages((prev) => [...prev, data.data]);
      setContent("");
    }
  };

  const onEnter = async (e: KeyboardEvent<FormElement>) => {
    if (e.key === "Enter" && content?.length > 0) {
      await sendNewMessage();
    }
  };

  const handleSubmitMessage = async (e: SyntheticEvent) => {
    e.preventDefault();
    await sendNewMessage();
  };

  const onEmojiClick = (emojiObject: BaseEmoji) => {
    setContent(content + emojiObject.native);
  };

  return (
    <Container
      css={{
        position: "fixed",
        bottom: 0,
        right: 100,
        width: 350,
        height: 450,
        background: "transparent",
        zIndex: 999,
        padding: 0,
        display: open ? "block" : "none",
      }}
    >
      <button ref={buttonRef} onClick={() => sound.play()} style={{ display: "none" }}></button>
      <Card
        css={{
          height: "100%",
          boxShadow: "none",
          borderBottomLeftRadius: "none",
          padding: 0,
          margin: 0,
        }}
      >
        <Card.Header
          css={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            cursor: "pointer",
          }}
        >
          <Container
            css={{
              margin: 0,
              padding: 0,
              display: "flex",
              alignItems: "center",
              gap: 5,
              width: "fit-content",
            }}
          >
            <Avatar
              size="sm"
              src={friend?.avatar || "/images/default_avt.jpg"}
            />
            <Text size={16} b>
              {friend?.fullname}
            </Text>
          </Container>
          <Container css={{ padding: 0, margin: 0, width: "fit-content" }}>
            <FaVideo size={25} color="#0070F3" />
            <IoMdClose
              size={25}
              color="#0070F3"
              onClick={() => setOpen && setOpen(false)}
            />
          </Container>
        </Card.Header>
        <Divider />
        <Card.Body
          css={{
            height: "100%",
            overflow: "auto",
            padding: "10px 0",
            justifyContent: 'flex-end'
          }}
        >
          <Container
            fluid
            css={{
              margin: "0",
              height: 'fit-content',
              maxHeight: "100%",
              overflow: "auto",
              padding: 0,
              display: "flex",
              gap: 15,
              alignItems: "flex-end",
              flexWrap: "wrap",
            }}
          >
            {messages?.map((message) => (
              <MessageItem
                key={message._id}
                message={message}
                currentUser={user}
              />
            ))}
          </Container>
        </Card.Body>
        <Card.Footer css={{ padding: "10px 2px" }}>
          <Input
            animated={false}
            width="100%"
            bordered
            borderWeight="normal"
            color="primary"
            value={content}
            onChange={onChange}
            onKeyPress={onEnter}
            aria-labelledby="message"
            //onFocus={() => setPickerShow(false)}
            placeholder="Message..."
            contentRightStyling={false}
            contentRight={
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  position: "relative",
                }}
              >
                <Tooltip
                  placement="topEnd"
                  hideArrow
                  css={{
                    width: "fit-content",
                    marginTop: -80,
                    padding: 0,
                  }}
                  content={
                    <NimblePicker
                      onSelect={onEmojiClick}
                      set="facebook"
                      data={data}
                      showPreview={false}
                      style={{
                        padding: 0,
                        margin: 0,
                      }}
                    />
                  }
                >
                  <FaSmile cursor={"pointer"} size={20} color="#F5A263" />
                </Tooltip>
                <SendButton
                  onClick={handleSubmitMessage}
                  disabled={!content.length}
                >
                  <SendIcon />
                </SendButton>
              </div>
            }
          />
        </Card.Footer>
      </Card>
    </Container>
  );
};

const mapStateToProps = (state: IRootState) => {
  return {
    authenticateReducer: state.authenticateReducer,
  };
};

export default connect(mapStateToProps)(ChatWidget);

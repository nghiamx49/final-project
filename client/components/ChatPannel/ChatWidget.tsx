import {
  Avatar,
  Card,
  Container,
  Divider,
  Input,
  Tooltip,
  Text,
  FormElement,
  useTheme,
  Grid,
  Image,
} from "@nextui-org/react";
import { BaseEmoji, NimblePicker } from "emoji-mart";
import { FaVideo, FaSmile, FaImages } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import SendIcon from "../reactions/SendIcon";
import { SendButton } from "../SendButton";
import data from "emoji-mart/data/facebook.json";
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
import {
  getSingleConservation,
  markConservationasRead,
  sendMessage,
} from "../../axiosClient/chat.api";
import { MessageItem } from "./MessageItem";
import { ISocketContext, SocketContext } from "../../hocs/socketContext";
import { AiFillCloseCircle } from "react-icons/ai";
import { uploader } from "../../axiosClient/cloudinary.api";

interface Props {
  authenticateReducer: IAuthenciateState;
}

const ChatWidget: FC<Props> = ({ authenticateReducer }) => {
  const { open, setOpen, friend, setFriend } = useContext(ChatWidgetContext);
  const {callFriends} = useContext(SocketContext) as ISocketContext;
  const { user, token } = authenticateReducer;

  const [messages, setMessages] = useState<IMessage[]>([]);

  const [content, setContent] = useState<string>("");
  const {socket} = useContext(SocketContext) as ISocketContext;
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const [files, setFiles] = useState<any>([]);
  const [previewList, setPreviewList] = useState<string[]>([]);

  const [conservationId, setConservationId] = useState<string>("");

  const [isRead, setIsRead] = useState<boolean>(false);

  const onChange = (e: ChangeEvent<FormElement>) => {
    setContent(e.target.value);
  };

  const onFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const arrayFiles = e.target?.files && Array.from(e.target.files);
    e.target?.files && setFiles([...files, ...Array.from(e.target.files)]);
    const previewFileLists = arrayFiles?.map((item) =>
      URL.createObjectURL(item)
    );
    previewFileLists && setPreviewList([...previewList, ...previewFileLists]);
  };

  const clearFiles = () => {
    setFiles([]);
    setPreviewList([]);
  };

  const { isDark } = useTheme();

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

  const markAsRead = async () => {
    conservationId &&
      !isRead &&
      (await markConservationasRead(token, conservationId));
      socket.emit('conservation-read')
  };

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
    if (files.length > 0) {
      const result = files.map(async (file: any) => {
        const uploadFormData = new FormData();
        uploadFormData.append("file", file);
        uploadFormData.append("api_key", "981384291441175");
        uploadFormData.append("upload_preset", "kck9kpuk");
        const { data, status } = await uploader(uploadFormData);
        if (status === 200) {
          return { mediaType: "image", mediaUrl: data.url };
        }
      });
      const contentFromCloud = await Promise.all(result);
      const message: ISendMessage = {
        senderId: user._id,
        receiverId: friend?._id,
        content: content,
        conservationId: conservationId,
        contentMedia: contentFromCloud,
      };
      const { data, status } = await sendMessage(message, token);
      if (status === 201) {
        setMessages((prev) => [...prev, data.data]);
        setContent("");
        setFiles([]);
        setPreviewList([]);
        socket.emit("conservation-read");
      }
    } else {
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
        setFiles([]);
        setPreviewList([]);
        socket.emit("conservation-read");
      }
    }
  };

  const onEnter = async (e: KeyboardEvent<FormElement>) => {
    if (e.key === "Enter" && (content?.length > 0 || files.length > 0)) {
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
      <button
        ref={buttonRef}
        onClick={() => sound.play()}
        style={{ display: "none" }}
      ></button>
      <Card
        css={{
          height: "100%",
          borderBottomLeftRadius: "none",
          padding: 0,
          margin: 0,
          boxShadow: "$sm",
          border: isDark ? "1px solid $gray700" : "1px solid $gray100",
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
            <FaVideo
              size={25}
              color="#0070F3"
              cursor="pointer"
              onClick={() => callFriends(friend?._id)}
            />
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
            justifyContent: "flex-end",
          }}
        >
          <Container
            fluid
            css={{
              margin: "0",
              height: "fit-content",
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
        <Card.Footer
          css={{
            padding: "5",
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
            height: files.length > 0 ? "100%" : "auto",
            justifyContent: "flex-end",
          }}
        >
          {files.length > 0 && (
            <Card
              css={{
                position: "relative",
                height: "max-content",
                padding: 0,
                margin: 0,
              }}
              cover
            >
              <Card.Header
                css={{
                  position: "absolute",
                  zIndex: 10,
                  top: 0,
                  right: 0,
                  width: "fit-content",
                }}
              >
                <AiFillCloseCircle
                  onClick={clearFiles}
                  color="#444"
                  size={30}
                  cursor="pointer"
                />
              </Card.Header>
              <Card.Body
                css={{
                  overflow: "hidden",
                  height: "fit-content",
                  paddingRight: 10,
                }}
              >
                <Grid.Container
                  className="custom-scroll"
                  gap={1}
                  css={{
                    height: "100%",
                    margin: 0,
                  }}
                >
                  {previewList.map((previewImage, index) => (
                    <Grid key={index} xs={4} css={{ height: "fit-content" }}>
                      <Image
                        width={100}
                        height={100}
                        objectFit="cover"
                        src={previewImage}
                      />
                    </Grid>
                  ))}
                </Grid.Container>
              </Card.Body>
            </Card>
          )}
          <Input
            animated={false}
            width="100%"
            bordered
            borderWeight="light"
            color="primary"
            value={content}
            onChange={onChange}
            onFocus={markAsRead}
            onKeyPress={onEnter}
            aria-labelledby="message"
            //onFocus={() => setPickerShow(false)}
            placeholder="Message..."
            contentRightStyling={false}
            contentLeftStyling={false}
            contentLeft={
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  marginLeft: 10,
                }}
              >
                <input
                  id="messages"
                  type="file"
                  multiple={true}
                  onChange={onFileChange}
                  accept=".jpeg,.png,.jpg"
                  style={{ display: "none" }}
                />
                <label htmlFor="messages" style={{ cursor: "pointer" }}>
                  <FaImages color="#666666" size={30} />
                </label>
              </div>
            }
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
                  disabled={!content.length && !files.length}
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

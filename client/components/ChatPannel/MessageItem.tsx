import { Container, Avatar, Text, Tooltip, Card, Modal} from "@nextui-org/react";
import { FC, Ref, useEffect, useRef, useState } from "react";
import { IUser } from "../../store/interface/user.interface"
import { IMessage } from "../../type/message.interface";
import dayjs from "dayjs";
import Image from 'next/image';
import { FaChevronCircleLeft, FaChevronCircleRight } from "react-icons/fa";

interface Props {
    currentUser: IUser;
    message: IMessage;
}

export const MessageItem: FC<Props> = ({currentUser, message}) => {
    const messageRef = useRef<HTMLParagraphElement>(null);
    const {contentMedia} = message;
    const [currentMedia, setCurrentMedia] = useState<number>(0);
    const onNext = () => {
      setCurrentMedia(
        currentMedia === contentMedia.length - 1 ? 0 : currentMedia + 1
      );
    };
    const [imageDetailOpen, setImageDetailOpen] = useState<boolean>(false);

    const imageOpen = () => setImageDetailOpen(true);
    const imageClose = () => setImageDetailOpen(false);

    const onPrev = () => {
      setCurrentMedia(
        currentMedia === 0 ? contentMedia.length - 1 : currentMedia - 1
      );
    };
    useEffect(() => {
      messageRef.current?.scrollIntoView({
        behavior: 'auto',
      });
    }, []);
    return (
      <>
        {currentUser._id === message.sender._id ? (
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
                height: "fit-content",
              }}
            >
              <Tooltip
                placement="left"
                css={{ marginTop: -80 }}
                content={
                  <Text small>
                    {dayjs(message.createdAt).format("hh:mm, DD/MM/YYYY")}
                  </Text>
                }
              >
                <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'flex-start'}}>
                  {contentMedia?.length > 0 && (
                    <div style={{ position: "relative" }}>
                      <Image
                        onClick={imageOpen}
                        className="message-image"
                        width={150}
                        height={100}
                        src={contentMedia[currentMedia].mediaUrl}
                      />
                      {contentMedia?.length > 2 && (
                        <div
                          onClick={imageOpen}
                          style={{
                            position: "absolute",
                            backgroundColor: "rgba(33, 33, 33, 0.7)",
                            width: "100%",
                            height: "100%",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            top: 0,
                            left: 0,
                            cursor: "pointer",
                          }}
                        >
                          <Text h1>+{contentMedia.length - 1}</Text>
                        </div>
                      )}
                    </div>
                  )}
                  <Text
                    ref={messageRef}
                    css={{
                      backgroundColor: "$gray700",
                      borderRadius: "$sm",
                      padding: "0 7px",
                      maxWidth: 250,
                      color: "white",
                      width: "fit-content",
                      marginRight: 0,
                      marginLeft: 'auto',
                    }}
                  >
                    {message.content}
                  </Text>
                </div>
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
                  <Text small>
                    {dayjs(message.createdAt).format("hh:mm, DD/MM/YYYY")}
                  </Text>
                }
              >
                <div>
                  {contentMedia?.length > 0 && (
                    <div style={{ position: "relative" }}>
                      <Image
                        onClick={imageOpen}
                        className="message-image"
                        width={150}
                        height={100}
                        src={contentMedia[currentMedia].mediaUrl}
                      />
                      {contentMedia?.length > 2 && (
                        <div
                          onClick={imageOpen}
                          style={{
                            position: "absolute",
                            backgroundColor: "rgba(33, 33, 33, 0.7)",
                            width: "100%",
                            height: "100%",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            top: 0,
                            left: 0,
                            cursor: "pointer",
                          }}
                        >
                          <Text h1>+{contentMedia.length - 1}</Text>
                        </div>
                      )}
                    </div>
                  )}
                  <Text
                    ref={messageRef}
                    css={{
                      backgroundColor: "$gray700",
                      borderRadius: "$sm",
                      padding: "0 7px",
                      maxWidth: 250,
                      color: "white",
                      width: "fit-content",
                    }}
                  >
                    {message.content}
                  </Text>
                </div>
              </Tooltip>
            </Container>
          </>
        )}
        {contentMedia.length > 0 && (
          <Modal
            blur
            width="1280px"
            open={imageDetailOpen}
            onClose={imageClose}
          >
            <Modal.Body css={{ padding: 0 }}>
              <Card>
                <Card.Body css={{ padding: "0 12px" }}>
                  <div style={{ position: "relative" }}>
                    {contentMedia.length > 1 && (
                      <Container
                        style={{
                          width: "100%",
                          display: "flex",
                          justifyContent: "space-between",
                          position: "absolute",
                          zIndex: 100,
                          top: "50%",
                          margin: 0,
                          padding: 0,
                        }}
                      >
                        <FaChevronCircleLeft
                          size={20}
                          color="#444"
                          cursor="pointer"
                          onClick={onPrev}
                        />
                        <FaChevronCircleRight
                          size={20}
                          color="#444"
                          cursor="pointer"
                          onClick={onNext}
                        />
                      </Container>
                    )}
                    <Card.Image
                      onClick={imageOpen}
                      css={{
                        zIndex: 1,
                        cursor: "pointer",
                        padding: "0 12px",
                      }}
                      width="100%"
                      height={700}
                      objectFit="contain"
                      src={contentMedia[currentMedia].mediaUrl}
                    />
                  </div>
                </Card.Body>
              </Card>
            </Modal.Body>
          </Modal>
        )}
      </>
    ); 
}
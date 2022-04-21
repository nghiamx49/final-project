import { FC, SyntheticEvent, useState } from "react";
import { IComment } from "../interface/comment.interface";
import { Grid, Spacer, Text, Avatar, Container, Row, useTheme } from "@nextui-org/react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { IUser } from "../store/interface/user.interface";
import CommentBox from "./CommentBox";
import { FaShare } from "react-icons/fa";
interface Props {
  comment: IComment;
  currentUser: IUser;
  postId: string;
  token: string;
}

const CommentItem: FC<Props> = ({ comment, currentUser, postId, token }) => {
    dayjs.extend(relativeTime);
    const [showAll, setShowAll] = useState<boolean>(false);

    const [showReplyBox, setShowReplyBox] = useState<boolean>(false);

    const [replies, setReplies] = useState<IComment[]>(comment.replies)

    const toggle = () => setShowAll(prevState => !prevState);

    const toggleReply = () => setShowReplyBox(prevState => !prevState);
    const {isDark} = useTheme();
  return (
    <>
      <Spacer y={0.2} />
      <Container css={{ margin: 0, padding: 0 }} fluid>
        <Row>
          <Grid.Container gap={2}>
            <Grid xs={1}>
              <Avatar
                bordered
                color="primary"
                src={comment.author.avatar || "/images/default_avt.jpg"}
              />
            </Grid>
            <Grid
              xs={11}
              css={{
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Container
                css={{
                  backgroundColor: isDark ? "$gray700" : "$gray300",
                  padding: "5px 3px",
                  width: "fit-content",
                  margin: 0,
                  borderRadius: 10,
                }}
              >
                <Text b>{comment.author.fullname}</Text>
                <Text>{comment.content}</Text>
              </Container>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <Text
                  as="button"
                  css={{
                    cursor: "pointer",
                    backgroundColor: "transparent",
                    border: "none",
                    outline: "none",
                    fontWeight: "bold",
                  }}
                  size={16}
                  color="$gray500"
                  onClick={toggleReply}
                >
                  Reply
                </Text>
                <Text size={12} color="$gray500">
                  {dayjs(comment.createdAt).fromNow()}
                </Text>
              </div>
            </Grid>
          </Grid.Container>
        </Row>
        {comment.replies.length > 2 && (
          <Row
            css={{
              paddingLeft: 50,
              display: "flex",
              justifyContent: "flex-start",
            }}
          >
            <Text css={{ cursor: "pointer" }} onClick={toggle}>
              <FaShare size={10} /> {showAll ? "Hidden" : "All Replies"}
            </Text>
          </Row>
        )}
        {showAll
          ? replies.map((item) => (
              <Row css={{ paddingLeft: 50 }}>
                <Grid.Container gap={2}>
                  <Grid xs={1}>
                    <Avatar
                      bordered
                      color="primary"
                      src={item.author.avatar || "/images/default_avt.jpg"}
                    />
                  </Grid>
                  <Grid
                    xs={11}
                    css={{
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <Container
                      css={{
                        backgroundColor: isDark ? "$gray700" : "$gray300",
                        padding: "5px 3px",
                        width: "fit-content",
                        margin: 0,
                        borderRadius: 10,
                      }}
                    >
                      <Text b>{item.author.fullname}</Text>
                      <Text>{item.content}</Text>
                    </Container>
                    <div
                      style={{ display: "flex", alignItems: "center", gap: 10 }}
                    >
                      <Text size={12} color="$gray500">
                        {dayjs(item.createdAt).fromNow()}
                      </Text>
                    </div>
                  </Grid>
                </Grid.Container>
              </Row>
            ))
          : replies.slice(-1).map((item) => (
              <Row css={{ paddingLeft: 50 }}>
                <Grid.Container gap={2}>
                  <Grid xs={1}>
                    <Avatar
                      bordered
                      color="primary"
                      src={item.author.avatar || "/images/default_avt.jpg"}
                    />
                  </Grid>
                  <Grid
                    xs={11}
                    css={{ display: "flex", flexDirection: "column" }}
                  >
                    <Container
                      css={{
                        backgroundColor: isDark ? "$gray700" : "$gray300",
                        padding: "5px 3px",
                        width: "fit-content",
                        margin: 0,
                        borderRadius: 10,
                      }}
                    >
                      <Text b>{item.author.fullname}</Text>
                      <Text>{item.content}</Text>
                    </Container>
                    <div
                      style={{ display: "flex", alignItems: "center", gap: 10 }}
                    >
                      <Text size={12} color="$gray500">
                        {dayjs(item.createdAt).fromNow()}
                      </Text>
                    </div>
                  </Grid>
                </Grid.Container>
              </Row>
            ))}
        {showReplyBox && (
          <Row css={{ paddingLeft: 50 }}>
            <CommentBox
              currentUser={currentUser}
              postId={postId}
              token={token}
              setCommentList={setReplies}
              commentId={comment._id}
              type="reply"
            />
          </Row>
        )}
      </Container>
    </>
  );
};

export default CommentItem;

import { FC, SyntheticEvent, useState } from "react";
import { IComment } from "../interface/comment.interface";
import { Grid, Spacer, Text, Avatar, Container, Row, useTheme } from "@nextui-org/react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { IUser } from "../store/interface/user.interface";
import CommentBox from "./CommentBox";
import { FaShare } from "react-icons/fa";
import Link from "next/link";
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
              <Link
                href={`/profile/${
                  comment.author?.username || comment.author?._id
                }`}
              >
                <Avatar
                  bordered
                  color="primary"
                  src={comment.author.avatar || "/images/default_avt.jpg"}
                  css={{ cursor: "pointer" }}
                />
              </Link>
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
                <Link
                  href={`/profile/${
                    comment.author?.username || comment.author?._id
                  }`}
                >
                  <Text b css={{ cursor: "pointer" }}>
                    {comment.author.fullname}
                  </Text>
                </Link>
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
            <Text css={{ cursor: "pointer" }} onClick={toggle} b>
              <FaShare size={10} /> {showAll ? "Hidden" : "All Replies"}
            </Text>
          </Row>
        )}
        {showAll
          ? replies.map((item, index) => (
              <Row key={index} css={{ paddingLeft: 50 }}>
                <Grid.Container gap={1}>
                  <Grid xs={1}>
                    <Link
                      href={`/profile/${
                        item.author?.username || item.author?._id
                      }`}
                    >
                      <Avatar
                        bordered
                        color="primary"
                        src={item.author.avatar || "/images/default_avt.jpg"}
                      />
                    </Link>
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
                      <Link
                        href={`/profile/${
                          item.author?.username || item.author?._id
                        }`}
                      >
                        <Text b>{item.author.fullname}</Text>
                      </Link>

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
          : replies.slice(-1).map((item, index) => (
              <Row key={index} css={{ paddingLeft: 50 }}>
                <Grid.Container gap={1}>
                  <Grid xs={1}>
                    <Link
                      href={`/profile/${
                        item.author?.username || item.author?._id
                      }`}
                    >
                      <Avatar
                        css={{ cursor: "pointer" }}
                        bordered
                        color="primary"
                        src={item.author.avatar || "/images/default_avt.jpg"}
                      />
                    </Link>
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
                      <Link
                        href={`/profile/${
                          item.author?.username || item.author?._id
                        }`}
                      >
                        <Text css={{ cursor: "pointer" }} b>
                          {item.author.fullname}
                        </Text>
                      </Link>

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

import {
  Card,
  Grid,
  Row,
  Spacer,
  Text,
  Divider,
  Button,
  Avatar,
  useTheme,
  Tooltip,

} from "@nextui-org/react";
import { FC, useState } from "react";
import { IoMdChatboxes, IoMdShareAlt } from "react-icons/io";
import { IFeed } from "../interface/feedItem.interface";
import { IUser } from "../store/interface/user.interface";
import LikeIcon from "./reactions/LikeIcon";
import ReactionPicker from "./reactions/ReactionPicker";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

import { IComment } from "../interface/comment.interface";
import { ReactionType } from "../interface/reactionType.enum";
import CommentItem from "./CommentItem";
import CommentBox from "./CommentBox";

interface FeedProps {
  item: IFeed;
  currentUser: IUser;
  token: string;
}

const FeedItem: FC<FeedProps> = ({ item, currentUser, token }) => {
  const { isDark } = useTheme();
  dayjs.extend(relativeTime);

  const { _id, author, content, contentMedia, comments, reactions, createdAt } =
    item;
  const [commentList, setCommentList] = useState<IComment[]>(comments);
  const [reactionType, setReactionType] = useState<string>(ReactionType.LIKE);
  const [showAllComment, setShowAllComment] = useState<boolean>(false);

  const [showComment, setShowComment] = useState<boolean>(false);
 
  const toggleShowAllComments = () => setShowAllComment(prevState => !prevState);

  const toggleCommentPanel = () => setShowComment(prev => !prev);

  return (
    <>
      <Row key={_id} css={{ position: "relative" }}>
        <Card css={isDark ? { backgroundColor: "#1F1F1E" } : {}}>
          <Card.Header css={{ position: "relative", zIndex: 0 }}>
            <Grid.Container>
              <Grid css={{ display: "flex", alignItems: "center", gap: 10 }}>
                <Avatar
                  bordered
                  color="gradient"
                  src={author.avatar || "/images/default_avt.jpg"}
                />
                <div>
                  <Text h5>{author.fullname}</Text>
                  <Text weight="semibold" size={12} css={{ color: "$gray600" }}>
                    {dayjs(createdAt).fromNow()}
                  </Text>
                </div>
              </Grid>
            </Grid.Container>
          </Card.Header>
          <Divider />
          <Card.Body css={{ position: "relative", zIndex: 0 }}>
            <Text>{content}</Text>
            <Spacer y={1} />
            {contentMedia?.length > 0 &&
              contentMedia.map((media) => (
                <Card.Image width="100%" height="100%" src={media.mediaUrl} />
              ))}
            <Row align="center">
              {reactions.length > 0 && (
                <>
                  <LikeIcon size="20" />
                  <Spacer x={0.2} />
                  <Text>
                    {/* {reactions.findIndex(
                    (reaction) => reaction.reactionBy._id === currentUser._id
                  ) > -1} */}
                    {reactions.length} reactions
                  </Text>
                </>
              )}
            </Row>
          </Card.Body>
          <Divider />
          <Card.Footer
            css={{
              flexDirection: "column",
              position: "relative",
              height: "fit-content",
            }}
          >
            <Row gap={10} justify="space-around" align="center">
              <Tooltip
                hideArrow
                css={{
                  marginTop: -60,
                  borderRadius: 40,
                  width: "fit-content",
                }}
                placement="top"
                content={<ReactionPicker />}
              >
                <Button light>
                  <LikeIcon size="25" />
                  <Spacer x={0.5} />
                  <Text>Like</Text>
                </Button>
              </Tooltip>
              <Button light onClick={toggleCommentPanel}>
                <IoMdChatboxes size={30} />
                <Spacer x={0.5} />
                <Text>Comment</Text>
              </Button>
              <Button light>
                <IoMdShareAlt size={30} />
                <Spacer x={0.5} />
                <Text>Share</Text>
              </Button>
            </Row>
            <Divider />
            <Spacer y={0.2} />
            {showComment && (
              <>
                <CommentBox
                  currentUser={currentUser}
                  setCommentList={setCommentList}
                  postId={item._id}
                  token={token}
                />
                {showAllComment
                  ? commentList.map((comment) => (
                      <CommentItem
                        currentUser={currentUser}
                        postId={item._id}
                        token={token}
                        comment={comment}
                      />
                    ))
                  : commentList
                      .slice(0, 3)
                      .map((comment) => (
                        <CommentItem
                          currentUser={currentUser}
                          postId={item._id}
                          token={token}
                          comment={comment}
                        />
                      ))}
                {commentList.length > 3 && (
                  <Text
                    css={{ cursor: "pointer" }}
                    onClick={toggleShowAllComments}
                  >
                    {showAllComment ? "Hidden..." : "Show more..."}
                  </Text>
                )}
              </>
            )}
          </Card.Footer>
        </Card>
      </Row>
      <Spacer y={2} />
    </>
  );
};

export default FeedItem;

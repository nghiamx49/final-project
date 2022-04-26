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
  Container,
  Modal,
  Link as LinkStyle
} from "@nextui-org/react";
import { FC, SyntheticEvent, useState } from "react";
import { IoMdChatboxes, IoMdShareAlt, IoMdThumbsUp} from "react-icons/io";
import { IFeed, IMedia } from "../interface/feedItem.interface";
import { IUser } from "../store/interface/user.interface";
import LikeIcon from "./reactions/LikeIcon";
import ReactionPicker from "./reactions/ReactionPicker";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

import { IComment } from "../interface/comment.interface";
import CommentItem from "./CommentItem";
import CommentBox from "./CommentBox";
import UserReaction from "./reactions/UserReaction";
import { IReaction } from "../interface/reaction.interface";
import { reactToPost, removeReaction } from "../axiosClient/feed.api";

import {FaChevronCircleLeft, FaChevronCircleRight} from 'react-icons/fa'
import Link from 'next/link'
import { ReactionType } from "../interface/reactionType.enum";
import LoveIcon from "./reactions/LoveIcon";
import HahaIcon from "./reactions/HahaIcon";
import WowIcon from "./reactions/WowIcon";
import SadIcon from "./reactions/SadIcon";
import AngryIcon from "./reactions/AngryIcon";
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
  const [showAllComment, setShowAllComment] = useState<boolean>(false);
  const [reactionList, setReactionList] = useState<IReaction[]>(reactions);
  const [showComment, setShowComment] = useState<boolean>(false);

  const [currentMedia, setCurrentMedia] = useState<number>(0);

 
  const toggleShowAllComments = () => setShowAllComment(prevState => !prevState);

  const toggleCommentPanel = () => setShowComment(prev => !prev);

  const likePost = async (e: SyntheticEvent) => {
      const {data, status} = await reactToPost(token, item._id, "Like");
      if(status === 201) {
        setReactionList(data.data);
      }
  };
  
  const [imageDetailOpen, setImageDetailOpen] = useState<boolean>(false);

  const imageOpen = () => setImageDetailOpen(true);
  const imageClose = () => setImageDetailOpen(false);

  const onNext = () => {
    setCurrentMedia(
      currentMedia === contentMedia.length - 1 ? 0 : currentMedia + 1
    );
  }

  const onPrev = () => {
      setCurrentMedia(
        currentMedia === 0 ? contentMedia.length - 1 : currentMedia - 1
      );
  }
    const [reactionOpen, setReactionOpen] = useState<boolean>(false);


  const openReactionPanel = () => setReactionOpen(true);
  const closeReactionPanel = () => setReactionOpen(false);
  
  const unreaction = async (
    e: SyntheticEvent,
    reactionId: string
  ) => {
    const { data, status } = await removeReaction(token, item._id, reactionId);
    if (status === 200) {
      setReactionList(data.data);
    }
  };

  const userReactionIndex: number = reactionList.findIndex(
    (item) => item.reactionBy._id === currentUser._id
  );


  const reactionTypeList = (type: string) => {
    return reactionList.filter(reaction => reaction.reactionType === type)
  }

  return (
    <>
      {contentMedia.length > 0 && (
        <Modal blur width="1280px" open={imageDetailOpen} onClose={imageClose}>
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
                    css={{ zIndex: 1, cursor: "pointer", padding: "0 12px" }}
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
      <Row key={_id} css={{ position: "relative" }}>
        <Card css={{ backgroundColor: isDark ? "#1F1F1E" : "" }} cover>
          <Card.Header css={{ position: "relative", zIndex: 0 }}>
            <Grid.Container>
              <Link
                href={`/profile/${author?.username || author?._id}`}
                passHref
              >
                <Grid
                  css={{
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                    cursor: "pointer",
                  }}
                >
                  <Avatar
                    css={{ cursor: "pointer" }}
                    bordered
                    color="gradient"
                    src={author.avatar || "/images/default_avt.jpg"}
                  />
                  <div>
                    <Text h5>{author.fullname}</Text>
                    <Link href={`/post/${item._id}`} passHref>
                      <LinkStyle underline>
                        <Text
                          weight="semibold"
                          size={12}
                          css={{ color: "$gray600" }}
                        >
                          {dayjs(createdAt).fromNow()}
                        </Text>
                      </LinkStyle>
                    </Link>
                  </div>
                </Grid>
              </Link>
            </Grid.Container>
          </Card.Header>
          <Card.Body
            css={{ position: "relative", zIndex: 0, padding: 0, margin: 0 }}
          >
            {content && <Text css={{ padding: 10 }}>{content}</Text>}
            <Spacer y={1} />
            {contentMedia?.length > 0 && (
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
                  css={{ zIndex: 1, cursor: "pointer" }}
                  width="100%"
                  height={500}
                  src={contentMedia[currentMedia].mediaUrl}
                />
                <Spacer y={1} />
              </div>
            )}
            <Row
              align="center"
              justify="space-between"
              css={{ padding: "0 10px 10px" }}
            >
              <Modal
                onClose={closeReactionPanel}
                closeButton
                open={reactionOpen}
              >
                <Modal.Header justify="flex-start">
                  <Text h4>User&apos;s Reactions</Text>
                </Modal.Header>
                <Divider />
                <Modal.Body>
                  <Grid.Container
                    className="custom-scroll"
                    gap={1}
                    alignContent="flex-start"
                    alignItems="flex-start"
                    css={{ height: 500, maxHeight: 400 }}
                  >
                    {reactionList.map((reaction) => (
                      <Grid
                        key={reaction._id}
                        xs={12}
                        justify="space-between"
                        css={{ height: "fit-content" }}
                      >
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 5,
                          }}
                        >
                          <Avatar
                            src={
                              reaction.reactionBy.avatar ||
                              "/images/default_avt.jpg"
                            }
                          />
                          <Text b>{reaction.reactionBy.fullname}</Text>
                        </div>
                        <UserReaction size="30" type={reaction.reactionType} />
                      </Grid>
                    ))}
                  </Grid.Container>
                </Modal.Body>
              </Modal>
              <div
                style={{ display: "flex", cursor: "pointer" }}
                onClick={openReactionPanel}
              >
                {reactionList.length > 0 && (
                  <>
                    <Avatar.Group css={{ marginLeft: 10 }} animated={false}>
                      {reactionTypeList(ReactionType.LIKE).length > 0 && (
                        <Avatar size="xs" icon={<LikeIcon size="20" />} />
                      )}
                      {reactionTypeList(ReactionType.LOVE).length > 0 && (
                        <Avatar size="xs" icon={<LoveIcon size="20" />} />
                      )}
                      {reactionTypeList(ReactionType.HAHA).length > 0 && (
                        <Avatar size="xs" icon={<HahaIcon size="20" />} />
                      )}
                      {reactionTypeList(ReactionType.WOW).length > 0 && (
                        <Avatar size="xs" icon={<WowIcon size="20" />} />
                      )}
                      {reactionTypeList(ReactionType.SAD).length > 0 && (
                        <Avatar size="xs" icon={<SadIcon size="20" />} />
                      )}
                      {reactionTypeList(ReactionType.ANGRY).length > 0 && (
                        <Avatar size="xs" icon={<AngryIcon size="20" />} />
                      )}
                    </Avatar.Group>
                    <Spacer x={0.2} />
                    <Text>
                      {/* {reactions.findIndex(
                    (reaction) => reaction.reactionBy._id === currentUser._id
                  ) > -1} */}
                      {reactionList.length} reactions
                    </Text>
                  </>
                )}
              </div>

              {commentList.length > 0 && (
                <Text css={{ cursor: "pointer" }} onClick={toggleCommentPanel}>
                  {commentList.length} comments
                </Text>
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
                  marginTop: -70,
                  borderRadius: 40,
                  width: "fit-content",
                }}
                enterDelay={1000}
                leaveDelay={1000}
                placement="top"
                content={
                  <ReactionPicker
                    token={token}
                    postId={item._id}
                    reload={setReactionList}
                  />
                }
              >
                {userReactionIndex > -1 ? (
                  <Button
                    light
                    onClick={(e) =>
                      unreaction(e, reactionList[userReactionIndex]._id)
                    }
                  >
                    <UserReaction
                      type={reactionList[userReactionIndex].reactionType}
                      size="25"
                    />
                    <Spacer x={0.5} />

                    <Text>{reactionList[userReactionIndex]?.reactionType}</Text>
                  </Button>
                ) : (
                  <Button light onClick={likePost}>
                    <IoMdThumbsUp size="25" />
                    <Spacer x={0.5} />
                    <Text>Like</Text>
                  </Button>
                )}
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
                  ? commentList.map((comment, index) => (
                      <CommentItem
                        key={index}
                        currentUser={currentUser}
                        postId={item._id}
                        token={token}
                        comment={comment}
                      />
                    ))
                  : commentList
                      .slice(0, 3)
                      .map((comment, index) => (
                        <CommentItem
                          key={index}
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
                    b
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

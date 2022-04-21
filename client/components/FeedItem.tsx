

import { Card, Grid, Row, Spacer, Text, Image, Divider, Button, Input, Avatar, useTheme, Tooltip } from '@nextui-org/react'
import { FC } from 'react';
import { IoMdHeartEmpty, IoMdHeart, IoMdChatboxes, IoMdShareAlt } from "react-icons/io";
import { IFeed } from '../interface/feedItem.interface';
import { IUser } from '../store/interface/user.interface';
import LikeIcon from './reactions/LikeIcon';
import ReactionPicker from './reactions/ReactionPicker';

interface FeedProps {
    item: IFeed
    currentUser: IUser
}

const FeedItem: FC<FeedProps> = ({item, currentUser}) => {
  const { isDark } = useTheme();
  const {_id, author, content, contentMedia, comments, reactions} = item;
    return (
      <>
        <Row key={_id}>
          <Card css={isDark ? { backgroundColor: "#1F1F1E" } : {}}>
            <Card.Header>
              <Grid.Container>
                <Grid css={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <Avatar
                    bordered
                    color="gradient"
                    src={author.avatar || "/images/default_avt.jpg"}
                  />
                  <div>
                    <Text h5>{author.fullname}</Text>
                    <Text
                      weight="semibold"
                      size={12}
                      css={{ color: "$gray600" }}
                    >
                      28/11/2018{" "}
                    </Text>
                  </div>
                </Grid>
              </Grid.Container>
            </Card.Header>
            <Divider />
            <Card.Body>
              <Text>{content}</Text>
              <Spacer y={1} />
              {contentMedia?.length > 0 &&
                contentMedia.map((media) => (
                  <Card.Image width="100%" height="100%" src={media.mediaUrl} />
                ))}
              <Row align="center">
                <LikeIcon size="20" />
                <Spacer x={0.2} />
                <Text>{reactions.length} others</Text>
              </Row>
            </Card.Body>
            <Divider />
            <Card.Footer css={{ flexDirection: "column" }}>
              <Row gap={10} justify="space-around" align="center">
                <Tooltip hideArrow css={{marginTop: -60, borderRadius: 40, width: 'fit-content'}} placement='top' content={<ReactionPicker />}>
                  <Button light>
                    <LikeIcon size="25" />
                    <Spacer x={0.5} />
                    <Text>Reaction</Text>
                  </Button>
                </Tooltip>
                <Button light>
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
              {comments.map((comment) => (
                <>
                  <Spacer y={0.2} />
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
                      css={{ display: "flex", flexDirection: "column" }}
                    >
                      <Text b>{comment.author.fullname}</Text>
                      <Text>{comment.content}</Text>
                    </Grid>
                  </Grid.Container>
                </>
              ))}
              <Spacer y={0.2} />
              <Grid.Container gap={2}>
                <Grid xs={1}>
                  <Avatar
                    bordered
                    color="primary"
                    src={currentUser.avatar || "/images/default_avt.jpg"}
                  />
                </Grid>
                <Grid xs={11}>
                  <Input
                    width="100%"
                    bordered
                    borderWeight="normal"
                    color="primary"
                    aria-labelledby="comment"
                    placeholder="Comment anything"
                  />
                </Grid>
              </Grid.Container>
            </Card.Footer>
          </Card>
        </Row>
        <Spacer y={2} />
      </>
    );
}

export default FeedItem;
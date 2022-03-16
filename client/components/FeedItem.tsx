

import { Card, Grid, Row, Spacer, Text, Image, Divider, Button, Input, Avatar, useTheme } from '@nextui-org/react'
import { FC } from 'react';
import { IoMdHeartEmpty, IoMdHeart, IoMdChatboxes } from "react-icons/io";

interface FeedProps {
    userId?: string | number,
    title: string,
    body: string
}

const FeedItem: FC<FeedProps> = ({userId, title, body}) => {
  const { isDark } = useTheme();
    return (
      <>
        <Row key={userId}>
          <Card css={isDark ? { backgroundColor: "#1F1F1E" } : {}}>
            <Card.Header>
              <Grid.Container>
                <Grid>
                  <Text h3>{title}</Text>
                </Grid>
              </Grid.Container>
            </Card.Header>
            <Divider />
            <Card.Body>
              <Text>{body}</Text>
              <Spacer y={1} />
              <Card.Image
                width="100%"
                height="100%"
                src={"/images/default_avt.jpg"}
              />
              <Row align="center">
                <IoMdHeart size={20} color="red" />
                <Spacer x={0.7} />
                <Text>You and 100 others</Text>
              </Row>
            </Card.Body>
            <Divider />
            <Card.Footer css={{ flexDirection: "column" }}>
              <Row gap={10} justify="space-around" align="center">
                <Button light>
                  <IoMdHeartEmpty size={30} />
                </Button>
                <Button light>
                  <IoMdChatboxes size={30} />
                </Button>
              </Row>
              <Divider />
              <Spacer y={1} />
              <Grid.Container gap={2}>
                <Grid xs={1}>
                  <Avatar
                    bordered
                    color="primary"
                    src="/images/default_avt.jpg"
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
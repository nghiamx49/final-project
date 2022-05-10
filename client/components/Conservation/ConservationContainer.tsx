import { Avatar, Container, Grid, Input, Row, Text, useTheme } from "@nextui-org/react";
import { FC } from "react";
import { FaSearch } from "react-icons/fa";
import { IUser } from "../../store/interface/user.interface";
import { IConservation } from "../../type/conservation.interface";

interface Props {
    conservations: IConservation[];
    currentUser: IUser;
    onClickHandler: Function;
}

const ConservationContainer: FC<Props> = ({
  conservations,
  currentUser,
  onClickHandler,
}) => {
  const { isDark } = useTheme();
  return (
    <Container
      css={{
        boxShadow: "$md",
        backgroundColor: isDark ? "$accents2" : "",
        borderRadius: "$md",
        padding: "0 10px",
        margin: 0,
      }}
    >
      <Row>
        <Text h4 b>
          Conservations
        </Text>
      </Row>
      <Row>
        <Input
          css={{ w: "100%" }}
          contentLeft={<FaSearch size={20} />}
          placeholder="Search conservation"
          aria-labelledby="search in message"
        />
      </Row>
      <Row css={{ marginTop: 10 }}>
        <Container
          fluid
          css={{ margin: 0, padding: 0, maxHeight: 400, overflow: "auto" }}
        >
          {conservations.length > 0 ? conservations.map((conservation) => {
            const friend = conservation.members.filter(
              (user) => user._id !== currentUser._id
            )[0];
            const latestMessage =
              conservation.messages[conservation.messages.length - 1];
            const isRead =
              conservation.readBy.filter(
                (user) => user?._id === currentUser._id
              )?.length > 0;
            return (
              <Row
                onClick={() => onClickHandler(conservation._id, isRead, friend)}
                key={conservation._id}
                css={{ padding: "5 10", marginBottom: 10, cursor: "pointer" }}
              >
                <Grid.Container alignItems="center">
                  <Grid xs={3}>
                    <Avatar
                      size="xl"
                      color="gradient"
                      bordered
                      src={friend.avatar || "/images/default_avt.jpg"}
                    />
                  </Grid>
                  <Grid
                    xs={9}
                    css={{
                      maxWidth: 200,
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <Text size={16} b>
                      {friend.fullname}
                    </Text>
                    <Text
                      css={{
                        color: isRead ? "$gray500" : "$primary",
                        fontWeight: "$bold",
                      }}
                      size={14}
                    >
                      {latestMessage.sender._id === currentUser._id
                        ? "You: "
                        : `${
                            latestMessage.sender.fullname.split(" ")[
                              latestMessage.sender.fullname.split(" ").length -
                                1
                            ]
                          }: `}
                      {latestMessage.content.length > 0
                        ? latestMessage.content
                        : "Sent an image"}
                    </Text>
                  </Grid>
                </Grid.Container>
              </Row>
            );
          }) : <Row justify="center">
            <Text size={18} b css={{color: '$accents7'}}>
              No Conservations Yet
            </Text>
          </Row>}
          
        </Container>
      </Row>
    </Container>
  );
};

export default ConservationContainer;

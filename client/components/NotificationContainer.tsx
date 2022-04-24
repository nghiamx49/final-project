import {
  Avatar,
  Container,
  Grid,
  Input,
  Row,
  Text,
  useTheme,
} from "@nextui-org/react";
import Link from "next/link";
import { FC, MouseEventHandler } from "react";
import { IUser } from "../store/interface/user.interface";
import { INotification } from "../type/notification.interface";

interface Props {
  notifications: INotification[];
  currentUser: IUser;
  handleReadNoti: Function;
}

const NotificationContainer: FC<Props> = ({ notifications, currentUser, handleReadNoti }) => {
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
          Notifications
        </Text>
      </Row>
      <Row css={{ marginTop: 10 }}>
        <Container
          fluid
          css={{ margin: 0, padding: 0, maxHeight: 400, overflow: "auto" }}
        >
          {notifications.length > 0 ? (
            notifications.map((notification) => {
              const isRead =
                notification.readBy.filter(
                  (user) => user?._id === currentUser._id
                )?.length > 0;
              return (
                <Row
                  key={notification._id}
                  css={{ padding: "5 10", marginBottom: 10, cursor: "pointer" }}
                  onClick={() => handleReadNoti(notification._id, isRead, notification.link)}
                >
                  <Grid.Container alignItems="center">
                    <Grid xs={3}>
                      <Avatar
                        size="xl"
                        src={
                          notification.creator.avatar ||
                          "/images/default_avt.jpg"
                        }
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
                      <Text
                        css={{
                          color: isRead ? "$text" : "$primary",
                        }}
                        b
                        size={16}
                      >
                        <Text b>{notification.creator.fullname}</Text>{" "}
                        {notification.description}
                      </Text>
                    </Grid>
                  </Grid.Container>
                </Row>
              );
            })
          ) : (
            <Row justify="center">
              <Text size={18} b css={{ color: "$accents7" }}>
                No Notifications Yet
              </Text>
            </Row>
          )}
        </Container>
      </Row>
    </Container>
  );
};

export default NotificationContainer;

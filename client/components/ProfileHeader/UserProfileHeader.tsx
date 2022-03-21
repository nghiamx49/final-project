import { Container, Grid, Avatar, Button, Text } from "@nextui-org/react";
import { FC, MouseEventHandler } from "react";
import { FaEdit, FaUserCheck, FaUserPlus, FaUserTimes, FaFacebookMessenger } from "react-icons/fa/";
import Image from "next/image";
import { IUser } from "../../store/interface/user.interface";
import ActiveProfileTab from "./ActiveProfileTab";
import styles from "../../styles/UserProfile.module.css";
import { FriendStatus } from "../../store/interface/friendStatus.interface";
import { CheckingStatus } from "../../type/CheckingStatus.interface";

interface UserProfileProps {
  isYou: boolean;
  profile: IUser;
  friendStatus?: CheckingStatus;
  handleAddFriend: MouseEventHandler;
  userId?: string;
  handleAccept: MouseEventHandler;
  handleDecline: MouseEventHandler;
}

const UserProfileHeader: FC<UserProfileProps> = ({
  isYou,
  profile,
  friendStatus,
  handleAddFriend,
  userId,
  handleAccept,
  handleDecline
}) => {
  return (
    <Container fluid css={{ position: "relative" }}>
      <Grid.Container direction="column" alignItems="center">
        <Grid css={{ positon: "relative", overflow: "auto" }}>
          <div style={{ borderRadius: 0 }}>
            <Image
              src="/images/default_cover.jpg"
              width={1200}
              height={500}
              objectFit="cover"
              className={styles.image}
            />
          </div>
          {isYou && (
            <Button
              css={{
                position: "absolute",
                right: 100,
                bottom: "200px",
                backgroundColor: "transparent",
                display: "flex",
                gap: "7",
                alignItems: "center",
              }}
            >
              <FaEdit size={20} /> Edit Cover
            </Button>
          )}
        </Grid>
        <Grid>
          <Grid.Container
            justify="space-between"
            alignItems="flex-end"
            css={{ width: 1100, marginTop: "-40px" }}
          >
            <Grid css={{ display: "flex", alignItems: "flex-end", gap: 20 }}>
              <Avatar
                src="/images/default_avt.jpg"
                bordered
                zoomed
                size="xl"
                color="gradient"
                css={{ size: "$40", borderWidth: "5px" }}
              />
              <div className={styles.infoContainer}>
                <Text h2>{profile?.fullname}</Text>
                <Text b>127 friends</Text>
                <Avatar.Group count={12}>
                  <Avatar
                    src="/images/default_avt.jpg"
                    pointer
                    bordered
                    color="gradient"
                  />
                  <Avatar
                    src="/images/default_avt.jpg"
                    pointer
                    bordered
                    color="gradient"
                  />
                  <Avatar
                    src="/images/default_avt.jpg"
                    bordered
                    pointer
                    color="gradient"
                  />
                  <Avatar
                    src="/images/default_avt.jpg"
                    bordered
                    pointer
                    color="gradient"
                  />
                  <Avatar text="N" bordered pointer color="gradient" />
                </Avatar.Group>
              </div>
            </Grid>
            <Grid css={{ display: "flex", alignItems: "flex-end" }}>
              {isYou ? (
                <Button size="sm">
                  <FaEdit size={20} />
                  Edit Profile
                </Button>
              ) : friendStatus?.status === FriendStatus.NOT_SENT ? (
                <Button size="sm" onClick={handleAddFriend}>
                  <FaUserPlus size={20} />
                  Add Friend
                </Button>
              ) : friendStatus?.status === FriendStatus.PENDING ? (
                userId === friendStatus?.senderId ? (
                  <Button
                    size="sm"
                    css={{ backgroundColor: "$gray500" }}
                    onClick={handleAddFriend}
                  >
                    <FaUserTimes size={20} />
                    Requested
                  </Button>
                ) : (
                  <div style={{ display: "flex", gap: 10 }}>
                    <Button size="sm" onClick={handleAccept}>
                      <FaUserCheck size={20} />
                      Accept
                    </Button>

                    <Button
                      size="sm"
                      css={{ backgroundColor: "$gray500" }}
                      onClick={handleDecline}
                    >
                      <FaUserTimes size={20} />
                      Decline
                    </Button>
                  </div>
                )
              ) : friendStatus?.status === FriendStatus.ACCEPTED ? (
                <div style={{ display: "flex", gap: 10 }}>
                  <Button
                    size="sm"
                    css={{ backgroundColor: "$gray500" }}
                  >
                    <FaUserCheck size={20} />
                    Friend
                  </Button>
                  <Button size="sm">
                    <FaFacebookMessenger size={20} />
                    Message
                  </Button>
                </div>
              ) : (
                <Button size="sm" onClick={handleAddFriend}>
                  <FaUserPlus size={20} />
                  Add Friend
                </Button>
              )}
            </Grid>
          </Grid.Container>
        </Grid>
        <Grid
          css={{
            alignSelf: "flex-start",
            marginLeft: "40px",
            marginTop: 10,
            marginBottom: 10,
            display: "flex",
          }}
        >
          <ActiveProfileTab>Home</ActiveProfileTab>
          <Button light>Friends</Button>
          <Button light>Friends</Button>
        </Grid>
      </Grid.Container>
    </Container>
  );
};

export default UserProfileHeader;

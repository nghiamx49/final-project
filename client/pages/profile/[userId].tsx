import { Card, Container, Grid, Link, Spacer , Text} from "@nextui-org/react";
import NextLink from 'next/link'
import { GetServerSideProps, GetServerSidePropsContext, NextPage } from "next";
import { useTheme } from "@nextui-org/react";
import FeedItem from "../../components/FeedItem";
import UserProfileHeader from "../../components/ProfileHeader/UserProfileHeader";
import { IRootState } from "../../store/interface/root.interface";
import { connect } from "react-redux";
import { IAuthenciateState } from "../../store/interface/authenticate.interface";
import styles from "../../styles/UserProfile.module.css";

import { loadProfile } from "../../axiosClient/profile.api";
import { IUser } from "../../store/interface/user.interface";
import { useRouter } from "next/router";
import {
  cancelRequest,
  checkFriendStatus,
  handleAddNewFriend,
  handleFriendRequest,
  unfriend,
} from "../../axiosClient/friend.api";
import { useCallback, useEffect, useState } from "react";
import { FriendStatus } from "../../type/friendStatus.enum";
import { CheckingStatus } from "../../type/CheckingStatus.interface";
import protectedRoute from "../../hocs/protectedRouter";
import Image from "next/image";
import { Dispatch } from "redux";
import { updateProfileSuccess } from "../../store/actions/profile";
import { getUserPosts } from "../../axiosClient/feed.api";
import { IFeed } from "../../interface/feedItem.interface";
import CreatePost from "../../components/postFeedModal";
import Head from "next/head";

interface PropfileProps {
  authenticateReducer: IAuthenciateState;
  userProfile: IUser;
  errorCode: number;
  updateProfileInStore: Function;
}

const Profile: NextPage<PropfileProps> = ({
  authenticateReducer,
  userProfile,
  errorCode,
  updateProfileInStore,
}) => {
  const [profile, setProfile] = useState<IUser>(userProfile);
  const [friendStatus, setFriendStatus] = useState<CheckingStatus>({
    senderId: "",
    status: FriendStatus.NOT_SENT,
    receiverId: "",
    requestId: "",
  });
  const { isDark } = useTheme();
  const { push, query } = useRouter();
  const { user, token } = authenticateReducer;
  const [isYou, setIsYou] = useState<boolean>(false);
  const [allPosts, setAllPosts] = useState<IFeed[]>([]);

  const checkUserFriendStatus = useCallback(async () => {
    if (errorCode) {
      push("/404");
    } else {
      setIsYou(user?._id === profile._id);
      const { data } = await checkFriendStatus(profile._id, token);
      setFriendStatus(data.status);
    }
  }, [profile, token, push, errorCode, user._id]);

  const loadUserPost = useCallback(async () => {
    const { data, status } = await getUserPosts(token, profile._id);
    if (status === 200 || 304) {
      setAllPosts(data.data);
    }
  }, [token, profile._id]);

  useEffect(() => {
    checkUserFriendStatus();
    loadUserPost();
  }, [query, loadUserPost, checkUserFriendStatus]);

  const handleAddFriend = async () => {
    const { status } = await handleAddNewFriend(profile._id, token);
    if (status === 201) {
      const { data } = await checkFriendStatus(profile._id, token);
      setFriendStatus(data.status);
    }
  };

  const handleAccept = async () => {
    const { status } = await handleFriendRequest(
      friendStatus.requestId,
      FriendStatus.ACCEPTED,
      token
    );
    if (status === 200) {
      const { data } = await checkFriendStatus(profile._id, token);
      setFriendStatus(data.status);
    }
  };

  const handleDecline = async () => {
    const { status } = await handleFriendRequest(
      friendStatus.requestId,
      FriendStatus.DECLIEND,
      token
    );
    if (status === 200) {
      const { data } = await checkFriendStatus(profile._id, token);
      setFriendStatus(data.status);
    }
  };

  const handleUnfriend = async () => {
    const { status } = await unfriend(profile._id, token);
    if (status === 200) {
      setFriendStatus({
        senderId: "",
        status: FriendStatus.NOT_SENT,
        receiverId: "",
        requestId: "",
      });
    }
  };

  const handleCancelRequest = async () => {
    const { status } = await cancelRequest(friendStatus?.requestId, token);
    if (status === 200) {
      setFriendStatus({
        senderId: "",
        status: FriendStatus.NOT_SENT,
        receiverId: "",
        requestId: "",
      });
    }
  };

  return (
    <Container fluid xl css={{ padding: 0, margin: 0 }}>
      <Head>
        <title>Profile | {profile.fullname}</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container
        fluid
        xl
        css={
          isDark
            ? {
                background:
                  "linear-gradient(180deg, rgba(255,255,255,1) 0%, rgba(0,0,0,1) 100%, rgba(0,212,255,1) 100%);",
                borderBottom: "1px solid $gray700",
                margin: 0,
              }
            : {
                background:
                  "linear-gradient(0deg, rgba(255,255,255,1) 0%, rgba(0,0,0,1) 100%, rgba(0,212,255,1) 100%);",
                borderBottom: "1px solid $gray300",
                margin: 0,
              }
        }
      >
        <Container fluid lg>
          <UserProfileHeader
            isYou={isYou}
            profile={profile}
            friendStatus={friendStatus}
            handleAddFriend={handleAddFriend}
            handleAccept={handleAccept}
            handleDecline={handleDecline}
            handleUnfriend={handleUnfriend}
            handleCancel={handleCancelRequest}
            userId={user?._id}
            user={user}
            token={token}
            setProfile={setProfile}
            updateGlobalState={updateProfileInStore}
          />
        </Container>
      </Container>
      <Spacer y={3} />
      <Container fluid lg>
        <Grid.Container gap={1}>
          <Grid xs={5} css={{ height: "max-content" }}>
            <Card css={isDark ? { backgroundColor: "#1F1F1E" } : {}}>
              <Card.Header>
                <Container
                  fluid
                  display="flex"
                  direction="row"
                  justify="space-between"
                  css={{ height: "fit-content" }}
                >
                  <div>
                    <Text h4>Friends</Text>
                    <Text>{profile?.allFriends?.length} Friends</Text>
                  </div>
                  <Link block css={{ height: "fit-content" }}>
                    See All
                  </Link>
                </Container>
              </Card.Header>
              <Card.Body>
                <Grid.Container gap={2}>
                  {profile?.allFriends?.map((user: IUser, index): any => (
                    <Grid key={index} xs={4}>
                      <NextLink
                        href={`/profile/${user?.username || user?._id}`}
                        passHref
                      >
                        <Link
                          css={{
                            display: "flex",
                            flexDirection: "column",
                          }}
                        >
                          <Image
                            width={150}
                            className={styles.friendImage}
                            height={150}
                            alt="image avatar"
                            src={user?.avatar || "/images/default_avt.jpg"}
                          />
                          <Spacer y={0.5} />
                          <Text size={14} weight="medium">
                            {user.fullname}
                          </Text>
                        </Link>
                      </NextLink>
                    </Grid>
                  ))}
                </Grid.Container>
              </Card.Body>
            </Card>
          </Grid>
          <Grid xs={7}>
            <Container fluid xs>
              <CreatePost user={user} token={token} />
              {allPosts.map((item, index) => (
                <FeedItem
                  key={item._id}
                  item={item}
                  currentUser={user}
                  token={token}
                />
              ))}
            </Container>
          </Grid>
        </Grid.Container>
      </Container>
    </Container>
  );
};

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const profileFilter: any = context.params?.userId;
  const { data, status } = await loadProfile(profileFilter);
  if (status === 200) {
    return { props: { userProfile: data?.user } };
  } else {
    return { props: { errorCode: status } };
  }
};
const mapStateToProps = (state: IRootState) => {
  return {
    authenticateReducer: state.authenticateReducer,
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    updateProfileInStore: (data: any) => dispatch(updateProfileSuccess(data))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(protectedRoute(Profile));

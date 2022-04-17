import { Container, Spacer } from "@nextui-org/react";
import { GetServerSideProps, GetServerSidePropsContext, NextPage } from "next";
import { useTheme } from "@nextui-org/react";
import FeedItem from "../../components/FeedItem";
import UserProfileHeader from "../../components/ProfileHeader/UserProfileHeader";
import { IRooteState } from "../../store/interface/root.interface";
import { connect } from "react-redux";
import { IAuthenciateState } from "../../store/interface/authenticate.interface";

import { loadProfile } from "../../axiosClient/auth.api";
import { IUser } from "../../store/interface/user.interface";
import { useRouter } from "next/router";
import {
  checkFriendStatus,
  handleAddNewFriend,
  handleFriendRequest,
} from "../../axiosClient/friend.api";
import { useEffect, useState } from "react";
import { FriendStatus } from "../../type/friendStatus.enum";
import { CheckingStatus } from "../../type/CheckingStatus.interface";
import protectedRoute from "../../hocs/protectedRouter";
const testData = [
  {
    userId: 1,
    id: 1,
    title:
      "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
    body: "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto",
  },
  {
    userId: 1,
    id: 2,
    title: "qui est esse",
    body: "est rerum tempore vitae\nsequi sint nihil reprehenderit dolor beatae ea dolores neque\nfugiat blanditiis voluptate porro vel nihil molestiae ut reiciendis\nqui aperiam non debitis possimus qui neque nisi nulla",
  },
  {
    userId: 1,
    id: 3,
    title: "ea molestias quasi exercitationem repellat qui ipsa sit aut",
    body: "et iusto sed quo iure\nvoluptatem occaecati omnis eligendi aut ad\nvoluptatem doloribus vel accusantium quis pariatur\nmolestiae porro eius odio et labore et velit aut",
  },
];

interface PropfileProps {
  authenticateReducer: IAuthenciateState;
  profile: IUser;
  errorCode: number;
}

const Profile: NextPage<PropfileProps> = ({
  authenticateReducer,
  profile,
  errorCode,
}) => {
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
  const checkUserFriendStatus = async () => {
    if (errorCode) {
      push("/404");
    } else {
      setIsYou(user?._id === profile._id);
      if (isYou === false) {
        const { data } = await checkFriendStatus(profile._id, token);
        setFriendStatus(data.status);
      }
    }
  };

  useEffect(() => {
    checkUserFriendStatus();
  }, [query?.userId]);

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

  const handleUnfriend = async () => {};

  const handleCancelRequest = async () => {};

  return (
    <Container fluid css={{ padding: 0 }}>
      <Container
        fluid
        css={
          isDark
            ? {
                background:
                  "linear-gradient(180deg, rgba(255,255,255,1) 0%, rgba(0,0,0,1) 100%, rgba(0,212,255,1) 100%);",
              }
            : {
                background:
                  "linear-gradient(0deg, rgba(255,255,255,1) 0%, rgba(0,0,0,1) 100%, rgba(0,212,255,1) 100%);",
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
            userId={user?._id}
          />
        </Container>
      </Container>
      <Spacer y={3} />
      <Container fluid xs>
        {testData.map(({ userId, title, body }, index) => (
          <FeedItem key={index} userId={userId} title={title} body={body} />
        ))}
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
    return { props: { profile: data?.user } };
  } else {
    return { props: { errorCode: status } };
  }
};
const mapStateToProps = (state: IRooteState) => {
  return {
    authenticateReducer: state.authenticateReducer,
  };
};

export default connect(mapStateToProps)(protectedRoute(Profile));

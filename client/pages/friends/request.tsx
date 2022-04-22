import {
  Container,
  Grid,
  Row,
  Text,
} from "@nextui-org/react";
import { NextPage } from "next";
import { SyntheticEvent, useCallback, useEffect, useState } from "react";
import { connect } from "react-redux";
import { getAllWaitingForAcceptRequest, handleFriendRequest, checkFriendStatus,  } from "../../axiosClient/friend.api";
import protectedRoute from "../../hocs/protectedRouter";
import { IAuthenciateState } from "../../store/interface/authenticate.interface";
import { IRootState } from "../../store/interface/root.interface";
import { IUser } from "../../store/interface/user.interface";

import FriendItem from "../../components/friendItem";
import { FriendStatus } from "../../type/friendStatus.enum";

interface PageProps {
  authenticateReducer: IAuthenciateState;
}

const FriendRequests: NextPage<PageProps> = ({ authenticateReducer }) => {
  const [allFriends, setAllFriends] = useState<IUser[]>([]);
  const { token, } = authenticateReducer;

  const loadFriends = useCallback(async (): Promise<void> => {
    const { data, status } = await getAllWaitingForAcceptRequest(token);
    if (status === 200 || 304) {
      setAllFriends(data?.data);
    }
  }, [token]);

  const handleAccept = async (e: SyntheticEvent, user: IUser) => {
    e.preventDefault();
    const { status } = await handleFriendRequest(
      user?.requestId,
      FriendStatus.ACCEPTED,
      token
    );
    if (status === 200) {
     loadFriends();
    }
  };

  const handleDecline = async (e: SyntheticEvent, user: IUser) => {
    e.preventDefault();
    const { status } = await handleFriendRequest(
      user?.requestId,
      FriendStatus.DECLIEND,
      token
    );
    if (status === 200) {
      loadFriends();
    }
  };


  useEffect(() => {
    loadFriends();
  }, [loadFriends]);

  return (
    <Container fluid>
      <Row>
        <Text h3>Incoming request</Text>
      </Row>
      <Row fluid>
        <Grid.Container gap={1}>
          {allFriends?.map((user: IUser, index): any => (
            <FriendItem
            key={index}
              user={user}
              aceptHandler={(e) => handleAccept(e, user)}
              declineHandler={e => handleDecline(e, user)}
            />
          ))}
        </Grid.Container>
      </Row>
    </Container>
  );
};

const mapStateToProps = (state: IRootState) => {
  return {
    authenticateReducer: state.authenticateReducer,
  };
};

export default connect(mapStateToProps)(protectedRoute(FriendRequests));

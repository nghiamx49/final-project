import {
  Button,
  Card,
  Container,
  Grid,
  Link,
  Row,
  Spacer,
  Text,
  useTheme,
} from "@nextui-org/react";
import { NextPage } from "next";
import { SyntheticEvent, useCallback, useEffect, useState } from "react";
import { connect } from "react-redux";
import {
  checkFriendStatus,
  getAllSystemRecommendedFriends,
  handleAddNewFriend,
} from "../../axiosClient/friend.api";
import protectedRoute from "../../hocs/protectedRouter";
import { IAuthenciateState } from "../../store/interface/authenticate.interface";
import { IRootState } from "../../store/interface/root.interface";
import { IUser } from "../../store/interface/user.interface";

import FriendItem from "../../components/friendItem";

interface PageProps {
  authenticateReducer: IAuthenciateState;
}

const RecommendFriends: NextPage<PageProps> = ({ authenticateReducer }) => {
  const [allFriends, setAllFriends] = useState<IUser[]>([]);
  const { token } = authenticateReducer;
  const { isDark } = useTheme();

  const loadFriends = useCallback(async (): Promise<void> => {
    const { data, status } = await getAllSystemRecommendedFriends(token);
    if (status === 200 || 304) {
      setAllFriends(data?.data);
    }
  }, [token]);

  const handleAddFriend = async (e: SyntheticEvent, user: IUser) => {
    e.preventDefault();
    const { status } = await handleAddNewFriend(user._id, token);
    if (status === 201) {
      loadFriends();
    }
  };

  useEffect(() => {
    loadFriends();
  }, [loadFriends]);

  return (
    <Container fluid>
      <Row>
        <Text h3>People you may know</Text>
      </Row>
      <Row fluid>
        <Grid.Container gap={1}>
          {allFriends?.map((user: IUser, index): any => (
            <FriendItem
            key={index}
              user={user}
              addFriendHandler={(e) => handleAddFriend(e, user)}
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

export default connect(mapStateToProps)(protectedRoute(RecommendFriends));

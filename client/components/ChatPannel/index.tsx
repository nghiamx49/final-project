import { Button, Container, Input, Row, Text } from "@nextui-org/react";
import { FC, useCallback, useEffect, useState } from "react";
import { connect } from "react-redux";
import { getAllFriends } from "../../axiosClient/friend.api";
import { IAuthenciateState } from "../../store/interface/authenticate.interface";
import { IRootState } from "../../store/interface/root.interface";
import { IUser } from "../../store/interface/user.interface";
import ChatItem from "./ChatItem";
import {FaSearch} from 'react-icons/fa'

interface ChatPannelProps {
  authenticateReducer: IAuthenciateState,
}

const ChatPannel: FC<ChatPannelProps> = ({authenticateReducer}) => {
    const [allFriends, setAllFriends] = useState<IUser[]>([]);

  const {token} = authenticateReducer;
   const loadFriends = useCallback(async (): Promise<void> => {
     const { data, status } = await getAllFriends(token);
     if (status === 200 || 304) {
       setAllFriends(data?.data);
     }
   }, [token]);

   useEffect(() => {loadFriends()}, [loadFriends])
  return (
    <Container
      className="custom-scroll"
      style={{
        position: "sticky",
        maxWidth: 360,
        top: 80,
        width: "100%",
        minWidth: 360,
        maxHeight: "calc(100vh - 80px)",
        padding: "10px 0",
      }}
    >
      <Row
        fluid
        justify="space-between"
        align="center"
        css={{ padding: "0 5px" }}
      >
        <Text h4>Online Friends</Text>
        <Input
          aria-labelledby="search"
          placeholder="search friends..."
          contentRight={<FaSearch size={20} color="white" style={{cursor: 'pointer'}} />}
        />
      </Row>
      {allFriends.map((item, index) => (
        <ChatItem user={item} key={index} />
      ))}
    </Container>
  );
};

const mapStateToProps = (state: IRootState) => ({
  authenticateReducer: state.authenticateReducer,
});

export default connect(mapStateToProps)(ChatPannel);

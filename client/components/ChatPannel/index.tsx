import { Avatar, Button, Card, Container, Divider, FormElement, Input, Row, Text, Tooltip, useTheme } from "@nextui-org/react";
import { ChangeEvent, FC, useCallback, useContext, useEffect, useState } from "react";
import { connect } from "react-redux";
import { getAllFriends } from "../../axiosClient/friend.api";
import { IAuthenciateState } from "../../store/interface/authenticate.interface";
import { IRootState } from "../../store/interface/root.interface";
import { IUser } from "../../store/interface/user.interface";
import ChatItem from "./ChatItem";
import {FaSearch, FaSmile, FaVideo} from 'react-icons/fa'
import { ISocketContext, socket, SocketContext } from "../../hocs/socketContext";
import {debounce} from '../../helpers/debouce'


interface ChatPannelProps {
  authenticateReducer: IAuthenciateState,
}

const ChatPannel: FC<ChatPannelProps> = ({authenticateReducer}) => {
    const [allFriends, setAllFriends] = useState<IUser[]>([]);
    const {isDark} = useTheme();
    const [activeChatWithFriend, setActiveChatWithFriend] = useState<IUser | null>(null);

    const {socket} = useContext(SocketContext) as ISocketContext;

    const handleFriendOnline = useCallback( (data: IUser) => {
        setAllFriends((prev) => {
          const friendFilter = prev.filter((user) => user._id !== data._id);
          return [data, ...friendFilter];
        });
      }, [])
    
      const handleFriendOffline = useCallback((data: IUser) => {
        setAllFriends(prev => {
          const friendFilter = prev.filter((user) => user._id !== data._id);
          return [...friendFilter, data];
        });
      }, []);

      
    useEffect(() => {
      socket.on("friend-online", handleFriendOnline);

      socket.on("friend-offline", handleFriendOffline);

      return () => {
        socket.off('friend-online')
        socket.off('friend-offline');
      }
    }, [handleFriendOffline, handleFriendOnline, socket])

  const {token} = authenticateReducer;
   const loadFriends = useCallback(async (): Promise<void> => {
     const { data, status } = await getAllFriends(token);
     if (status === 200 || 304) {
       setAllFriends(data?.data);
       setActiveChatWithFriend(data.data[0])
     }
   }, [token]);

   const handleSearch = async (e: ChangeEvent<FormElement>) => {
       const { data, status } = await getAllFriends(token, e.target.value);
       if (status === 200 || 304) {
         setAllFriends(data?.data);
         setActiveChatWithFriend(data.data[0]);
       }
   }

   const searchWithTimeout = debounce(handleSearch, 500)

    // const onEmojiClick = (emojiObject: BaseEmoji) => {
    //   setCommentContent(commentContent + emojiObject.native);
    // };

   useEffect(() => {
     loadFriends()
  }, [loadFriends])
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
          contentRight={
            <FaSearch size={20} color="white" style={{ cursor: "pointer" }} />
          }
          onChange={(e) => searchWithTimeout(e)}
        />
      </Row>
      {allFriends.map((item) => (
        <ChatItem key={item._id} user={item} />
      ))}
    </Container>
  );
};

const mapStateToProps = (state: IRootState) => ({
  authenticateReducer: state.authenticateReducer,
});

export default connect(mapStateToProps)(ChatPannel);

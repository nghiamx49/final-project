import { Container, Spacer } from "@nextui-org/react";
import ChatItem from "./ChatItem";
const userList = [
  {
    fullname: "Mai Xuan Nghia",
    avatar: "/images/default_avt.jpg",
    isOnline: true,
  },
  {
    fullname: "Mai Xuan Nghia",
    avatar: "/images/default_avt.jpg",
    isOnline: true,
  },
  {
    fullname: "Mai Xuan Nghia",
    avatar: "/images/default_avt.jpg",
    isOnline: true,
  },
  {
    fullname: "Mai Xuan Nghia",
    avatar: "/images/default_avt.jpg",
    isOnline: true,
  },
  {
    fullname: "Mai Xuan Nghia",
    avatar: "/images/default_avt.jpg",
    isOnline: true,
  },
  {
    fullname: "Mai Xuan Nghia",
    avatar: "/images/default_avt.jpg",
    isOnline: true,
  },
  {
    fullname: "Mai Xuan Nghia",
    avatar: "/images/default_avt.jpg",
    isOnline: true,
  },
  {
    fullname: "Mai Xuan Nghia",
    avatar: "/images/default_avt.jpg",
    isOnline: true,
  },
  {
    fullname: "Mai Xuan Nghia",
    avatar: "/images/default_avt.jpg",
    isOnline: true,
  },
  {
    fullname: "Mai Xuan Nghia",
    avatar: "/images/default_avt.jpg",
    isOnline: true,
  },
  {
    fullname: "Mai Xuan Nghia",
    avatar: "/images/default_avt.jpg",
    isOnline: true,
  },
  {
    fullname: "Mai Xuan Nghia",
    avatar: "/images/default_avt.jpg",
    isOnline: true,
  },
  {
    fullname: "Mai Xuan Nghia",
    avatar: "/images/default_avt.jpg",
    isOnline: true,
  },
  {
    fullname: "Mai Xuan Nghia",
    avatar: "/images/default_avt.jpg",
    isOnline: true,
  },
  {
    fullname: "Mai Xuan Nghia",
    avatar: "/images/default_avt.jpg",
    isOnline: true,
  },
  {
    fullname: "Mai Xuan Nghia",
    avatar: "/images/default_avt.jpg",
    isOnline: true,
  },
  {
    fullname: "Mai Xuan Nghia",
    avatar: "/images/default_avt.jpg",
    isOnline: true,
  },
  {
    fullname: "Mai Xuan Nghia",
    avatar: "/images/default_avt.jpg",
    isOnline: true,
  },
  {
    fullname: "Mai Xuan Nghia",
    avatar: "/images/default_avt.jpg",
    isOnline: true,
  },
  {
    fullname: "Mai Xuan Nghia",
    avatar: "/images/default_avt.jpg",
    isOnline: true,
  },
  {
    fullname: "Mai Xuan Nghia",
    avatar: "/images/default_avt.jpg",
    isOnline: true,
  },
  {
    fullname: "Mai Xuan Nghia",
    avatar: "/images/default_avt.jpg",
    isOnline: true,
  },
  {
    fullname: "Mai Xuan Nghia",
    avatar: "/images/default_avt.jpg",
    isOnline: true,
  },
  {
    fullname: "Mai Xuan Nghia",
    avatar: "/images/default_avt.jpg",
    isOnline: true,
  },
  
];

const ChatPannel = () => {
  return (
    <Container
      className="custom-scroll"
      style={{
        position: "sticky",
        maxWidth: 360,
        top: 80,
        width: "100%",
        minWidth: 360,
        maxHeight: "100vh",
      }}
    >
      {userList.map((item, index) => (
        <ChatItem user={item} key={index} />
      ))}
    </Container>
  );
};

export default ChatPannel;

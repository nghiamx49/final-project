import { Container, Divider, Spacer } from "@nextui-org/react";
import { FC } from "react";
import { FcHome, } from "react-icons/fc";
import { FaUser, FaUserFriends } from "react-icons/fa";
import SideBarItem from "./SideBarItem";
const sideBarRoute: Array<any> = [
  {
    icon: FaUser,
    title: "Personal Profile",
    link: "/",
  },
  {
    icon: FaUserFriends,
    title: "Friends",
    link: "/friends",
  },
];

const SideBarNewFeed: FC = () => {
  return (
    <Container
      className="custom-scroll"
      style={{
        position: "sticky",
        maxWidth: 360,
        top: 80,
        overflowX: "hidden",
      }}
    >
      {sideBarRoute.map(({ icon: Icon, title, link }, index) => (
        <SideBarItem key={index} Icon={Icon} title={title} link={link} />
      ))}
      <Spacer y={1} />
      <Divider height={3} />
    </Container>
  );
};

export default SideBarNewFeed;

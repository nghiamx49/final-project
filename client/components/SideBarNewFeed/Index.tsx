import { Container, Divider, Spacer } from "@nextui-org/react";
import { FC } from "react";
import { FcHome } from "react-icons/fc";
import {FaUser, FaFlag} from 'react-icons/fa'
import SideBarItem from "./SideBarItem";
const sideBarRoute: Array<any> = [
  {
    icon: FaUser,
    title: "Personal Profile",
    link: "/",
  },
  {
    icon: FcHome,
    title: "Your Joined  Groups",
    link: "/",
  },
  {
    icon: FaFlag,
    title: "Your Followed Pages",
    link: "/",
  },
];

const SideBarNewFeed: FC = () => {
    return (
      <Container>
        {sideBarRoute.map(({ icon: Icon, title, link }) => (
          <SideBarItem Icon={Icon} title={title} link={link} />
        ))}
        <Spacer y={1} />
        <Divider height={3} />
      </Container>
    );
}

export default SideBarNewFeed;
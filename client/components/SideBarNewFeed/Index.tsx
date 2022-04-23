import { Container, Divider, Spacer } from "@nextui-org/react";
import { FC } from "react";
import { FcHome, } from "react-icons/fc";
import { FaUser, FaUserFriends } from "react-icons/fa";
import SideBarItem from "./SideBarItem";
import { connect } from "react-redux";
import { IRootState } from "../../store/interface/root.interface";
import { IAuthenciateState } from "../../store/interface/authenticate.interface";

interface Props {
  authenticateReducer: IAuthenciateState
}

const SideBarNewFeed: FC<Props> = ({authenticateReducer}) => {

  const sideBarRoute: Array<any> = [
    {
      icon: FaUser,
      title: "Personal Profile",
      link: `/profile/${authenticateReducer.user?.username || authenticateReducer.user._id}`,
    },
    {
      icon: FaUserFriends,
      title: "Friends",
      link: "/friends",
    },
  ];

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

export default connect((state: IRootState) => ({
  authenticateReducer: state.authenticateReducer,
}))(SideBarNewFeed);

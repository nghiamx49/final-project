import { Container, Divider, Link, Row, Spacer, Text } from "@nextui-org/react";
import { FC, MouseEvent } from "react";
import { FaUser, FaUserFriends, FaUsers } from "react-icons/fa";
import SideBarItem from "./SideBarItem";
import { connect } from "react-redux";
import { IRootState } from "../../store/interface/root.interface";
import { IAuthenciateState } from "../../store/interface/authenticate.interface";
import { useRouter } from "next/router";
import { createRoom, getManageToken } from "../../axiosClient/video-call.api";
interface Props {
  authenticateReducer: IAuthenciateState
}

const SideBarNewFeed: FC<Props> = ({authenticateReducer}) => {

  const {user, token} = authenticateReducer;

  const sideBarRoute: Array<any> = [
    {
      icon: FaUser,
      title: "Personal Profile",
      link: `/profile/${user?.username || user._id}`,
    },
    {
      icon: FaUserFriends,
      title: "Friends",
      link: "/friends",
    },
  ];
  const {push} = useRouter()

  const createConference = async (e: MouseEvent<HTMLElement>) => {
    e.preventDefault();
    const { data, status } = await getManageToken(token);
    if (status === 200) {
      const body = {
        name: `conference-${Date.now()}`,
        region: "in",
        description: "conference online meeting",
      };
      const {data: roomData} = await createRoom(body, data.token);
      console.log(roomData);
      push(`/room/${roomData.id}`);
    }
  }

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
      <Row fluid>
        <Link
          onClick={createConference}
          block
          color="primary"
          css={{
            dislay: "flex",
            columnGap: 10,
            alignItems: "center",
            width: 400,
            paddingTop: 20,
            paddingBottom: 20,
          }}
        >
          <FaUsers size={30} />
          <Text h5>Create Conference</Text>
        </Link>
      </Row>
      <Spacer y={1} />
      <Divider height={3} />
    </Container>
  );
};

export default connect((state: IRootState) => ({
  authenticateReducer: state.authenticateReducer,
}))(SideBarNewFeed);

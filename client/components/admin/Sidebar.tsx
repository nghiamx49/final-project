import { Container, Link, Row, Spacer, Text } from "@nextui-org/react";
import { FC, MouseEvent, SyntheticEvent } from "react";
import { FaChartPie, FaSignOutAlt, FaUsers } from "react-icons/fa";
import NextLink from 'next/link'
import { useRouter } from "next/router";
import { Dispatch } from "redux";
import {logoutAction} from '../../store/actions/authenticate'
import { connect } from "react-redux";


interface Props {
  logout?: Function
}

const Sidebar: FC<Props> = ({logout}) => {
    const {asPath} = useRouter()

    const handleLogout = (e:MouseEvent) => {
      e.preventDefault();
      logout && logout();
    }

    return (
      <Container css={{ padding: "0 5px", margin: 0, bg: "transparent" }}>
        <Row
          align="center"
          justify="flex-start"
          css={{ padding: 0, marginBottom: 10 }}
        >
          <NextLink href={"/admin"} passHref>
            <Link
              block
              onClick={handleLogout}
              color={"error"}
              css={{
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-start",
                padding: "20px 10px",
                w: "100%",
                bg: asPath === "/admin" ? "$red300" : "transparent",
              }}
            >
              <FaChartPie size={30} color="white" />
              <Spacer x={0.3} />
              <Text b size={18}>
                Dashboard
              </Text>
            </Link>
          </NextLink>
        </Row>
        <Row align="center" css={{ padding: 0, margin: 0 }}>
          <Link
            onClick={handleLogout}
            block
            color={"error"}
            css={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-start",
              padding: "20px 10px",
              w: "100%",
            }}
          >
            <FaSignOutAlt size={30} color="white" />
            <Spacer x={0.3} />
            <Text b size={18}>
              Logout
            </Text>
          </Link>
        </Row>
      </Container>
    );
}

const mapDispatchToProps = (disaptch: Dispatch) => {
  return {
    logout: () => disaptch(logoutAction()),
  };
}

export default connect(null, mapDispatchToProps)(Sidebar);
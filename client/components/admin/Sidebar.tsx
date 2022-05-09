import { Container, Link, Row, Spacer, Text } from "@nextui-org/react";
import { FC } from "react";
import { FaChartPie, FaUsers } from "react-icons/fa";
import NextLink from 'next/link'
import { useRouter } from "next/router";



const Sidebar: FC = () => {
    const {asPath} = useRouter()
    return (
      <Container css={{ padding: "0 5px", margin: 0, bg: 'transparent' }}>
        <Row align="center" justify="flex-start" css={{ padding: 0, marginBottom: 10 }}>
          <NextLink href={"/admin"} passHref>
            <Link
              block
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
          <NextLink href={"/admin/users"} passHref>
            <Link
              block
              color={"error"}
              css={{
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-start",
                padding: "20px 10px",
                w: "100%",
                bg: asPath === "/admin/users" ? "$red300" : "transparent",
              }}
            >
              <FaUsers size={30} color="white" />
              <Spacer x={0.3} />
              <Text b size={18}>
                Users
              </Text>
            </Link>
          </NextLink>
        </Row>
      </Container>
    );
}

export default Sidebar;
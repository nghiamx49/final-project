import { Avatar, Container, Divider, Grid, Row, Spacer, Text, Link } from "@nextui-org/react";
import { FaChartArea, FaUsers } from "react-icons/fa";
import NextLink from 'next/link';

const Dashboard = () => {
    return (
      <Grid.Container css={{ minHeight: "100vh" }}>
        <Grid xs={2} css={{ borderRight: "1px solid $gray700" }}>
          <Container css={{ margin: "30px 0 0 0", padding: "0 10px" }}>
            <Row css={{ display: "flex", gap: 10, alignItems: "center" }}>
              <Avatar size={"lg"} src={"/images/default_avt.jpg"} />
              <Text h3>System Admin</Text>
            </Row>
            <Spacer y={0.5} />
            <Divider />
            <Spacer y={0.5} />
            <Row>
              <NextLink href="/admin/dashboard" passHref>
                <Link
                  block
                  css={{
                    width: "100%",
                    display: "flex",
                    gap: 10,
                    alignItems: "center",
                  }}
                >
                  <FaChartArea size={50} />
                  <Text h3>System Statistical</Text>
                </Link>
              </NextLink>
            </Row>
            <Spacer y={0.5} />
            <Divider />
            <Spacer y={0.5} />
            <Row>
              <NextLink href="/admin/dashboard" passHref>
                <Link
                  block
                  css={{
                    width: "100%",
                    display: "flex",
                    gap: 10,
                    alignItems: "center",
                  }}
                >
                  <FaUsers size={50} />
                  <Text h3>Users</Text>
                </Link>
              </NextLink>
            </Row>
            <Spacer y={0.5} />
            <Divider />
            <Spacer y={0.5} />
          </Container>
        </Grid>
        <Grid xs={10}></Grid>
      </Grid.Container>
    );
}

export default Dashboard;

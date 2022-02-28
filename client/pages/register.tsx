import {
  Button,
  Card,
  Container,
  Grid,
  Input,
  Row,
  Spacer,
  Text,
  Link,
} from "@nextui-org/react";
import { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";

const Register: NextPage = () => {
    const router = useRouter();

    const navigateLogin = (e: any): void => {
        e.preventDefault();
        router.push('/login');
    }

  return (
    <>
      <Head>
        <title>Register</title>
        <meta name="description" content="Register New Account" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container sm fluid alignItems="center">
        <Spacer y={10} />
        <Grid.Container justify="center" alignItems="center">
          <Grid justify="center">
            <Container fluid as="form">
              <Card color="default">
                <Card.Header>
                  <Row justify="center">
                    <Text h2>Register</Text>
                  </Row>
                </Card.Header>
                <Card.Body>
                  <Spacer y={3} />
                  <Row>
                    <Input
                      width="400px"
                      aria-labelledby="username"
                      placeholder="username"
                      name="username"
                      clearable
                      bordered
                    />
                  </Row>
                  <Spacer y={2} />
                  <Row>
                    <Input.Password
                      width="400px"
                      aria-labelledby="password"
                      placeholder="password"
                      name="password"
                      clearable
                      bordered
                    />
                  </Row>
                  <Spacer y={2} />
                  <Row>
                    <Input
                      width="400px"
                      aria-labelledby="Full Name"
                      placeholder="Full Name"
                      name="fullname"
                      clearable
                      bordered
                    />
                  </Row>
                  <Spacer y={2} />
                  <Row>
                    <Input
                      type="email"
                      width="400px"
                      aria-labelledby="Email"
                      placeholder="Email"
                      name="email"
                      clearable
                      bordered
                    />
                  </Row>
                  <Spacer y={1} />
                  <Row justify="center">
                    <Button size="lg" color="primary">
                      Register
                    </Button>
                  </Row>
                </Card.Body>
                <Card.Footer>
                  <Row justify="center">
                    <Button size="lg" color="success" onClick={navigateLogin}>
                      Login
                    </Button>
                  </Row>
                </Card.Footer>
              </Card>
            </Container>
          </Grid>
        </Grid.Container>
        <Spacer y={10} />
      </Container>
    </>
  );
};

export default Register;

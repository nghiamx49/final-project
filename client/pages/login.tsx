import { Button, Card, Container, Grid, Input, Row, Spacer, Text, Link } from "@nextui-org/react";
import { NextPage } from "next";
import Head from "next/head";
import NextLink from "next/link";
import { useRouter } from "next/router";
import {useForm} from 'react-hook-form';
import { IAuthFormData } from "../type/auth.interface";
import * as yup from 'yup';
import { ErrorMessage } from "@hookform/error-message";
import {yupResolver} from '@hookform/resolvers/yup'
import {connect} from 'react-redux';
import {Dispatch} from 'redux'
import { IAction } from "../store/interface/action.interface";
import { loginAction } from "../store/actions/authenticate";
import guestRouter from "../hocs/guestRouter";
import { MouseEvent, SyntheticEvent } from "react";
interface LoginPageProps {
  doLogin: Function
}

const loginValidateSchema = yup.object().shape({
  username: yup.string().required("Emaill cannot be empty"),
  password: yup.string().required("password cannot be empty"),
})

const Login: NextPage<LoginPageProps> = ({doLogin}: LoginPageProps) => {
    const {register, handleSubmit, formState: {errors}} = useForm<IAuthFormData>({
      resolver: yupResolver(loginValidateSchema),
      mode: 'onChange',
    });
   const router = useRouter();

   const navigateRegister = (e: SyntheticEvent): void => {
     e.preventDefault();
     router.push("/register");
   };

   const onSubmit = (formData: IAuthFormData) => {
      doLogin(formData);
   }

  return (
    <>
      <Head>
        <title>Login</title>
        <meta name="description" content="Login Page" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container css={{ paddingTop: 100, paddingBottom: 170 }} md fluid alignItems="center">
        <Grid.Container justify="space-between" alignItems="center">
          <Grid>
            <Row>
              <Text css={{color: '$pink600'}} h1>
                PetLove
              </Text>
            </Row>
            <Row>
              <Text h2 css={{maxWidth: 400}}>Let people love your pets, connect with annimal lovers</Text>
            </Row>
          </Grid>
          <Grid justify="center">
            <Container fluid as="form">
              <Card color="default">
                <Card.Header>
                  <Row justify="center">
                    <Text h2>Login</Text>
                  </Row>
                </Card.Header>
                <Card.Body>
                  <Grid.Container direction="column" alignItems="center">
                    <Grid>
                      <Input
                        width="400px"
                        aria-labelledby="Email"
                        placeholder="Email"
                        {...register("username")}
                        clearable
                        bordered
                      />
                    </Grid>
                    <Grid>
                      <ErrorMessage
                        name="username"
                        errors={errors}
                        render={({ message }) => (
                          <Text color="red">{message}</Text>
                        )}
                      />
                    </Grid>
                  </Grid.Container>
                  <Spacer y={1} />
                  <Grid.Container direction="column" alignItems="center">
                    <Grid>
                      <Input.Password
                        width="400px"
                        aria-labelledby="password"
                        placeholder="password"
                        {...register("password")}
                        clearable
                        bordered
                      />
                    </Grid>
                    <Grid>
                      <ErrorMessage
                        name="password"
                        errors={errors}
                        render={({ message }) => (
                          <Text color="red">{message}</Text>
                        )}
                      />
                    </Grid>
                  </Grid.Container>
                  <Spacer y={1} />
                  <Row justify="center">
                    <Button
                      onClick={handleSubmit(onSubmit)}
                      size="lg"
                      color="primary"
                    >
                      Login
                    </Button>
                  </Row>
                  <Spacer y={1} />
                  <Row justify="center">
                    <Text>
                      Forgot Password?{" "}
                      <NextLink href="/forgotpassword">
                        <Link block>Click Here</Link>
                      </NextLink>
                    </Text>
                  </Row>
                </Card.Body>
                <Card.Footer>
                  <Row justify="center">
                    <Button
                      size="lg"
                      color="success"
                      onClick={navigateRegister}
                    >
                      Register
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

const mapDispatchToProps = (dispatch: Dispatch<IAction>) => {
  return {
    doLogin: (formData: IAuthFormData) => dispatch(loginAction(formData))
  }
}

export default connect(null, mapDispatchToProps)(guestRouter(Login));

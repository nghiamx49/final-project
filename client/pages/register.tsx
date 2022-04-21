import {
  Button,
  Card,
  Container,
  Grid,
  Input,
  Row,
  Spacer,
  Text,
} from "@nextui-org/react";
import { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { IRegistertFormData } from "../type/auth.interface";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { ErrorMessage } from "@hookform/error-message";
import { registerApi } from "../axiosClient/auth.api";
import { toast } from "react-toastify";
import { SyntheticEvent } from "react";
import guestRouter from "../hocs/guestRouter";

const registerValidationSchema = yup.object().shape({
  email: yup.string().email('Email must be valid').required("Email cannot be empty"),
  password: yup.string().required("Password cannot be empty"),
  confirmPassword: yup.string().oneOf([yup.ref('password'), null], 'Confirm password must match').required('Confirm password cannot be empty'),
  fullname: yup.string().required("Full Name cannot be empty"),
  dateOfBirth: yup.date().required("Date of Birth must be selected"),
});

const Register: NextPage = () => {
  const router = useRouter();

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<IRegistertFormData>({
    resolver: yupResolver(registerValidationSchema),
    mode: "onChange",
  });

  const navigateLogin = (e: SyntheticEvent): void => {
    e.preventDefault();
    router.push("/login");
  };

  const registerAccountHandler = async (
    formData: IRegistertFormData
  ): Promise<void> => {
    try {
      const { data, status } = await registerApi(formData);
      if (status === 201) {
        toast.success(data.message);
        router.push("/login");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Head>
        <title>Register</title>
        <meta name="description" content="Register New Account" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container sm css={{paddingTop: 70}} fluid alignItems="center">
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
                  <Grid.Container direction="column" alignItems="center">
                    <Grid>
                      <Input
                        width="400px"
                        aria-labelledby="Email"
                        placeholder="Email"
                        {...register("email")}
                        clearable
                        bordered
                      />
                    </Grid>
                    <Grid>
                      <ErrorMessage
                        name="email"
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
                        placeholder="Password"
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
                  <Grid.Container direction="column" alignItems="center">
                    <Grid>
                      <Input.Password
                        width="400px"
                        aria-labelledby="confirmPassword"
                        placeholder="Confirm Password"
                        {...register("confirmPassword")}
                        clearable
                        bordered
                      />
                    </Grid>
                    <Grid>
                      <ErrorMessage
                        name="confirmPassword"
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
                      <Input
                        width="400px"
                        aria-labelledby="fullname"
                        placeholder="Full Name"
                        {...register("fullname")}
                        clearable
                        bordered
                      />
                    </Grid>
                    <Grid>
                      <ErrorMessage
                        name="fullname"
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
                      <Input
                        width="400px"
                        aria-labelledby="dateOfBirth"
                        type="date"
                        placeholder="Date Of Birth"
                        {...register("dateOfBirth")}
                        clearable
                        bordered
                      />
                    </Grid>
                    <Grid>
                      <ErrorMessage
                        name="dateOfBirth"
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
                      <Input
                        width="400px"
                        aria-labelledby="address"
                        placeholder="Address"
                        {...register("address")}
                        clearable
                        bordered
                      />
                    </Grid>
                    <Grid>
                      <ErrorMessage
                        name="address"
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
                      onClick={handleSubmit(registerAccountHandler)}
                      size="lg"
                      color="primary"
                    >
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

export default guestRouter(Register);

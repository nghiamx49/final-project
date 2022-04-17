import {
  Button,
  Card,
  Container,
  Grid,
  Input,
  Row,
  Spacer,
  Text,
  useTheme,
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
import { SyntheticEvent, useState } from "react";
import guestRouter from "../hocs/guestRouter";

const emailSentValidationSchema = yup.object().shape({
  email: yup
    .string()
    .email("Email must be valid")
    .required("Email cannot be empty"),
});

const changePasswordValidationSchema = yup.object().shape({
  password: yup.string().required("Password cannot be empty"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Confirm password must match")
    .required("Confirm password cannot be empty"),
});

const ForgotPassword: NextPage = () => {
  const router = useRouter();

  const [emailSent, setEmailSent] = useState<Boolean>(false);

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<IRegistertFormData>({
    resolver: yupResolver(
      emailSent ? emailSentValidationSchema : changePasswordValidationSchema
    ),
    mode: "onChange",
    defaultValues: emailSent
      ? {
          email: "",
        }
      : {
          password: "",
          confirmPassword: "",
        },
  });
    const { isDark } = useTheme();


  return (
    <>
      <Head>
        <title>Password Recovery</title>
        <meta name="description" content="Password recovery" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container sm css={{height: '100vh'}} display="flex" fluid alignItems="center" justify="center">
        <Grid.Container justify="center" alignItems="center">
          <Grid justify="center">
            <Container fluid as="form">
              <Card css={isDark ? { backgroundColor: "#1F1F1E" } : {}}>
                <Card.Header>
                  <Row justify="center">
                    <Text h2>
                      {emailSent
                        ? "Enter your new password"
                        : "Enter your email"}
                    </Text>
                  </Row>
                </Card.Header>
                <Card.Body>
                  <Spacer y={3} />
                  {emailSent ? (
                    <>
                      <Grid.Container direction="column" alignItems="center">
                        <Grid>
                          <Input.Password
                            width="400px"
                            aria-labelledby="Password"
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
                    </>
                  ) : (
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
                  )}
                </Card.Body>
                <Card.Footer>
                  {emailSent ? (
                    <Row justify="center">
                      <Button size="lg" color="primary">
                        Save Changes
                      </Button>
                    </Row>
                  ) : (
                    <Row justify="center">
                      <Button size="lg" color="primary">
                        Send Mail
                      </Button>
                    </Row>
                  )}
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

export default guestRouter(ForgotPassword);

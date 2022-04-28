import {
  Button,
  Card,
  Container,
  Grid,
  Input,
  Loading,
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
import { resetPassword, sendOtp, validateOtp } from "../axiosClient/reset-password.api";

const emailSentValidationSchema = yup.object().shape({
  email: yup
    .string()
    .email("Email must be valid")
    .required("Email cannot be empty"),
});

const otpValidationSchema = yup.object().shape({
  otp: yup.number().required("OTP cannot be blank")
})

const changePasswordValidationSchema = yup.object().shape({
  password: yup.string().required("Password cannot be empty"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Confirm password must match")
    .required("Confirm password cannot be empty"),
});

const ForgotPassword: NextPage = () => {
  const router = useRouter();

  const [email, setEmail] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const [step, setStep] = useState<number>(1);

  const {
    handleSubmit,
    register,
    setError,
    setValue,
    formState: { errors },
  } = useForm<any>({
    resolver: yupResolver(
      step === 1
        ? emailSentValidationSchema
        : step === 2
        ? otpValidationSchema
        : changePasswordValidationSchema
    ),
    mode: "onChange",
    defaultValues:
      step === 1
        ? {
            email: "",
          }
        : step === 2
        ? {
          otp: ""
        }
        : {
            password: "",
            confirmPassword: "",
          },
  });
  const { isDark } = useTheme();

  const handleSendMail = async (formData: any) => {
      const {email} = formData;
      setLoading(true);
      const {data, status} = await sendOtp(email);
      if(status !== 201) {
        setLoading(false);
        toast.error(data.message)
        return;
      }
      setEmail(email);
      setLoading(false);
      setStep(2);
  }
  
  const handleVerifyOtp = async (formData: any) => {
    const {otp} = formData;
    setLoading(true);
    const {data, status} = await validateOtp(email, parseInt(otp));
    if(status !== 200) {
      setError("otp", data?.message);
      toast.error(data?.message)
      setLoading(false);
      return;
    }
    setLoading(false)
    setStep(3);
  }

  const handleChangePassword = async (formData: any) => {
    const { password } = formData;
    setLoading(true);
    const { data, status } = await resetPassword(email, password);
    if (status !== 200) {
      toast.error(data.message);
      return;
    }
    router.push('/login');
  }

  const resendOtp = async (e: SyntheticEvent) => {
    e.preventDefault();
    setLoading(true);
    setValue('otp', "");
     await sendOtp(email);
    setEmail(email);
    setLoading(false);
    setStep(2);
  }

  return (
    <>
      <Head>
        <title>Password Recovery</title>
        <meta name="description" content="Password recovery" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container
        sm
        css={{ height: "100vh" }}
        display="flex"
        fluid
        alignItems="center"
        justify="center"
      >
        <Grid.Container justify="center" alignItems="center">
          <Grid justify="center">
            <Container fluid as="form">
              <Card css={isDark ? { backgroundColor: "#1F1F1E" } : {}}>
                <Card.Header>
                  <Row justify="center">
                    <Text h2>
                      {step === 1
                        ? "Enter your email"
                        : step === 2
                        ? "Enter the OTP"
                        : "Enter New Password"}
                    </Text>
                  </Row>
                </Card.Header>
                <Card.Body>
                  {step === 1 ? (
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
                  ) : step === 2 ? (
                    <>
                      <Grid.Container direction="column" alignItems="center">
                        <Grid>
                          <Input
                            width="400px"
                            aria-labelledby="Email"
                            placeholder="Email"
                            value={email}
                            bordered
                            disabled
                          />
                        </Grid>
                      </Grid.Container>
                      <Spacer y={1} />
                      <Grid.Container direction="column" alignItems="center">
                        <Grid>
                          <Input
                            width="400px"
                            aria-labelledby="otp"
                            placeholder="OTP (6 digits number)"
                            {...register("otp")}
                            clearable
                            bordered
                          />
                        </Grid>
                        <Grid>
                          <ErrorMessage
                            name="otp"
                            errors={errors}
                            render={({ message }) => (
                              <Text color="red">{message}</Text>
                            )}
                          />
                        </Grid>
                      </Grid.Container>
                    </>
                  ) : (
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
                  )}
                </Card.Body>
                <Card.Footer>
                  {step === 1 ? (
                    <Row justify="center">
                      <Button
                        size="lg"
                        color="primary"
                        onClick={handleSubmit(handleSendMail)}
                        bordered
                        disabled={loading}
                      >
                        {!loading ? (
                          "Send Mail"
                        ) : (
                          <Loading size="sm" type="points-opacity" />
                        )}
                      </Button>
                    </Row>
                  ) : step === 2 ? (
                    <>
                      <Row justify="center">
                        <Button
                          size="lg"
                          onClick={handleSubmit(handleVerifyOtp)}
                          disabled={loading}
                          bordered
                          color="primary"
                        >
                          {!loading ? (
                            "Verify"
                          ) : (
                            <Loading size="sm" type="points-opacity" />
                          )}
                        </Button>
                      </Row>
                      <Spacer y={1} />
                      <Row justify="center">
                        <Button
                          size="lg"
                          onClick={resendOtp}
                          disabled={loading}
                          bordered
                          color="primary"
                        >
                          {!loading ? (
                            "Resend"
                          ) : (
                            <Loading size="sm" type="points-opacity" />
                          )}
                        </Button>
                      </Row>
                    </>
                  ) : (
                    <Row justify="center">
                      <Button
                        size="lg"
                        onClick={handleSubmit(handleChangePassword)}
                        disabled={loading}
                        bordered
                        color="primary"
                      >
                        {!loading ? (
                          "Save Changes"
                        ) : (
                          <Loading size="sm" type="points-opacity" />
                        )}
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

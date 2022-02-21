import { FunctionComponent } from "react";
import { useTheme, Text, Row, Col, Grid, Card, Button } from "@nextui-org/react";


const MyComponent: FunctionComponent = () => {
  const { theme } = useTheme();

  return (
    <Grid.Container gap={2} justify="center">
      {/* Card 1 */}
      <Grid xs={12} sm={4}>
        <Card cover>
          <Card.Header css={{ position: "absolute", zIndex: 1, top: 5 }}>
            <Col>
              <Text
                size={12}
                weight="bold"
                transform="uppercase"
                color="#ffffffAA"
              >
                What to watch
              </Text>
              <Text h4 color="white">
                Stream the Acme event
              </Text>
            </Col>
          </Card.Header>
          <Card.Image
            src="https://scontent.fhan2-4.fna.fbcdn.net/v/t39.30808-6/253744934_1525334341151001_1558791742964505615_n.jpg?_nc_cat=100&ccb=1-5&_nc_sid=174925&_nc_ohc=tmgzRzReoGsAX_f7e1_&_nc_ht=scontent.fhan2-4.fna&oh=00_AT-w4FAZizRnu_-zv2F8fwhu7Pz9_b8mYRXXlUobqUkSZw&oe=62186287"
            height={340}
            width="100%"
            alt="Card image background"
          />
        </Card>
      </Grid>
      {/* Card 2 */}
      <Grid xs={12} sm={4}>
        <Card cover>
          <Card.Header css={{ position: "absolute", zIndex: 1, top: 5 }}>
            <Col>
              <Text
                size={12}
                weight="bold"
                transform="uppercase"
                color="#ffffffAA"
              >
                Plant a tree
              </Text>
              <Text h4 color="white">
                Contribute to the planet
              </Text>
            </Col>
          </Card.Header>
          <Card.Image
            src="https://scontent.fhan2-4.fna.fbcdn.net/v/t39.30808-6/250880893_1521823338168768_1668862606176789065_n.jpg?_nc_cat=103&ccb=1-5&_nc_sid=174925&_nc_ohc=H9fwqMi--d0AX_GYtoy&_nc_ht=scontent.fhan2-4.fna&oh=00_AT8hW8-pQN1y5XOBKQLEcFX893kLt24ywPFreKtK_W7F-g&oe=6218BF1A"
            height={340}
            width="100%"
            alt="Card image background"
          />
        </Card>
      </Grid>
      {/* Card 3 */}
      <Grid xs={12} sm={4}>
        <Card cover css={{ bg: "$black", w: "100%" }}>
          <Card.Header css={{ position: "absolute", zIndex: 1, top: 5 }}>
            <Col>
              <Text
                size={12}
                weight="bold"
                transform="uppercase"
                color="#ffffffAA"
              >
                Supercharged
              </Text>
              <Text h4 color="white">
                Creates beauty like a beast
              </Text>
            </Col>
          </Card.Header>
          <Card.Image
            src="https://scontent.fhan2-1.fna.fbcdn.net/v/t39.30808-6/238353410_1465980730419696_3684399029085894683_n.jpg?_nc_cat=102&ccb=1-5&_nc_sid=174925&_nc_ohc=8-Kvr9Y1Rh8AX9VHr4h&tn=7JhgQWAjmsTMR9CK&_nc_ht=scontent.fhan2-1.fna&oh=00_AT_c8wDhS6HUvZjNZchw2ZMlOkHxjJhekaCc05mPuHeKdg&oe=62198B43"
            height={340}
            width="100%"
            alt="Card image background"
          />
        </Card>
      </Grid>
      {/* Card 4 */}
      <Grid xs={12} sm={5}>
        <Card cover css={{ w: "100%" }}>
          <Card.Header css={{ position: "absolute", zIndex: 1, top: 5 }}>
            <Col>
              <Text
                size={12}
                weight="bold"
                transform="uppercase"
                color="#ffffffAA"
              >
                New
              </Text>
              <Text h3 color="black">
                Acme camera
              </Text>
            </Col>
          </Card.Header>
          <Card.Body>
            <Card.Image
              src="https://scontent.fhan2-2.fna.fbcdn.net/v/t39.30808-6/226226623_1452528755098227_8290577462303053992_n.jpg?_nc_cat=111&ccb=1-5&_nc_sid=174925&_nc_ohc=VduGM3ciq90AX_bmHHJ&_nc_ht=scontent.fhan2-2.fna&oh=00_AT_pMF_CmuH2ZaMhzvv4syx71ej_xcJc6I3VZrAnxeeQQg&oe=62198C47"
              height={400}
              width="100%"
              alt="Card example background"
            />
          </Card.Body>
          <Card.Footer
            blur
            css={{
              position: "absolute",
              bgBlur: "#ffffff",
              borderTop: "$borderWeights$light solid rgba(255, 255, 255, 0.2)",
              bottom: 0,
              zIndex: 1,
            }}
          >
            <Row>
              <Col>
                <Text color="#000" size={12}>
                  Available soon.
                </Text>
                <Text color="#000" size={12}>
                  Get notified.
                </Text>
              </Col>
              <Col>
                <Row justify="flex-end">
                  <Button flat auto rounded color="secondary">
                    <Text
                      css={{ color: "inherit" }}
                      size={12}
                      weight="bold"
                      transform="uppercase"
                    >
                      Notify Me
                    </Text>
                  </Button>
                </Row>
              </Col>
            </Row>
          </Card.Footer>
        </Card>
      </Grid>
      {/* Card 5 */}
      <Grid xs={12} sm={7}>
        <Card cover css={{ w: "100%", p: 0 }}>
          <Card.Header css={{ position: "absolute", zIndex: 1, top: 5 }}>
            <Col>
              <Text
                size={12}
                weight="bold"
                transform="uppercase"
                color="#9E9E9E"
              >
                Your day your way
              </Text>
              <Text h3 color="white">
                Your checklist for better sleep
              </Text>
            </Col>
          </Card.Header>
          <Card.Body>
            <Card.Image
              src="https://scontent.fhan2-4.fna.fbcdn.net/v/t1.6435-9/183542050_1401509100200193_6557865822780578732_n.jpg?_nc_cat=103&ccb=1-5&_nc_sid=174925&_nc_ohc=aY75YBP-SeMAX_wZSfE&_nc_ht=scontent.fhan2-4.fna&oh=00_AT9Ha3Ts3ziNBrQ3oOFjbkMNumYQIxXpGkTyn2tCAzEvwg&oe=6239EFCC"
              height={400}
              width="100%"
              alt="Relaxing app background"
            />
          </Card.Body>
          <Card.Footer
            blur
            css={{
              position: "absolute",
              bgBlur: "#0f1114",
              borderTop: "$borderWeights$light solid $gray700",
              bottom: 0,
              zIndex: 1,
            }}
          >
            <Row>
              <Col>
                <Row>
                  <Col span={3}>
                    <Card.Image
                      src="https://scontent.fhan2-4.fna.fbcdn.net/v/t1.6435-9/183542050_1401509100200193_6557865822780578732_n.jpg?_nc_cat=103&ccb=1-5&_nc_sid=174925&_nc_ohc=aY75YBP-SeMAX_wZSfE&_nc_ht=scontent.fhan2-4.fna&oh=00_AT9Ha3Ts3ziNBrQ3oOFjbkMNumYQIxXpGkTyn2tCAzEvwg&oe=6239EFCC"
                      css={{ background: "black" }}
                      height={40}
                      width={40}
                      alt="Breathing app icon"
                    />
                  </Col>
                  <Col>
                    <Text color="#d1d1d1" size={12}>
                      Breathing App
                    </Text>
                    <Text color="#d1d1d1" size={12}>
                      Get a good night's sleep.
                    </Text>
                  </Col>
                </Row>
              </Col>
              <Col>
                <Row justify="flex-end">
                  <Button
                    flat
                    auto
                    rounded
                    css={{ color: "#94f9f0", bg: "#94f9f026" }}
                  >
                    <Text
                      css={{ color: "inherit" }}
                      size={12}
                      weight="bold"
                      transform="uppercase"
                    >
                      Get App
                    </Text>
                  </Button>
                </Row>
              </Col>
            </Row>
          </Card.Footer>
        </Card>
      </Grid>
    </Grid.Container>
  );
};

export default MyComponent;

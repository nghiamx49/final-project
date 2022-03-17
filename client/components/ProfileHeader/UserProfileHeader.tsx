import { Container, Grid , Image, Avatar, Button, Text} from "@nextui-org/react";
import { FC } from "react";
import {FaEdit} from 'react-icons/fa/'
import ActiveProfileTab from "./ActiveProfileTab";

interface UserProfileProps {
  isYou: boolean
}

const UserProfileHeader: FC<UserProfileProps> = ({isYou}) => {
  return (
    <Container fluid css={{ position: "relative" }}>
      <Grid.Container direction="column" alignItems="center">
        <Grid css={{ positon: "relative" }}>
          <Image
            src="/images/default_cover.jpg"
            width={1200}
            height={500}
            objectFit="cover"
            css={{
              backgroundPosition: "center",
              borderTopLeftRadius: 0,
              borderTopRightRadius: 0,
            }}
          />
          {isYou && (
            <Button
              css={{
                position: "absolute",
                right: 100,
                bottom: "200px",
                backgroundColor: "transparent",
                display: "flex",
                gap: "7",
                alignItems: "center",
              }}
            >
              <FaEdit size={20} /> Edit Cover
            </Button>
          )}
        </Grid>
        <Grid>
          <Grid.Container
            justify="space-between"
            alignItems="center"
            css={{ width: 1100, marginTop: "-40px" }}
          >
            <Grid css={{ display: "flex", alignItems: "center", gap: 20 }}>
              <Avatar
                src="/images/default_avt.jpg"
                bordered
                zoomed
                size="xl"
                color="gradient"
                css={{ size: "$40", borderWidth: "5px" }}
              />
              <Text h2>Mai Xuan Nghia</Text>
            </Grid>
            <Grid>
              {isYou && (
                <Button size="sm">
                  <FaEdit size={20} />
                  Edit Profile
                </Button>
              )}
            </Grid>
          </Grid.Container>
        </Grid>
        <Grid
          css={{
            alignSelf: "flex-start",
            marginLeft: "40px",
            marginTop: 10,
            marginBottom: 10,
            display: "flex",
          }}
        >
          <ActiveProfileTab>Home</ActiveProfileTab>
          <Button light>Friends</Button>
          <Button light>Friends</Button>
        </Grid>
      </Grid.Container>
    </Container>
  );
};

export default UserProfileHeader;

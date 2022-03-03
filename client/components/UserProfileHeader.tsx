import { Container, Grid , Image, Avatar, Button} from "@nextui-org/react";
import { FC } from "react";
import {FaEdit} from 'react-icons/fa/'
import ActiveProfileTab from "./ActiveProfileTab";
const UserProfileHeader: FC = () => {
  return (
    <Container fluid css={{ position: "relative" }}>
      <Grid.Container direction="column" alignItems="center">
        <Grid css={{ positon: "relative" }}>
          <Image
            src="/images/default_cover.jpg"
            width={1200}
            height={500}
            objectFit="cover"
            css={{ backgroundPosition: "center" }}
          />
          <Button css={{ position: "absolute", right: 100, bottom: "200px" }}>
            <FaEdit size={20} /> Edit Cover
          </Button>
        </Grid>
        <Grid>
          <Grid.Container
            justify="space-between"
            alignItems="center"
            css={{ width: 1100, marginTop: "-40px" }}
          >
            <Grid>
              <Avatar
                src="/images/default_avt.jpg"
                bordered
                zoomed
                size="xl"
                color="gradient"
                css={{ size: "$40", borderWidth: "5px" }}
              />
            </Grid>
            <Grid>
              <Button size="sm">
                <FaEdit size={20} />
                Edit Profile
              </Button>
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

import { Container, Spacer } from "@nextui-org/react";
import { NextPage } from "next";
import FeedItem from "../../components/FeedItem";
import UserProfileHeader from "../../components/ProfileHeader/UserProfileHeader";

const testData = [
  {
    userId: 1,
    id: 1,
    title:
      "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
    body: "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto",
  },
  {
    userId: 1,
    id: 2,
    title: "qui est esse",
    body: "est rerum tempore vitae\nsequi sint nihil reprehenderit dolor beatae ea dolores neque\nfugiat blanditiis voluptate porro vel nihil molestiae ut reiciendis\nqui aperiam non debitis possimus qui neque nisi nulla",
  },
  {
    userId: 1,
    id: 3,
    title: "ea molestias quasi exercitationem repellat qui ipsa sit aut",
    body: "et iusto sed quo iure\nvoluptatem occaecati omnis eligendi aut ad\nvoluptatem doloribus vel accusantium quis pariatur\nmolestiae porro eius odio et labore et velit aut",
  },
];

const Profile: NextPage = () => {
    return (
      <Container fluid css={{padding: 0}}>
        <Container
          fluid
          css={{
            background:
              "linear-gradient(180deg, rgba(255,255,255,1) 0%, rgba(0,0,0,1) 100%, rgba(0,212,255,1) 100%);",
          }}
        >
          <Container fluid lg>
            <UserProfileHeader />
          </Container>
        </Container>
        <Spacer y={3} />
        <Container fluid xs>
        {testData.map(({userId, title, body}) => (
            <FeedItem userId={userId} title={title} body={body} />
        ))}
        </Container>
      </Container>
    );
}

export default Profile;
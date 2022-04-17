import type { NextPage } from 'next'
import Head from 'next/head'
import FeedItem from '../components/FeedItem'
import { Container} from '@nextui-org/react'
import protectedRoute from '../hocs/protectedRouter'

const testData = [
  {
    "userId": 1,
    "id": 1,
    "title": "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
    "body": "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto"
  },
  {
    "userId": 1,
    "id": 2,
    "title": "qui est esse",
    "body": "est rerum tempore vitae\nsequi sint nihil reprehenderit dolor beatae ea dolores neque\nfugiat blanditiis voluptate porro vel nihil molestiae ut reiciendis\nqui aperiam non debitis possimus qui neque nisi nulla"
  },
  {
    "userId": 1,
    "id": 3,
    "title": "ea molestias quasi exercitationem repellat qui ipsa sit aut",
    "body": "et iusto sed quo iure\nvoluptatem occaecati omnis eligendi aut ad\nvoluptatem doloribus vel accusantium quis pariatur\nmolestiae porro eius odio et labore et velit aut"
  }
]

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Home</title>
        <meta name="description" content="Traveling together" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container fluid xs css={{ margin: "auto" }}>
        {testData.map(({ userId, title, body }) => (
          <FeedItem userId={userId} title={title} body={body} />
        ))}
      </Container>
    </>
  );
}

export default protectedRoute(Home);

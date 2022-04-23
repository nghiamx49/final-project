import type { NextPage } from 'next'
import Head from 'next/head'
import FeedItem from '../components/FeedItem'
import { Container} from '@nextui-org/react'
import protectedRoute from '../hocs/protectedRouter'
import { SyntheticEvent, useCallback, useEffect, useState } from 'react'
import { ICreateFeed, IFeed } from '../interface/feedItem.interface'
import { connect } from 'react-redux'
import { IRootState } from '../store/interface/root.interface'
import { getAllPostsInNewFeed } from '../axiosClient/feed.api'
import { IAuthenciateState } from '../store/interface/authenticate.interface'
import CreatePost from '../components/postFeedModal'

interface HomePageProps {
  authenticateReducer: IAuthenciateState
}

const Home: NextPage<HomePageProps> = ({authenticateReducer}) => {
  const [allPosts, setAllPosts] = useState<IFeed[]>([]);
  const {token,user} = authenticateReducer;

const loadNewFeed = useCallback(async () => {
  const { data, status } = await getAllPostsInNewFeed(token);
  if (status === 200 || 304) {
    setAllPosts(data.data);
  }
}, [token]);


useEffect(() => {loadNewFeed()}, [loadNewFeed])

  return (
    <>
      <Head>
        <title>Home</title>
        <meta name="description" content="Traveling together" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container fluid xs css={{ margin: "auto" }}>
        <CreatePost user={user} reload={loadNewFeed} token={token} />
        {allPosts.map((item, index) => (
          <FeedItem
            key={item._id}
            item={item}
            currentUser={user}
            token={token}
          />
        ))}
      </Container>
    </>
  );
}

const mapStateToProps = (state: IRootState) => {
  return {
    authenticateReducer: state.authenticateReducer
  }
}

export default connect(mapStateToProps)(protectedRoute(Home));

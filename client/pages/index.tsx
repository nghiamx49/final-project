import type { NextPage } from 'next'
import Head from 'next/head'
import FeedItem from '../components/FeedItem'
import { Container, Loading, Row} from '@nextui-org/react'
import protectedRoute from '../hocs/protectedRouter'
import { SyntheticEvent, useCallback, useEffect, useRef, useState } from 'react'
import { ICreateFeed, IFeed } from '../interface/feedItem.interface'
import { connect } from 'react-redux'
import { IRootState } from '../store/interface/root.interface'
import { getAllPostsInNewFeed } from '../axiosClient/feed.api'
import { IAuthenciateState } from '../store/interface/authenticate.interface'
import CreatePost from '../components/postFeedModal'
import AppLoading from '../components/Loading'

interface HomePageProps {
  authenticateReducer: IAuthenciateState
}

const Home: NextPage<HomePageProps> = ({authenticateReducer}) => {
  const [allPosts, setAllPosts] = useState<IFeed[]>([]);
  const {token,user} = authenticateReducer;
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPage, setTotalPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);

const loadNewFeed = useCallback(async () => {
  if(currentPage > totalPage) {
    console.log('end');
    setLoading(false);
    return;
  }
  const { data, status } = await getAllPostsInNewFeed(token, currentPage);
  if (status === 200 || 304) {
    setAllPosts((prev) => [...prev, ...data.data]);
    setTotalPage(data.totalPage);
    setLoading(false);
  }
}, [token, currentPage]);

const removeFeedById = (_id: string) => {
  const index = allPosts.findIndex(item => item._id === _id);
  let updateData = [...allPosts];
  updateData.splice(index, 1);
  setAllPosts(updateData)
}

const loadMore = () => {
  if (
    window.innerHeight + document.documentElement.scrollTop ===
      document.documentElement.offsetHeight
  ) {
     setCurrentPage((prev) => prev + 1);
     setLoading(true);
  }
}

useEffect(() => {
   window.addEventListener("scroll", loadMore);
   return () => window.removeEventListener("scroll", loadMore);
 }, [])

useEffect(() => {
  loadNewFeed();
 
}, [loadNewFeed]);

  return (
    <>
      <Head>
        <title>Home</title>
        <meta name="description" content="Traveling together" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container fluid xs css={{ margin: "auto", w: "100%" }}>
        <CreatePost
          user={user}
          setAllPosts={setAllPosts}
          token={token}
        />
        {allPosts.map((item, index) => (
          <FeedItem
            key={item._id}
            item={item}
            currentUser={user}
            token={token}
            removeFeedById={removeFeedById}
          />
        ))}
        {loading && (
          <Row
            justify="center"
            align="center"
            css={{ w: "100%", padding: 0, margin: 0 }}
          >
            <Loading type="points" size="xl" />
          </Row>
        )}
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

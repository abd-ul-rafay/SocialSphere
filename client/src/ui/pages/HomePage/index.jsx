import FriendsContainer from "../../components/FriendsContainer";
import PostsContainer from "../../components/PostsContainer";
import UserContainer from "../../components/UserContainer";
import AdsContainer from "../../components/AdsContainer";
import SearchPosts from "../../components/SearchPosts";
import AddPost from "../../components/AddPost";

const HomePage = () => {
  return (
    <section className="home-container">
      <div className="home-page-sec">
        <div className="home-first-container">
          <UserContainer />
          <FriendsContainer />
        </div>
        <div className="home-second-container">
          <SearchPosts />
          <AddPost />
          <PostsContainer />
        </div>
        <AdsContainer />
      </div>
    </section>
  )
}

export default HomePage;

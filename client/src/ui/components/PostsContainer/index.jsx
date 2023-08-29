import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllPosts } from "../../../state/slices/postsSlice";
import PostContainer from "./PostContainer";
import BeatLoader from "react-spinners/BeatLoader";

const PostsContainer = ({ self = true }) => {
    const token = useSelector(state => state.auth.token);
    const isLoading = useSelector(state => state.posts.isLoading);

    const posts = self
        ? useSelector(state => state.posts.list)
        : useSelector(state => state.profile.posts);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchAllPosts({ token, query: '' }));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


    return (
        <section>
            {
                isLoading && posts.length < 1 && 
                    (<div className="posts-loading">

                        <BeatLoader
                            color='var(--txt-color)'
                            loading={isLoading}
                            size={5}
                            speedMultiplier={1.5}
                        />
                    </div>)
            }
            {
                posts.length > 0
                    ? posts.map(post => <PostContainer key={post._id} {...post} />)
                    : <p className="small-text widget" style={{ marginTop: '0.5rem' }}>{isLoading ? 'Loading...' : 'No post found'}</p>
            }
        </section>
    )
}

export default PostsContainer;

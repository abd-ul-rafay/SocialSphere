import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllPosts } from "../../state/slices/postsSlice";

const SearchPosts = () => {
  const [search, setSearch] = useState('');
  const dispatch = useDispatch();
  const token = useSelector(state => state.auth.token);

  const handleOnClick = () => {
    dispatch(fetchAllPosts({ token, query: search }));
  }

  return (
    <section className="widget search-posts">
      <input type="text" name="search" placeholder="Search for posts..." value={search} onChange={(e) => setSearch(e.target.value)} />
      <p className="small-text" onClick={handleOnClick}>Search</p>
    </section>
  )
}

export default SearchPosts;

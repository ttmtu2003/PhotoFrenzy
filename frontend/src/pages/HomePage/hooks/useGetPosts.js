import { useEffect, useState } from 'react';
import axios from 'axios';

const useGetPosts = ({ userId }) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    async function fetchUserPosts() {
      const res = await axios.get(`/posts?user_id=${userId}`);
      const userPosts = res.data;
      setPosts(userPosts);
    }

    fetchUserPosts();
  }, [userId]);
  return posts;
}

export default useGetPosts;
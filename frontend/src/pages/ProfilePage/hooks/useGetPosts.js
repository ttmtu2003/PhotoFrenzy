import { useEffect, useState } from 'react';
import axios from 'axios';

const useUserPosts = ({ userToken }) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    async function fetchUserPosts() {
      const res = await axios.get(`/posts?user_token=${userToken}`);
      const userPosts = res.data;
      
      setPosts(userPosts);
    }

    fetchUserPosts();
  }, [userToken]);
  return posts;
}

export default useUserPosts;
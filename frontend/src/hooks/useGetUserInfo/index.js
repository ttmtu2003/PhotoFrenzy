import { useState, useEffect } from 'react';
import axios from 'axios';

const useGetUserInfo = ({ userId }) => {
  const [userInfo, setUserInfo] = useState({});
  const [error, setError] = useState('')
  useEffect(() => {
    async function getUserInfo() {
      try {
        const res = await axios.get(`/user-detail?id=${userId}`);
        const userInfo = res.data; 
        setUserInfo(userInfo);
      } catch (error) {
        setError(error);
      }
    }

    getUserInfo();
  }, [userId]);
  return userInfo;
}
export default useGetUserInfo;



import { useState, useEffect } from 'react';
import axios from 'axios';

const useGetUserInfo = ({ userId }) => {
  const [userInfo, setUserInfo] = useState({});

  useEffect(() => {
    async function getUserInfo() {
      // console.log("USeR IF HERE", userId)
      const res = await axios.get(`/user-detail?id=${userId}`);
      const userInfo = res.data; 
      setUserInfo(userInfo);
    }

    getUserInfo();
  }, [userId]);
  return userInfo;
}
export default useGetUserInfo;



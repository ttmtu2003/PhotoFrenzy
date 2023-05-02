import React from 'react'
// comps
import UserNavbar from "../../components/NavBar/NavBar"
import Posts from "../../components/Posts/Posts"
// local
import Header from "./components/Header/Header"
import useUserPosts from "./hooks/useGetPosts"
// assets
import mockData1 from "../../assets/pictures/mockData1.jpg"
import mockData2 from "../../assets/pictures/mockData2.jpg"
import mockData3 from "../../assets/pictures/mockData3.jpg"
// hook
import useGetUserInfo from '../../hooks/useGetUserInfo'

const images = [
  {
    id: '123',
    thumbnail: mockData3,
    width: '10px',
    height: '30%',
    author: 'maya_12',
    title: 'taylor singing',
    link: 'localhost:3001/pic',
    caption: 'taylor singing',
  },
  {
    id: '1234',
    thumbnail: mockData2,
    width: '30%',
    height: '30%',
    author: 'maya_12',
    title: 'taylor singing',
    link: 'localhost:3001/pic',
    caption: 'taylor singing',
  },
  {
    id: '12345',
    thumbnail: mockData3,
    width: '100%',
    height: '100%',
    author: 'maya_12',
    title: 'taylor singing',
    link: 'localhost:3001/pic',
    caption: 'taylor singing',
  },
  {
    id: '123456',
    thumbnail: mockData1,
    width: '10px',
    height: '30%',
    author: 'maya_12',
    title: 'taylor singing',
    link: 'localhost:3001/pic',
    caption: 'taylor singing ALL TOO WELL - 03082020',
  },
  {
    id: '1234567',
    thumbnail: mockData2,
    width: '30%',
    height: '30%',
    author: 'maya_12',
    title: 'taylor singing',
    link: 'localhost:3001/pic',
    caption: 'taylor singing ALL TOO WELL - 03082020',
  },
  {
    id: '12345678',
    thumbnail: mockData3,
    width: '100%',
    height: '100%',
    author: 'maya_12',
    title: 'taylor singing',
    link: 'localhost:3001/pic',
    caption: 'taylor singing ALL TOO WELL - 03082020',
  },
];

const ProfilePage = () => {
  const userId = window.localStorage.getItem('id')

  // user 
  const posts = useUserPosts({ userId })
  const userInfo = useGetUserInfo({ userId })
  // console.log("PSOT", posts)

  return (
    <div>
      <UserNavbar />
      <Header user={userInfo} className="t-mt-[6rem]" />
      <Posts posts={posts} />
    </div>
  )
}

export default ProfilePage
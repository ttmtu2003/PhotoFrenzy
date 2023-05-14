import React from 'react'
// comps
import UserNavbar from "../../components/NavBar/NavBar"
import Posts from "../../components/Posts/Posts"
// local
import Header from "./components/Header/Header"
import useUserPosts from "./hooks/useGetPosts"
// hook
import useGetUserInfo from '../../hooks/useGetUserInfo'

const ProfilePage = () => {
  const userId = window.localStorage.getItem('id')

  // user 
  const posts = useUserPosts({ userId })
  const userInfo = useGetUserInfo({ userId })

  return (
    <div>
      <UserNavbar />
      <Header user={userInfo} className="t-mt-[6rem]" />
      <Posts posts={posts} />
    </div>
  )
}

export default ProfilePage
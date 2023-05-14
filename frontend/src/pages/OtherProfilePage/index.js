import UserNavbar from "../../components/NavBar/NavBar"
import Header from "./components/Header/Header"
import Posts from "../../components/Posts/Posts"
import { useParams } from "react-router-dom/cjs/react-router-dom.min"
import useGetUserInfo from "../../hooks/useGetUserInfo"
import useUserPosts from "../ProfilePage/hooks/useGetPosts"

const OtherProfilePage = () => {
  const { id } = useParams()

  const userInfo = useGetUserInfo({ userId: id });
  // user posts
  const posts = useUserPosts({ userId: id })

  return (
    <div>
      <UserNavbar />
      <Header user={userInfo} className="t-mt-[6rem]" />
      <Posts posts={posts} />
    </div>
  )
}

export default OtherProfilePage
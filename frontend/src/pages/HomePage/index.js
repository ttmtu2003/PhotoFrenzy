import UserNavbar from "../../components/NavBar/NavBar"
import Posts from "../../components/Posts/Posts"
import PostButton from "./components/PostButton/PostButton"
import useGetPosts from "./hooks/useGetPosts"

const HomePage = () => {
  const userId = window.localStorage.getItem('id')
  
  // get posts of all the users current user is following
  const posts = useGetPosts({ userId })
  return(
    <div className="t-h-full">
      <UserNavbar />
      <div>
        <PostButton />
        <Posts posts={posts} className="t-mt-[4rem]" />
      </div>
    </div>
  )
}

export default HomePage
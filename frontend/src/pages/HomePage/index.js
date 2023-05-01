import UserNavbar from "../../components/NavBar/NavBar"
import Posts from "../../components/Posts/Posts"
import mockData1 from "../../assets/pictures/mockData1.jpg"
import mockData2 from "../../assets/pictures/mockData2.jpg"
import mockData3 from "../../assets/pictures/mockData3.jpg"
import PostButton from "./components/PostButton/PostButton"
import useUserPosts from "../ProfilePage/hooks/useGetPosts"

const images = [
  {
    id: '123',
    thumbnail: mockData1,
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
    caption: 'taylor singing',
  },
  {
    id: '1234567',
    thumbnail: mockData2,
    width: '30%',
    height: '30%',
    author: 'maya_12',
    title: 'taylor singing',
    link: 'localhost:3001/pic',
    caption: 'taylor singing',
  },
  {
    id: '12345678',
    thumbnail: mockData3,
    width: '100%',
    height: '100%',
    author: 'maya_12',
    title: 'taylor singing',
    link: 'localhost:3001/pic',
    caption: 'taylor singing',
  },
];

const HomePage = () => {
  const posts = useUserPosts({ userId: '' })
  // console.log("HOME PAGE", posts)
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
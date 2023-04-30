import UserNavbar from "../../components/NavBar/NavBar"
import Header from "./components/Header/Header"
import Posts from "../../components/Posts/Posts"
import mockData1 from "../../assets/pictures/mockData1.jpg"
import mockData2 from "../../assets/pictures/mockData2.jpg"
import mockData3 from "../../assets/pictures/mockData3.jpg"
import useGetUserInfo from "./hooks/useGetUserInfo"
import { useParams } from "react-router-dom/cjs/react-router-dom.min"

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

const OtherProfilePage = () => {
  const { userId } = useParams()

  // const { userInfo, isLoading, error } = useGetUserInfo({ userId });

  // if (isLoading) {
  //   return <div>Loading...</div>;
  // }

  // if (error) {
  //   return <div>Error: {error.message}</div>;
  // }

  return (
    <div>
      <UserNavbar />
      {/* <Header user={userInfo} className="t-mt-[6rem]" /> */}
      <Header className="t-mt-[6rem]" />
      <Posts posts={images} />
    </div>
  )
}

export default OtherProfilePage
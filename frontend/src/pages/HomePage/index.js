import UserNavbar from "../../components/NavBar/NavBar"
import Posts from "../../components/Posts/Posts"
import mockData1 from "../../assets/pictures/mockData1.jpg"
import mockData2 from "../../assets/pictures/mockData2.jpg"
import mockData3 from "../../assets/pictures/mockData3.jpg"
import PostButton from "./components/PostButton/PostButton"

const images = [
  {
    thumbnail: mockData1,
    width: '10px',
    height: '30%',
    author: '123123',
    title: 'taylor singing',
    link: 'localhost:3001/pic',
    caption: 'taylor singing',
  },
  {
    thumbnail: mockData2,
    width: '30%',
    height: '30%',
    author: 'maya_123123123',
    title: 'taylor singing',
    link: 'localhost:3001/pic',
    caption: 'taylor singing',
  },
  {
    thumbnail: mockData3,
    width: '100%',
    height: '100%',
    author: '123123123',
    title: 'taylor singing',
    link: 'localhost:3001/pic',
    caption: 'taylor singing',
  },
  {
    thumbnail: mockData1,
    width: '10px',
    height: '30%',
    author: '345345345',
    title: 'taylor singing',
    link: 'localhost:3001/pic',
    caption: 'taylor singing',
  },
  {
    thumbnail: mockData2,
    width: '30%',
    height: '30%',
    author: '566756756',
    title: 'taylor singing',
    link: 'localhost:3001/pic',
    caption: 'taylor singing',
  },
  {
    thumbnail: mockData3,
    width: '100%',
    height: '100%',
    author: '2342423',
    title: 'taylor singing',
    link: 'localhost:3001/pic',
    caption: 'taylor singing',
  },
];

const HomePage = () => {
  return(
    <div className="t-h-full">
      <UserNavbar />
      <div>
        <PostButton />
        <Posts images={images} className="t-mt-[4rem]" />
      </div>
    </div>
  )
}

export default HomePage
import UserNavbar from "../../components/NavBar/NavBar"
import Header from "./components/Header/Header"
import Posts from "../../components/Posts/Posts"
import mockData1 from "../../assets/pictures/mockData1.jpg"
import mockData2 from "../../assets/pictures/mockData2.jpg"
import mockData3 from "../../assets/pictures/mockData3.jpg"

const images = [
  {
    thumbnail: mockData1,
    width: '10px',
    height: '30%',
    author: 'maya_12',
    title: 'taylor singing',
    link: 'localhost:3001/pic',
    caption: 'taylor singing all too Well YEAYEAYEAYAE',
  },
  {
    thumbnail: mockData2,
    width: '30%',
    height: '30%',
    author: 'maya_12',
    title: 'taylor singing',
    link: 'localhost:3001/pic',
    caption: 'taylor singing',
  },
  {
    thumbnail: mockData3,
    width: '100%',
    height: '100%',
    author: 'maya_12',
    title: 'taylor singing',
    link: 'localhost:3001/pic',
    caption: 'taylor singing',
  },
  {
    thumbnail: mockData1,
    width: '10px',
    height: '30%',
    author: 'maya_12',
    title: 'taylor singing',
    link: 'localhost:3001/pic',
    caption: 'taylor singing',
  },
  {
    thumbnail: mockData2,
    width: '30%',
    height: '30%',
    author: 'maya_12',
    title: 'taylor singing',
    link: 'localhost:3001/pic',
    caption: 'taylor singing all too Well YEAYEAYEAYAE',
  },
  {
    thumbnail: mockData3,
    width: '100%',
    height: '100%',
    author: 'maya_12',
    title: 'taylor singing',
    link: 'localhost:3001/pic',
    caption: 'taylor singing',
  },
];

const ProfilePage = () => {

  return (
    <div>
      <UserNavbar />
      <Header className="t-mt-[6rem]" />
      <Posts images={images} />
    </div>
  )
}

export default ProfilePage
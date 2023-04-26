import UserNavbar from "../../components/NavBar/NavBar"
import NewFeed from "../../components/NewFeed/NewFeed"

const HomePage = () => {
  return(
    <div className="t-h-full">
      <UserNavbar />
      <NewFeed />
    </div>
  )
}

export default HomePage
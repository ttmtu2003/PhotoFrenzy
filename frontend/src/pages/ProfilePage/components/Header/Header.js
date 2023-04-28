import Avatar from "../../../../components/Avatar/Avatar"
import cls from 'classnames'

const mockData = {
  username: 'taylorswift',
  profilePic: '/static/src/assets/pictures/mockData1.jpg',
  bio: 'I’m the problem, it’s me',
  followers: '1000',
  followings: '0',
}

const Header = ({ className }) => {

  return (
    <div className={cls(className, 't-ml-[4rem] t-flex')}>
      <Avatar img={mockData.profilePic} imgHeight="6rem" imgWidth="6rem" className="t-w-[6rem] t-h-[6rem]" />

      {/* name and bio */}
      <div className="t-ml-[2rem] t-flex t-flex-1 t-flex-col t-justify-center">
        <h1 className="t-font-bold">{mockData.username}</h1>
        <p className="mt-2">{mockData.bio}</p>
      </div>

      {/* followers */}
      <div className="t-flex t-flex-col t-justify-center t-items-center">
        <h1 className="t-font-bold">{mockData.followers}</h1>
        <p className="mt-2">Followers</p>
      </div>

      {/* followings */}
      <div className="mx-5 t-flex t-flex-col t-justify-center t-items-center">
        <h1 className="t-font-bold">{mockData.followings}</h1>
        <p className="mt-2">Followings</p>
      </div>
    </div>
    
  )
}

export default Header
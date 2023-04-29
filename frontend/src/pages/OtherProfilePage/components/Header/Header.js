import { useState } from "react";
import Avatar from "../../../../components/Avatar/Avatar"
import cls from 'classnames'
import { useParams } from "react-router-dom";
import { Check } from "react-feather";

const mockData = {
  username: 'taylorswift',
  profilePic: '/static/src/assets/pictures/mockData1.jpg',
  bio: 'I’m the problem, it’s me',
  followers: '1000',
  followings: '0',
}

const Header = ({ className }) => {
  const [isFollowing, setIsFollowing] = useState(false)
  const [user, setUser] = useState(null);
  const { userId } = useParams();

  // useEffect(() => {
  //   axios.get(`/users/${userId}`)
  //     .then(response => {
  //       setUser(response.data);
  //     })
  //     .catch(error => {
  //       console.log(error);
  //     });
  // }, [userId])

  return (
    <div className={cls(className, 't-ml-[3rem] t-flex')}>
      <Avatar img={mockData.profilePic} imgHeight="6rem" imgWidth="6rem" className="t-w-[6rem] t-h-[6rem]" />

      {/* name and bio */}
      <div className="t-ml-[2rem] t-flex t-flex-1 t-flex-col t-justify-center">
        <div className="t-flex t-items-center">
          <h1 className="t-font-bold">{mockData.username}</h1>
          {isFollowing ? (
            <button onClick={() => setIsFollowing((prev) => !prev)} className='ml-4 t-bg-[#BCBCBC] t-w-[8rem] t-flex t-justify-center t-rounded-sm t-text-white t-items-center t-font-semibold py-1'><Check size={18} className="mr-2" /> Following</button>
          ) : (
            <button className='ml-4 t-bg-[#64BCED] t-text-white t-w-[5rem] t-h-[2rem] t-rounded-sm t-font-semibold' onClick={() => setIsFollowing((prev) => !prev)}>Follow</button>
          )}
        </div>
        
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
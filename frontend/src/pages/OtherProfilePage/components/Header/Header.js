import { useEffect, useState } from "react";
import Avatar from "../../../../components/Avatar/Avatar"
import cls from 'classnames'
import { Check } from "react-feather";
import useFollowUser from "../../hooks/useFollowUser";
import useUnfollowUser from "../../hooks/useUnfollowUser";
import axios from "axios";

const mockUser = {
  username: 'taylorswift',
  profilePic: '/static/src/assets/pictures/mockData1.jpg',
  bio: 'I’m the problem, it’s me',
  followers: '1000',
  followings: '0',
}

const Header = ({ className, user }) => {

  const currUId = window.localStorage.getItem('id')
  const { followUser } = useFollowUser({ userId: user.id, currUId })
  const { unfollowUser } = useUnfollowUser({ userId: user.id, currUId })

  const [isFollowing, setIsFollowing] = useState(false);

  // handle unfollow user
  const handleUnfollow = () => {
    setIsFollowing(false)
    unfollowUser()
  }

  // handle follow user
  const handleFollow = () => {
    setIsFollowing(true)
    followUser()
  }

  // set is following status
  useEffect(() => {
    const getIsFollowing = async () => {
      try {
        const response = await axios.get(`/is-following?user_id=${user.id}&curr_user_id=${currUId}`);
        setIsFollowing(response.data.isFollowing);
      } catch (error) {
        console.log(error);
      }
    };

    getIsFollowing();
  }, [user.id]);

  return (
    <div className={cls(className, 't-ml-[3rem] t-flex')}>
      <Avatar img={user.avatar} imgHeight="6rem" imgWidth="6rem" className="t-w-[6rem] t-h-[6rem]" />

      {/* name and bio */}
      <div className="t-ml-[2rem] t-flex t-flex-1 t-flex-col t-justify-center">
        <div className="t-flex t-items-center">
          <h1 className="t-font-bold">{user.username}</h1>
          {isFollowing ? (
            <button onClick={handleUnfollow} className='ml-4 t-bg-[#BCBCBC] t-w-[8rem] t-flex t-justify-center t-rounded-sm t-text-white t-items-center t-font-semibold py-1'><Check size={18} className="mr-2" /> Following</button>
          ) : (
            <button className='ml-4 t-bg-[#64BCED] t-text-white t-w-[5rem] t-h-[2rem] t-rounded-sm t-font-semibold' onClick={handleFollow}>Follow</button>
          )}
        </div>
        
        <p className="mt-2">{user.bio}</p>
      </div>

      {/* followers */}
      <div className="t-flex t-flex-col t-justify-center t-items-center">
        <h1 className="t-font-bold">{user.follower_count}</h1>
        <p className="mt-2">Followers</p>
      </div>

      {/* followings */}
      <div className="mx-5 t-flex t-flex-col t-justify-center t-items-center">
        <h1 className="t-font-bold">{user.following_count}</h1>
        <p className="mt-2">Followings</p>
      </div>
    </div>
    
  )
}

export default Header
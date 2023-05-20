import { useEffect, useState } from "react";
import cls from 'classnames'
import { Check } from "react-feather";
import axios from "axios";
// components
import Avatar from "../../../../components/Avatar/Avatar"
// hooks
import useFollowUser from "../../hooks/useFollowUser";
import useUnfollowUser from "../../hooks/useUnfollowUser";

const Header = ({ className, user }) => {
  // user id
  const currUId = window.localStorage.getItem('id')

  // follow state
  const [isFollowing, setIsFollowing] = useState(false);
  const [followerCount, setFollowerCount ] = useState(0)

  const { error, followUser } = useFollowUser({ userId: user.id, currUId })
  const { errorMsg, unfollowUser } = useUnfollowUser({ userId: user.id, currUId })

  useEffect(() => {
    setFollowerCount(user.follower_count)
  }, [user])

  // handle unfollow user
  const handleUnfollow = () => {
    setIsFollowing(false)
    setFollowerCount(prev => prev-1)
    unfollowUser()
  }

  // handle follow user
  const handleFollow = () => {
    setIsFollowing(true)
    setFollowerCount(prev => prev+1)
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
      {user.avatar !== undefined && <Avatar img={user.avatar} imgHeight="6rem" imgWidth="6rem" imgClassName="t-w-[6rem] t-h-[6rem]" />}

      {/* name and bio */}
      <div className="t-ml-[2rem] t-flex t-flex-1 t-flex-col t-justify-center">
        <div className="t-flex t-items-center">
          <h1 className="t-font-bold">{user.username}</h1>
          {isFollowing ? (
            <div className="t-flex">
              <button onClick={handleUnfollow} className='ml-4 t-bg-[#BCBCBC] t-w-[8rem] t-flex t-justify-center t-rounded-sm t-text-white t-items-center t-font-semibold py-1'><Check size={18} className="mr-2" /> Following</button>
              {errorMsg && <div className="ml-3 t-text-red-500">{errorMsg}</div>}
            </div>
          ) : (
            <div className="t-flex">
              <button className='ml-4 t-bg-[#64BCED] t-text-white t-w-[5rem] t-h-[2rem] t-rounded-sm t-font-semibold' onClick={handleFollow}>Follow</button>
              {error && <div className="ml-3 t-text-red-500">{error}</div>}
            </div>
          )}
        </div>
        
        <p className="mt-2">{user.bio}</p>
      </div>

      {/* followers */}
      <div className="t-flex t-flex-col t-justify-center t-items-center">
        <h1 className="t-font-bold">{followerCount}</h1>
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
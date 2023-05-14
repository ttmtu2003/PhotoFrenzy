import cls from 'classnames'
import { useState } from "react"
import { Edit3 } from "react-feather"
import { Button } from "reactstrap"
// comps
import Avatar from "../../../../components/Avatar/Avatar"
// hooks
import useUpdateProfile from "../../hooks/useUpdateProfile"

const Header = ({ className, user }) => {
  const [uploadable, setUploadable] = useState(false)
  const [newBio, setNewBio] = useState(user.bio)
  const [newAvatar, setNewAvatar] = useState(null)
  const { updateProfile } = useUpdateProfile({ userId: user.id })

  // on update
  const handleSave = async () => {
    const res = await updateProfile({ bio: newBio, avatar: newAvatar })
    setUploadable(false)
    window.location.reload()
  }

  // on cancel
  const handleCancel = () => {
    setUploadable(false)
  }

  // on edit button click
  const handleEditProfile = () => {
    setUploadable(true)
  }

  return (
    <div className={cls(className, 't-ml-[3rem] t-flex')}>
      {user.avatar !== undefined && <Avatar newAvatar={newAvatar} setNewAvatar={setNewAvatar} img={user.avatar ? user.avatar : null} imgHeight="6rem" imgWidth="6rem" className="t-w-[6rem] t-h-[6rem]" uploadable={uploadable} />}

      {/* name and bio */}
      <div className="t-flex-1 t-flex-1 t-flex">
        <div className="t-ml-[2rem] t-w-[17rem] t-flex t-flex-col t-justify-center">
          <div className="t-flex">
            {/* username */}
            <h1 className="t-font-bold">{user.username}</h1>

            {/* edit button */}
            {!uploadable && <div onClick={handleEditProfile}><Edit3 className="hover:t-cursor-pointer ml-5" size={20} /></div>}

            {/* save and cancel buttons */}
            {uploadable && <div className="t-flex t-items-center ml-5">
              <Button className="t-text-[0.9rem] py-0 t-bg-[#098DED] hover:t-bg-[#077ACD] active:t-bg-[#077ACD] t-border-[#098DED]" onClick={handleSave}>Save</Button>
              <Button className="ml-1 t-text-[0.9rem] py-0 t-border-[#098DED] hover:t-bg-[#DCDCDC] hover:t-border-[#DCDCDC] !t-text-[#098DED]" onClick={handleCancel}>Cancel</Button>
            </div>}
          </div>

          {/* bio */}
          {uploadable ? <input placeholder="Bio" type="textarea" className="focus:t-outline-none focus:t-shadow-none mt-3 px-2 t-w-full t-rounded-sm" value={newBio} onChange={(e) => setNewBio(e.target.value)} /> : <p id="bio" className="mt-2" value={user.bio}>{user.bio}</p>}
        </div>
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
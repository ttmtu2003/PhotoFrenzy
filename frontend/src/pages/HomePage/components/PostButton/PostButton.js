import { Plus } from "react-feather"
import { useHistory } from "react-router-dom"

const PostButton = () => {
  const history = useHistory()

  const goUploadPhoto = () => {
    history.push('/post-photo')
  }

  return (
    <div className="t-fixed t-z-30 t-top-0 t-flex t-items-end t-justify-center pb-5">
      <button onClick={goUploadPhoto} className="t-fixed t-bg-[#fff] t-outline-0 t-bottom-[2rem] t-left-1/2 t-translate-x--1/2 t-rounded-full t-p-[1rem] t-drop-shadow hover:t-bg-[#F4F4F4] active:t-bg-[#DFDFDF]">
        <Plus size={60} className="t-text-[#098DED]" />
      </button>
    </div>
  )
}

export default PostButton
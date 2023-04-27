import { Plus } from "react-feather"

const PostButton = () => {
  return (
    <div className="t-fixed t-z-30 t-top-0 t-flex t-h-full t-w-full t-items-end t-justify-center pb-5">
      <button className="t-bg-[#fff] t-outline-0 t-absolute t-rounded-full t-p-[1rem] t-drop-shadow hover:t-bg-[#F4F4F4] active:t-bg-[#DFDFDF]">
        <Plus size={60} className="t-text-[#098DED]" />
      </button>
    </div>
  )
}

export default PostButton
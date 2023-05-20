import { forwardRef, useState } from 'react'
import { Image } from 'react-feather'
import classnames from 'classnames'
// assets
import defaultAvatar from '../../assets/pictures/default-avatar.jpg'
// locals
import './style.scss'

const Avatar = forwardRef((props, ref) => {
  const {
    className,
    img,
    imgHeight,
    imgWidth,
    imgClassName,
    uploadable = false,
    tag: Tag,
    onUpload,
    newAvatar,
    setNewAvatar,
    ...rest
  } = props

  const [image, setImage] = useState(img)

  // upload avatar if uploadable is true
  const handleClick = () => {
    if (uploadable) {
      const input = document.createElement('input')
      input.type = 'file'
      input.accept = 'image/*'
      input.style.display = 'none'
      input.addEventListener('change', handleFileSelect)
      document.body.appendChild(input)
      input.click()
      document.body.removeChild(input)
    }
  }

  const handleFileSelect = (event) => {
    const file = event.target.files[0]
    const reader = new FileReader()
    reader.onload = (event) => {
      const imageData = event.target.result
      setImage(imageData)
      setNewAvatar(imageData)
    }
    reader.readAsDataURL(file)
  }

  return (
    <div
      className={classnames('avatar', {
        [className]: className,
      })}
      {...rest}
      onClick={handleClick}
    >
      <img
        className={classnames({
          [imgClassName]: imgClassName,
        })}
        src={newAvatar || image || defaultAvatar}
        height={imgHeight ? imgHeight : '100%'}
        width={imgWidth ? imgWidth : '100%'}
      />
      {uploadable && (
        <div className="overlay-background t-flex t-justify-center t-items-center hover:t-bg-[#353535] t-absolute t-opacity-[0.45] t-transition-all t-w-full t-h-full t-duration-200 t-rounded-full">
          <Image size={30} className='img-icon t-opacity-0 t-text-white' />
        </div>
      )}
    </div>
  )
})

export default Avatar
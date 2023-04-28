import { forwardRef } from 'react'
import classnames from 'classnames'
import './style.scss'

const Avatar = forwardRef((props, ref) => {
  const {
    className,
    img,
    imgHeight,
    imgWidth,
    imgClassName,
    tag: Tag,
    ...rest
  } = props

  return (
    <Tag
      className={classnames('avatar', {
        [className]: className,
      })}
      ref={ref}
      {...rest}
    >
        <img
          className={classnames({
            [imgClassName]: imgClassName,
          })}
          src={img}
          height={imgHeight ? imgHeight : 32}
          width={imgWidth ? imgWidth : 32}
        />
    </Tag>
  )
})

export default Avatar


// ** Default Props
Avatar.defaultProps = {
  tag: 'div',
}

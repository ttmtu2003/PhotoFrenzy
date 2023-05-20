/* eslint-disable */
// ** React Imports
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

// ** Third Party Components
import { UncontrolledDropdown, DropdownMenu, DropdownToggle, DropdownItem } from 'reactstrap'
import { User, Settings, Power } from 'react-feather'

import Avatar from '../Avatar/Avatar'

const UserDropdown = () => {

  // ** State
  const [userData, setUserData] = useState(null)

  //** ComponentDidMount
  useEffect(() => {
    if (localStorage.getItem('userData') !== null) {
      setUserData(JSON.parse(localStorage.getItem('userData')))
    }
  }, [])

  const handleLogout = () => {
    window.localStorage.setItem('isAuthed', false)
    window.localStorage.removeItem('token')
    window.localStorage.removeItem('id')
    window.localStorage.removeItem('userData')
    window.location.href = "/"
  }

  //** Vars
  const userAvatar = (userData && userData.avatar)

  return (
    <UncontrolledDropdown tag="li" className="dropdown-user nav-item">
      <DropdownToggle href="/" tag="a" className="nav-link dropdown-user-link" onClick={(e) => e.preventDefault()}>
        <div className="t-flex t-items-center">
          <span className="t-text-black t-font-medium mr-2">{(userData && userData['username']) || 'John Doe'}</span>
        
          <Avatar newAvatar={userAvatar} imgClassName='t-h-[3rem] t-w-[3rem]' imgHeight="1rem" imgWidth="1rem" />
        </div>
      </DropdownToggle>
      <DropdownMenu end>
        <DropdownItem tag={Link} to="/profile" className='t-py-[0.65rem] t-px-[1.28rem] t-font-light t-text-[#6e6b7b] t-flex t-items-center'>
          <User size={16} className="mr-2" />
          <span className="align-middle">Profile</span>
        </DropdownItem>
        <DropdownItem tag={Link} to="/setting" className='t-py-[0.65rem] t-px-[1.28rem] t-font-light t-text-[#6e6b7b] t-flex t-items-center'>
          <Settings size={16} className="mr-2" />
          <span className="align-middle">Setting</span>
        </DropdownItem>
        <DropdownItem tag={Link} to="/login" onClick={handleLogout} className='t-py-[0.65rem] t-px-[1.28rem] t-font-light t-text-[#6e6b7b] t-flex t-items-center'>
          <Power size={16} className="mr-2" />
          <span className="align-middle">Logout</span>
        </DropdownItem>
      </DropdownMenu>
    </UncontrolledDropdown>
  )
}

export default UserDropdown

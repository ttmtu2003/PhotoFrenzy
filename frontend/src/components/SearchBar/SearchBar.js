import React, { useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Input, Popover, PopoverBody } from 'reactstrap';
import Avatar from '../Avatar/Avatar';
import useGetUsers from '../../hooks/useGetUsers';


const SearchBar = () => {
  const [query, setQuery] = useState('');
  const history = useHistory();
  const searchRef = useRef()
  const [addMemberPopoverOpen, setAddMemberPopoverOpen] = useState(false)

  // curr user id
  const userId = window.localStorage.getItem('id')

  // get list of users
  const { users, error } = useGetUsers(query, userId)

  const handleResultClick = (userId) => {
    history.push(`/users/${userId}`);
    setAddMemberPopoverOpen((prev) => !prev)
  }

  return (
    <div>
      <div onClick={() => setAddMemberPopoverOpen(true)} ref={searchRef}>
        <Input
          className="t-bg-secondary t-w-[15rem] md:t-w-[25rem] t-h-[2rem] t-rounded-md"
          type="search"
          name="search"
          placeholder="Search"
          autoComplete="off"
          value={query} 
          onChange={(event) => setQuery(event.target.value)}
        />
      </div>
      <Popover
        placement="bottom-start"
        popperClassName="t-max-w-none t-z-[1100]"
        innerClassName="t-w-[25rem]"
        target={searchRef}
        isOpen={addMemberPopoverOpen}
        toggle={() => setAddMemberPopoverOpen((prev) => !prev)}
        hideArrow
        trigger="legacy"
      >
        <PopoverBody className='px-0'>
          {error && <p>{error}</p>}
          {users.length > 0 && (
            <ul>
              {users.map(user => (
                <li key={user.id} className="hover:t-bg-[#F4F4F4] t-items-center py-2 px-3 t-flex hover:t-cursor-pointer" onClick={() => handleResultClick(user.id)}>
                  <Avatar img={user.avatar} className="t-w-[2rem] t-h-[2rem]" />
                  <p className='t-font-semibold t-text-[15px] ml-2'>{user.username}</p>
                </li>
              ))}
            </ul>
          )}
        </PopoverBody>
      </Popover>
    </div>
  );
};

export default SearchBar;
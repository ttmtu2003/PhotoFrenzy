import React, { useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { Input, Popover, PopoverBody } from 'reactstrap';
import Avatar from '../Avatar/Avatar';
import mockData4 from "../../assets/pictures/mockData4.jpg"

const results = [
  {
    id: 1,
    username: "johndoe",
    avatarUrl: mockData4,
    bio: "I'm a software developer"
  },
  {
    id: 2,
    username: "janedoe",
    avatarUrl: mockData4,
    bio: "I'm a graphic designer"
  }
]
const SearchBar = () => {
  const [query, setQuery] = useState('');
  // const [results, setResults] = useState([]);
  const history = useHistory();
  const searchRef = useRef()
  const [addMemberPopoverOpen, setAddMemberPopoverOpen] = useState(false)

  // const handleSubmit = (event) => {
  //   event.preventDefault();
  //   axios.get(`/api/users/search?q=${query}`)
  //     .then(response => {
  //       const users = response.data;
  //       setResults(users);
  //     })
  //     .catch(error => {
  //       console.log(error);
  //     });
  // };

  const handleResultClick = (userId) => {
    history.push(`/users/${userId}`);
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
          {results.length > 0 && (
            <ul>
              {results.map(user => (
                <li key={user.id} className="hover:t-bg-[#F4F4F4] t-items-center py-2 px-3 t-flex hover:t-cursor-pointer" onClick={() => handleResultClick(user.id)}>
                  <Avatar img={user.avatarUrl} className="t-w-[2rem] t-h-[2rem]" />
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
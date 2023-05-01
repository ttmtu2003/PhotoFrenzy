import React from "react";
import { Home, User } from "react-feather";
import { Navbar, NavbarBrand, Nav, NavItem, NavLink, Input, Button } from "reactstrap"
import SearchBar from "../SearchBar/SearchBar";
import { useHistory } from "react-router-dom";

const UserNavbar = () => {
  const handleLogout = () => {
    window.localStorage.setItem('isAuthed', false)
    window.localStorage.removeItem('token')
    window.localStorage.removeItem('id')
    window.location.href = "/"
  }

  return (
    <Navbar color="light" dark expand="md" className="t-inline-flex t-fixed t-top-0 t-w-full t-z-[1100]">
      <NavbarBrand className="!t-text-[#098DED] t-font-bold" href="/explore">PhotoFrenzy</NavbarBrand>
      <Nav className="mx-auto" navbar>
        <NavItem>
          <SearchBar />
        </NavItem>
      </Nav>
      <Nav className="t-flex t-w-fit t-items-center" navbar>
        <NavItem>
          <NavLink href="/profile" className="ml-3 t-flex t-items-center">
            <User className="t-text-black" />
            <h3 className="ml-2 t-font-semibold t-text-[1rem] t-text-black">Profile</h3>
          </NavLink>
        </NavItem>
        <NavItem>

            <Button onClick={handleLogout} className="active:t-bg-[#098DED] t-outline-0 t-border-[#098DED] hover:t-bg-[#098DED] t-text-[#098DED] hover:t-text-white">Logout</Button>

        </NavItem>
      </Nav>
    </Navbar>
  );
};

export default UserNavbar;

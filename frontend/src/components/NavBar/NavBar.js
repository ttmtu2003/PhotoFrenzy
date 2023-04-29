import React from "react";
import { Home, User } from "react-feather";
import { Navbar, NavbarBrand, Nav, NavItem, NavLink, Input } from "reactstrap"
import SearchBar from "../SearchBar/SearchBar";

const UserNavbar = () => {
  return (
    <Navbar color="light" dark expand="md" className="t-inline-flex t-fixed t-top-0 t-w-full t-z-[1100]">
      <NavbarBrand className="!t-text-[#098DED] t-font-bold" href="/explore">PhotoFrenzy</NavbarBrand>
      <Nav className="mx-auto" navbar>
        <NavItem>
          <SearchBar />
        </NavItem>
      </Nav>
      <Nav className="t-flex t-w-fit" navbar>
        <NavItem>
          <NavLink href="/explore" className="t-flex t-items-center">
            <Home className="t-text-black" />
            <h3 className="ml-2 t-font-semibold t-text-[1rem] t-text-black">Home</h3>
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink href="/profile" className="ml-3 t-flex t-items-center">
            <User className="t-text-black" />
            <h3 className="ml-2 t-font-semibold t-text-[1rem] t-text-black">Profile</h3>
          </NavLink>
        </NavItem>
      </Nav>
    </Navbar>
  );
};

export default UserNavbar;

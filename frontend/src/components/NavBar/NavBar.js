import React from "react";
import { Home, User } from "react-feather";
import { Navbar, NavbarBrand, Nav, NavItem, NavLink, Input } from "reactstrap"

const UserNavbar = () => {
  return (
    <Navbar color="light" dark expand="md" className="t-inline-flex t-fixed t-top-0 t-w-full t-z-[1100]">
      <NavbarBrand className="!t-text-[#098DED] t-font-bold" href="/explore">PhotoFrenzy</NavbarBrand>
      <Nav className="mx-auto" navbar>
        <NavItem>
          <Input
            className="t-bg-secondary t-w-[15rem] md:t-w-[25rem] t-h-[2rem] t-rounded-md"
            type="search"
            name="search"
            placeholder="Search"
            autoComplete="off"
          />
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

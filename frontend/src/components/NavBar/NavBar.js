import React from "react";
import { Navbar, NavbarBrand, Nav, NavItem } from "reactstrap"
import SearchBar from "../SearchBar/SearchBar";
import UserDropdown from "../ProfileDropdown/ProfileDropdown";

const UserNavbar = () => {

  return (
    <Navbar color="light" dark expand="md" className="t-inline-flex t-fixed t-top-0 t-w-full t-z-[1100]">
      <NavbarBrand className="!t-text-[#098DED] t-font-bold" href="/explore">PhotoFrenzy</NavbarBrand>
      <Nav className="mx-auto" navbar>
        {/* search bar */}
        <NavItem>
          <SearchBar />
        </NavItem>
      </Nav>

      <Nav className="t-flex t-w-fit t-items-center" navbar>
        <UserDropdown />
      </Nav>
    </Navbar>
  );
};

export default UserNavbar;

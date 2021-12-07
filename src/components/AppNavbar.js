import React, { useState } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from 'reactstrap';
import { signOutUser, getUser } from '../api/auth';

const AppNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const user = getUser();

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
      <Navbar light expand="md" className="navbar">
        <NavbarBrand href="/">hello</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="container-fluid" navbar>
            <NavItem>
              <NavLink href="/playerdetails/8476887">details</NavLink>
            </NavItem>
            <UncontrolledDropdown nav inNavbar className="user-drop">
              <DropdownToggle nav caret>
                <img className="user-img" src={user.user_metadata.picture} alt="user" />{user.user_metadata.name}
              </DropdownToggle>
              <DropdownMenu>
                <DropdownItem>
                  <NavLink onClick={signOutUser}>Sign Out</NavLink>
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
};

export default AppNavbar;

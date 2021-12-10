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
import { signOutUser, getUser, signInUser } from '../api/auth';
import signInButton from '../assets/btn_google_signin_light_normal_web.png';

const AppNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const user = getUser();

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
      <Navbar light expand="md" className="navbar">
        <NavbarBrand href="/">Hockey App</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="container-fluid" navbar>
            <NavItem>
              <NavLink href="/playerSearch">Search Players</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/">My Lines</NavLink>
            </NavItem>
            {user ? (
              <>
                <UncontrolledDropdown nav inNavbar className="user-drop">
                  <DropdownToggle nav caret>
                    <img className="user-img" src={user.user_metadata.picture} alt="user" />{user?.user_metadata.name}
                  </DropdownToggle>
                  <DropdownMenu>
                    <DropdownItem>
                      <NavLink onClick={signOutUser}>Sign Out</NavLink>
                    </DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown>
              </>
            ) : <><button type="button" className="login-btn" onClick={signInUser}><img src={signInButton} alt="sign in" /></button></>}
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
};

export default AppNavbar;

// import React, { Component } from 'react';
import React from 'react';
import {
  Navbar,
  NavbarBrand,
  Nav,
  NavbarToggler,
  Collapse,
  NavItem,
} from 'reactstrap';
import { Link } from 'react-router-dom';
import AnchorLink from 'react-anchor-link-smooth-scroll';
import { FadeTransform } from 'react-animation-components';
import { useState } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { DASHBOARD, LOGIN, REGISTER, CONTACT } from '../constants/routes';
import { logout } from '../slices/authSlice';

const Header = () => {
  const [state, setState] = useState({
    isNavOpen: true,
  });
  const dispatch = useDispatch();
  const toggleNav = () => {
    setState({
      isNavOpen: state.isNavOpen,
    });
  };
  const {
    auth: { isAuthenticated, user },
  } = useSelector((state) => {
    return {
      auth: state.auth,
    };
  }, shallowEqual);

  const img = require('../assets/images/logo.png');

  return (
    <div>
      <Navbar expand='md' className='active'>
        <div className='container'>
          {/* <NavbarToggler className="navbar-light mr-2" onClick={toggleNav}>
						<span className="fa fa-bars fa-xs"></span>
					</NavbarToggler> */}
          <NavbarBrand className='mr-auto' href='/'>
            <img
              src={img}
              alt='muj_logo'
              width='35%'
              height='auto'
              style={{ marginTop: '1rem' }}
            />
          </NavbarBrand>
          <Collapse isOpen={state.isNavOpen} navbar>
            <Nav className='mr-auto ' navbar>
              {!isAuthenticated ? (
                <>
                  {' '}
                  <NavItem>
                    <Link className='nav-link navtext' to={LOGIN}>
                      <span
                        style={{
                          color: 'black',
                          marginRight: '30px',
                          fontWeight: 'bold',
                          fontSize: '1.2rem',
                        }}
                      >
                        {' '}
                        Home
                      </span>
                    </Link>
                  </NavItem>
                  <NavItem>
                    <Link className='nav-link navtext' to={CONTACT}>
                      <span
                        style={{
                          color: 'black',
                          marginRight: '30px',
                          fontWeight: 'bold',
                          fontSize: '1.2rem',
                        }}
                      >
                        {' '}
                        Contact
                      </span>
                    </Link>
                  </NavItem>
                </>
              ) : (
                <>
                  <NavItem>
                    <Link className='nav-link navtext' to={DASHBOARD}>
                      <span
                        style={{
                          color: 'black',
                          fontWeight: 'bold',
                          fontSize: '1.2rem',
                        }}
                      >
                        {' '}
                        Dashboard
                      </span>
                    </Link>
                  </NavItem>
                  <NavItem>
                    <Link
                      className='nav-link navtext'
                      onClick={() => dispatch(logout())}
                    >
                      <span
                        style={{
                          color: 'black',
                          fontWeight: 'bold',
                          fontSize: '1.2rem',
                        }}
                      >
                        {' '}
                        Logout
                      </span>
                    </Link>
                  </NavItem>
                </>
              )}
            </Nav>
          </Collapse>
        </div>
      </Navbar>
    </div>
  );
};

export default Header;

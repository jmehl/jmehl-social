import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../actions/auth';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSignOutAlt,
  faUser,
  faCommentDots,
  faListAlt,
} from '@fortawesome/free-solid-svg-icons';

const Navbar = ({ auth: { user, isAuthenticated, loading }, logout }) => {
  const authLinks = (
    <ul className='navbar-nav w-100 space-b align-items-center'>
      <li className='nav-item me-sm-auto'>
        <Link className='nav-link' to='/posts'>
          <FontAwesomeIcon
            className='d-none d-md-inline'
            icon={faCommentDots}
          ></FontAwesomeIcon>{' '}
          Post Feed
        </Link>
      </li>
      <li className='nav-item'>
        <Link className='nav-link' to='/dashboard'>
          {user && user.picture ? (
            <img
              className='rounded-circle d-none d-sm-inline'
              src={user.picture}
              alt={user.name}
              style={{ width: '25px', marginRight: '5px' }}
            />
          ) : (
            <FontAwesomeIcon
              className='d-none d-md-inline'
              icon={faUser}
            ></FontAwesomeIcon>
          )}{' '}
          Dashboard
        </Link>
      </li>
      <li className='nav-item'>
        <a className='nav-link' onClick={logout} href='#!'>
          <FontAwesomeIcon
            className='d-none d-md-inline'
            icon={faSignOutAlt}
          ></FontAwesomeIcon>{' '}
          Logout
        </a>
      </li>
    </ul>
  );

  const guestLinks = (
    <ul className='navbar-nav align-items-center'>
      <li className='nav-item'>
        <Link className='nav-link' to='/register'>
          Sign Up
        </Link>
      </li>
      <li className='nav-item'>
        <Link className='nav-link' to='/login'>
          Login
        </Link>
      </li>
    </ul>
  );

  return (
    <nav className='navbar navbar-expand-sm w-100 navbar-dark bg-dark'>
      <div className='container'>
        <Link className='navbar-brand' to='/'>
          JmehlSocial
        </Link>
        <button
          className='navbar-toggler'
          type='button'
          data-bs-toggle='collapse'
          data-bs-target='#mobile-nav'
          aria-controls='mobile-nav'
          aria-expanded='false'
          aria-label='Toggle navigation'
        >
          <span className='navbar-toggler-icon'></span>
        </button>

        <div className='collapse navbar-collapse' id='mobile-nav'>
          <ul className='navbar-nav align-items-center'>
            <li className='nav-item prof-link'>
              <Link className='nav-link' to='/profiles'>
                <FontAwesomeIcon
                  className='d-none d-md-inline'
                  icon={faListAlt}
                ></FontAwesomeIcon>{' '}
                Profiles
              </Link>
            </li>
          </ul>
          {!loading && (
            <Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>
          )}
        </div>
      </div>
    </nav>
  );
};

Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logout })(Navbar);

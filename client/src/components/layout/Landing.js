import React from 'react';
import { Link, Navigate } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const Landing = ({ isAuthenticated }) => {
  if (isAuthenticated) {
    return <Navigate to='/dashboard' />;
  }

  return (
    <div className='landing top-space'>
      <div className='dark-overlay landing-inner text-light'>
        <div className='container center-con'>
          <div className='row'>
            <div className='col-md-12 text-center mt-4'>
              <h1 className='display-4 mb-4 text-white'>Jmehl Social</h1>
              <p className='text-white'>
                {' '}
                Create a profile, share posts and have fun!
              </p>
              <hr className='bg-info w-50' />
              <Link
                to='/register'
                className='btn btn-sm px-4 btn-lg btn-info me-2'
              >
                Sign Up
              </Link>
              <Link to='/login' className='btn btn-sm px-4 btn-lg btn-light'>
                Login
              </Link>
              <hr className='bg-info w-50' />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

Landing.propTypes = {
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps)(Landing);

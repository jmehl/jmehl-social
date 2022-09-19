import React, { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { login } from '../../actions/auth';

const Login = ({ login, isAuthenticated }) => {
  const [formData, setFromData] = useState({
    email: '',
    password: '',
  });

  const { email, password } = formData;

  const onChange = (e) =>
    setFromData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    login(email, password);
  };

  if (isAuthenticated) {
    return <Navigate to='/dashboard' />;
  }

  return (
    <section className='container'>
      <div className='register mb-5'>
        <div className='container'>
          <div className='row'>
            <div className='col-md-8 m-auto'>
              <h1 className='display-4 font-weight-bold text-secondary mt-5 text-center'>
                Sign In
              </h1>
              <p className='lead text-muted text-center'>
                Sign in to your account
              </p>
              <form className='form' noValidate onSubmit={onSubmit}>
                <div className='form-group'>
                  <input
                    className='form-control form-control-lg'
                    placeholder='Email Address'
                    name='email'
                    type='email'
                    value={email}
                    onChange={onChange}
                    required
                  />
                </div>
                <div className='form-group'>
                  <input
                    className='form-control form-control-lg'
                    placeholder='Password'
                    name='password'
                    type='password'
                    value={password}
                    onChange={onChange}
                  />
                </div>
                <input type='submit' className='btn btn-info btn-block' />
              </form>
            </div>
          </div>
        </div>
      </div>
      <p className='my-1 lead text-muted text-center'>
        Don't have an account?{' '}
        <Link className='link text-info' to='/register'>
          Sign Up
        </Link>
      </p>
    </section>
  );
};

Login.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { login })(Login);

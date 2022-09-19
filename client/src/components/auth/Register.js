import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { setAlert } from '../../actions/alert';
import { register } from '../../actions/auth';
import PropTypes from 'prop-types';

const Register = ({ setAlert, register, isAuthenticated }) => {
  const [formData, setFromData] = useState({
    name: '',
    email: '',
    picture: '',
    password: '',
    password2: '',
  });

  const { name, email, picture, password, password2 } = formData;

  const onChange = (e) =>
    setFromData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    if (password !== password2) {
      setAlert('Passwords do not match', 'danger');
    } else {
      register({ name, email, picture, password });
    }
  };

  if (isAuthenticated) {
    return <Navigate to='/dashboard' />;
  }

  const userURL = 'https://randomuser.me/api/?nat=us';
  const passURL = 'https://my.api.mockaroo.com/password.json?key=39caf430';

  const onAuto = async () => {
    const response = await fetch(userURL);
    const response2 = await fetch(passURL);
    const data = await response.json();
    const data2 = await response2.json();
    setFromData({
      ...formData,
      name: data.results[0].name.first + ' ' + data.results[0].name.last,
      email: data.results[0].email,
      picture: data.results[0].picture.large,
      password: data2.password,
    });
  };

  return (
    <section className='container'>
      <div className='register mb-5'>
        <div className='container'>
          <div className='row'>
            <div className='col-md-8 m-auto'>
              <h1 className='display-4 font-weight-bold text-secondary mt-5 text-center'>
                Sign Up
              </h1>
              <p className='lead text-muted text-center'>
                Create your JmehlSocial account
              </p>
              <form className='form' noValidate onSubmit={onSubmit}>
                <div className='form-group'>
                  <input
                    className='form-control form-control-lg'
                    placeholder='Name'
                    name='name'
                    value={name}
                    onChange={onChange}
                    required
                  />
                </div>
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
                  <p>
                    Your password is{' '}
                    <strong className='auto-password text-success'>
                      {password}
                    </strong>{' '}
                    confirm password bellow and remember it so you can login
                    later.
                  </p>
                </div>
                <div className='form-group'>
                  <input
                    className='form-control form-control-lg'
                    placeholder='Confirm Password'
                    name='password2'
                    type='password'
                    value={password2}
                    onChange={onChange}
                  />
                </div>
                <input
                  type='button'
                  value='Auto Fill'
                  onClick={onAuto}
                  className='btn btn-info px-4'
                />
                <input type='submit' className='btn btn-info' />
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

Register.propTypes = {
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { setAlert, register })(Register);

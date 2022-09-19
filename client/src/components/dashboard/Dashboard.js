import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import DashboardActions from './DashboardActions';
import Location from './Location';
import Education from './Education';
import { getCurrentProfile, deleteAccount } from '../../actions/profile';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserMinus } from '@fortawesome/free-solid-svg-icons';

const Dashboard = ({
  getCurrentProfile,
  deleteAccount,
  auth: { user },
  profile: { profile },
}) => {
  useEffect(() => {
    getCurrentProfile();
  }, [getCurrentProfile]);

  return (
    <section className='container'>
      <h1 className='display-4 font-weight-bold mt-5 text-secondary text-center'>
        Dashboard
      </h1>
      {profile !== null ? (
        <>
          <p className='lead text-muted text-center'>
            Welcome{' '}
            <Link
              className='lead link text-info'
              to={`/profile/${user && user._id}`}
            >
              {user &&
                user.name.replace(/\w\S*/g, (txt) => {
                  return (
                    txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
                  );
                })}
            </Link>
          </p>
          <DashboardActions />
          <Location location={profile.location} />
          <Education education={profile.education} />
          <div className='my-2'>
            <button
              className='btn btn-danger btn-sm px-4 my-4'
              onClick={() => deleteAccount()}
            >
              <FontAwesomeIcon icon={faUserMinus}></FontAwesomeIcon> Delete My
              Account
            </button>
          </div>
        </>
      ) : (
        <>
          <p className='lead text-center text-secondary'>
            Welcome{' '}
            {user &&
              user.name.replace(/\w\S*/g, (txt) => {
                return (
                  txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
                );
              })}
          </p>
          <div className='d-flex flex-wrap justify-content-center align-items-center pt-5'>
            <span className='text-dark me-3'>
              You haven't set up a profile yet!
            </span>
            <Link to='/create-profile' className='btn btn-sm px-4 btn-info'>
              Create Profile
            </Link>
          </div>
        </>
      )}
    </section>
  );
};

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  deleteAccount: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
});

export default connect(mapStateToProps, { getCurrentProfile, deleteAccount })(
  Dashboard
);

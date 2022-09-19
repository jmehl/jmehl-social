import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import ProfileTop from './ProfileTop';
import ProfileAbout from './ProfileAbout';
import ProfileLocation from './ProfileLocation';
import ProfileEducation from './ProfileEducation';
import { getProfileById } from '../../actions/profile';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faEdit } from '@fortawesome/free-solid-svg-icons';

const Profile = ({ getProfileById, profile: { profile }, auth }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    getProfileById(id);
  }, [getProfileById, id]);

  return (
    <section className='container'>
      <div className='row'>
        <div className='col-md-12'>
          {profile === null ? (
            <Spinner />
          ) : (
            <Fragment>
              <div className='topNav row justify-content-between'>
                <button
                  className='btn btn-sm w-auto px-4 btn-info my-3'
                  onClick={() => navigate(-1)}
                >
                  <FontAwesomeIcon icon={faAngleLeft}></FontAwesomeIcon>
                </button>
                {auth.isAuthenticated &&
                  auth.loading === false &&
                  auth.user._id === profile.user._id && (
                    <Link
                      to='/edit-profile'
                      className='btn btn-sm w-auto px-4 btn-info my-3'
                    >
                      <FontAwesomeIcon icon={faEdit}></FontAwesomeIcon>
                    </Link>
                  )}
              </div>
              <ProfileTop profile={profile} />
              <ProfileAbout profile={profile} />
              <div className='row mb-5'>
                {profile.location.length > 0 ? (
                  <Fragment>
                    {profile.location.map((location) => (
                      <ProfileLocation key={location._id} location={location} />
                    ))}
                  </Fragment>
                ) : null}
                {profile.education.length > 0 ? (
                  <Fragment>
                    {profile.education.map((education) => (
                      <ProfileEducation
                        key={education._id}
                        education={education}
                      />
                    ))}
                  </Fragment>
                ) : null}
              </div>
            </Fragment>
          )}
        </div>
      </div>
    </section>
  );
};

Profile.propTypes = {
  getProfileById: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
  auth: state.auth,
});

export default connect(mapStateToProps, { getProfileById })(Profile);

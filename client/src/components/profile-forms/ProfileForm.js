import React, { Fragment, useState, useEffect } from 'react';
import { Link, useMatch, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createProfile, getCurrentProfile } from '../../actions/profile';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faTwitter,
  faFacebook,
  faInstagramSquare,
  faYoutube,
} from '@fortawesome/free-brands-svg-icons';
import { faUser } from '@fortawesome/free-solid-svg-icons';

const initialState = {
  username: '',
  website: '',
  bio: '',
  hobbies: '',
  twitter: '',
  instagram: '',
  youtube: '',
  facebook: '',
};

const ProfileForm = ({
  profile: { profile, loading },
  createProfile,
  getCurrentProfile,
}) => {
  const [formData, setFormData] = useState(initialState);

  const creatingProfile = useMatch('/create-profile');

  const [displaySocialInputs, toggleSocialInputs] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (!profile) getCurrentProfile();

    if (!loading && profile) {
      const profileData = { ...initialState };
      for (const key in profile) {
        if (key in profileData) profileData[key] = profile[key];
      }
      for (const key in profile.social) {
        if (key in profileData) profileData[key] = profile.social[key];
      }

      if (Array.isArray(profileData.hobbies))
        profileData.hobbies = profileData.hobbies.join(', ');

      setFormData(profileData);
    }
  }, [loading, getCurrentProfile, profile]);

  const {
    username,
    website,
    bio,
    hobbies,
    twitter,
    instagram,
    youtube,
    facebook,
  } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    createProfile(formData, navigate, profile ? true : false);
  };

  const profileURL = 'https://my.api.mockaroo.com/auto.json?key=39caf430';

  const onAuto = async () => {
    const response = await fetch(profileURL);
    const data = await response.json();
    setFormData({
      ...formData,
      username: data.username,
      website: `http://www.${data.username}.com`,
      bio: data.bio,
      youtube: `http://www.youtube.com/${data.username}`,
      twitter: `http://www.twitter.com/${data.username}`,
      facebook: `http://www.facebook.com/${data.username}`,
      instagram: `http://www.instagram.com/${data.username}`,
      hobbies: `${data.hobbies[0]}, ${data.hobbies[1]}, ${data.hobbies[2]}, ${data.hobbies[3]}, ${data.hobbies[4]}`,
    });
  };
  return (
    <section className='container'>
      <h1 className='display-4 font-weight-bold mt-5 text-secondary text-center'>
        {creatingProfile ? 'Create Your Profile' : 'Edit Your Profile'}
      </h1>
      <p className='lead text-secondary text-center'>
        <FontAwesomeIcon icon={faUser}></FontAwesomeIcon>
        {creatingProfile
          ? ` Let's get some information to make your profile`
          : ' Add some changes to your profile'}
      </p>
      <small className='d-block text-muted font-weight-bold pb-3'>
        * required fields
      </small>
      <form className='form' onSubmit={onSubmit}>
        <input
          type='button'
          value='Auto Fill'
          onClick={onAuto}
          className='btn btn-info btn-block mt-2'
        />
        <div className='form-group'>
          <input
            className='form-control form-control-lg'
            placeholder='* Username'
            name='username'
            value={username}
            onChange={onChange}
          />
          <small className='form-text'>Your unique profile username</small>
        </div>
        <div className='form-group'>
          <input
            className='form-control form-control-lg'
            placeholder='Website'
            name='website'
            value={website}
            onChange={onChange}
          />
          <small className='form-text'>
            Add your own website if your have one
          </small>
        </div>
        <div className='form-group'>
          <input
            className='form-control form-control-lg'
            placeholder='* Hobbies'
            name='hobbies'
            value={hobbies}
            onChange={onChange}
          />
          <small className='form-text'>
            Please use comma separated values (eg. Skydiving, Penny Collecting,
            Deep Sea Diving, Music)
          </small>
        </div>
        <div className='form-group'>
          <textarea
            className='area-h form-control form-control-lg'
            placeholder='Short Bio'
            name='bio'
            value={bio}
            onChange={onChange}
            info='A little something about yourself'
          />
        </div>

        <div className='mb-3'>
          <hr className='bg-light' />
          <button
            type='button'
            onClick={() => toggleSocialInputs(!displaySocialInputs)}
            className='btn btn-primary'
          >
            Add Social Links
          </button>
          <hr className='bg-dark my-4' />
        </div>

        {displaySocialInputs && (
          <Fragment>
            <div className='input-group mb-3'>
              <span class='input-group-text text-primary' id='addon-wrapping'>
                <FontAwesomeIcon
                  className='input-group-addon'
                  icon={faTwitter}
                ></FontAwesomeIcon>
              </span>
              <input
                className='form-control form-control-lg'
                type='text'
                placeholder='Twitter URL'
                name='twitter'
                value={twitter}
                onChange={onChange}
              />
            </div>

            <div className='input-group mb-3'>
              <span class='input-group-text text-primary' id='addon-wrapping'>
                <FontAwesomeIcon
                  className='input-group-addon'
                  icon={faFacebook}
                ></FontAwesomeIcon>
              </span>
              <input
                className='form-control form-control-lg'
                type='text'
                placeholder='Facebook URL'
                name='facebook'
                value={facebook}
                onChange={onChange}
              />
            </div>

            <div className='input-group mb-3'>
              <span class='input-group-text text-primary' id='addon-wrapping'>
                <FontAwesomeIcon
                  className='input-group-addon'
                  icon={faYoutube}
                ></FontAwesomeIcon>
              </span>
              <input
                className='form-control form-control-lg'
                type='text'
                placeholder='YouTube URL'
                name='youtube'
                value={youtube}
                onChange={onChange}
              />
            </div>

            <div className='input-group mb-3'>
              <span class='input-group-text text-primary' id='addon-wrapping'>
                <FontAwesomeIcon
                  className='input-group-addon'
                  icon={faInstagramSquare}
                ></FontAwesomeIcon>
              </span>
              <input
                className='form-control form-control-lg'
                type='text'
                placeholder='Instagram URL'
                name='instagram'
                value={instagram}
                onChange={onChange}
              />
            </div>
          </Fragment>
        )}

        <input type='submit' className='btn btn-info mb-5' />
        <Link className='btn btn-success ms-2 mb-5' to='/dashboard'>
          Go Back
        </Link>
      </form>
    </section>
  );
};

ProfileForm.propTypes = {
  createProfile: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
});

export default connect(mapStateToProps, { createProfile, getCurrentProfile })(
  ProfileForm
);

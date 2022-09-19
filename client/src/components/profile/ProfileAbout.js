import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';

const ProfileAbout = ({
  profile: {
    bio,
    hobbies,
    user: { name },
  },
}) => (
  <div className='row'>
    <div className='col-md-12'>
      <div className='card card-body bg-white py-4 mb-3'>
        <h3 className='text-center text-info mt-5'>Hobbies</h3>
        <div className='d-flex flex-wrap justify-content-center align-items-center'>
          {hobbies.map((hobby, index) => (
            <div key={index} className='p-1'>
              <FontAwesomeIcon
                className='text-info'
                icon={faCheckCircle}
              ></FontAwesomeIcon>{' '}
              {hobby}
            </div>
          ))}
        </div>
        <div className='px-4 mb-3'>
          {bio && (
            <Fragment>
              <h3 className='text-info mt-4'>
                {name
                  .trim()
                  .split(' ')[0]
                  .replace(/\w\S*/g, (txt) => {
                    return (
                      txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
                    );
                  })}
                's Bio
              </h3>
              <p>{bio}</p>
            </Fragment>
          )}
        </div>
      </div>
    </div>
  </div>
);

ProfileAbout.propTypes = {
  profile: PropTypes.object.isRequired,
};

export default ProfileAbout;

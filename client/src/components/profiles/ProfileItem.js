import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faUser } from '@fortawesome/free-solid-svg-icons';

const ProfileItem = ({
  profile: {
    user: { _id, picture, name },
    username,
    hobbies,
  },
}) => {
  return (
    <div className='card card-body bg-white mb-3'>
      <div className='row p-4'>
        <div className='col-2 pe-0 pe-md-2'>
          {picture ? (
            <Link className='text-decoration-none' to={`/profile/${_id}`}>
              <img src={picture} alt='' className='rounded-circle' />
              <p className='link lh-sm mt-2 text-info text-center'>
                {name.replace(/\w\S*/g, (txt) => {
                  return (
                    txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
                  );
                })}
              </p>
            </Link>
          ) : (
            <Link className='text-decoration-none' to={`/profile/${_id}`}>
              <div className='no-picture text-info'>
                <FontAwesomeIcon icon={faUser}></FontAwesomeIcon>
              </div>
              <p className='link lh-sm mt-2 text-info text-center'>
                {name.replace(/\w\S*/g, (txt) => {
                  return (
                    txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
                  );
                })}
              </p>
            </Link>
          )}
        </div>
        <div className='col-lg-4 pt-lg-4 col-md-4 mt-1 col-8'>
          <h4 className='text-secondary'>{username}</h4>
          <Link to={`/profile/${_id}`} className='btn btn-primary'>
            View Profile
          </Link>
        </div>
        <div className='col-md-6 mt-3 d-none d-md-block'>
          <h5 className='text-secondary'>Hobbies</h5>
          <ul className='d-inline-block list-group'>
            {hobbies.slice(0, 2).map((hobby, index) => (
              <li
                key={index}
                className='hobby-item bg-light text-dark list-group-item'
              >
                <FontAwesomeIcon
                  className='text-info'
                  icon={faCheckCircle}
                ></FontAwesomeIcon>
                {hobby}
              </li>
            ))}
          </ul>
          <ul className='d-lg-inline-block d-md-none pl-3 list-group'>
            {hobbies.slice(2, 4).map((hobby, index) => (
              <li
                key={index}
                className='hobby-item bg-light text-dark list-group-item'
              >
                <FontAwesomeIcon
                  className='text-info'
                  icon={faCheckCircle}
                ></FontAwesomeIcon>
                {hobby}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

ProfileItem.propTypes = {
  profile: PropTypes.object.isRequired,
};

export default ProfileItem;

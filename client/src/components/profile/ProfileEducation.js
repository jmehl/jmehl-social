import React from 'react';
import PropTypes from 'prop-types';
import formatDate from '../../utils/formatDate';

const ProfileEducation = ({
  education: { school, degree, fieldofstudy, to, from, description },
}) => (
  <div className='col-md-6 ps-2 align-self-end'>
    <div className='card card-body bg-white py-4 mb-3'>
      <h3 className='text-center text-info mt-3'>Education</h3>
      <ul className='list-group'>
        <li className='list-group-item border-0'>
          <p className='mb-2'>
            <strong>School: </strong> {school}
          </p>
          <p className='mb-2'>
            {formatDate(from)} - {to ? formatDate(to) : 'Now'}
          </p>
          <p className='mb-2'>
            <strong>Degree: </strong> {degree}
          </p>
          <p className='mb-2'>
            <strong>Field Of Study: </strong> {fieldofstudy}
          </p>
          <p className='mb-2'>
            <strong>Description: </strong> {description}
          </p>
        </li>
      </ul>
    </div>
  </div>
);

ProfileEducation.propTypes = {
  education: PropTypes.object.isRequired,
};

export default ProfileEducation;

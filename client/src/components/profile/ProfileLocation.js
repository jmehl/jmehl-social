import React from 'react';
import PropTypes from 'prop-types';

const ProfileLocation = ({ location: { street, city, state, zipcode } }) => (
  <div className='col-md-6 pe-2 mb-3'>
    <div className='card card-body h-100 bg-white py-4 mb-3'>
      <h3 className='text-center text-info mt-3'>Location</h3>
      <ul className='list-group'>
        <li className='list-group-item border-0'>
          <p className='mt-2 mb-2'>
            <strong>city: </strong> {street}
          </p>
          <p className='mb-2'>
            <strong>city: </strong> {city}
          </p>
          <p className='mb-2'>
            <strong>state: </strong> {state}
          </p>
          <p className='mb-2'>
            <strong>Zip Code: </strong> {zipcode}
          </p>
        </li>
      </ul>
    </div>
  </div>
);

ProfileLocation.propTypes = {
  location: PropTypes.object.isRequired,
};

export default ProfileLocation;

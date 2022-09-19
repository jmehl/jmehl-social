import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deleteLocation } from '../../actions/profile';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';

const Location = ({ location, deleteLocation }) => {
  const locations = location.map((loc) => (
    <tr key={loc._id}>
      <td>{loc.street}</td>
      <td>{loc.city}</td>
      <td>{loc.state}</td>
      <td className='hide-sm'>{loc.zipcode}</td>
      <td>
        <button
          onClick={() => deleteLocation(loc._id)}
          className='btn btn-sm btn-light text-danger'
        >
          <FontAwesomeIcon icon={faTrashAlt}></FontAwesomeIcon>
        </button>
      </td>
    </tr>
  ));

  return (
    <Fragment>
      <h4 className='font-weight-bold text-secondary text-sm-left mb-3 mt-5'>
        Location
      </h4>
      <table className='table table-responsive'>
        <thead className='bg-info text-white'>
          <tr>
            <th>Street</th>
            <th>City</th>
            <th>State</th>
            <th className='hide-sm'>Zip Code</th>
            <th />
          </tr>
        </thead>
        <tbody className='text-dark table-bordered'>{locations}</tbody>
      </table>
    </Fragment>
  );
};

Location.propTypes = {
  location: PropTypes.array.isRequired,
  deleteLocation: PropTypes.func.isRequired,
};

export default connect(null, { deleteLocation })(Location);

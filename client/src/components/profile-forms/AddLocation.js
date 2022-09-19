import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addLocation } from '../../actions/profile';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkedAlt } from '@fortawesome/free-solid-svg-icons';

const AddLocation = ({ addLocation }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    street: '',
    city: '',
    state: '',
    zipcode: '',
  });

  const { street, city, state, zipcode } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const locationURL = 'https://my.api.mockaroo.com/location.json?key=39caf430';

  const onAuto = async () => {
    const response = await fetch(locationURL);
    const data = await response.json();
    setFormData({
      ...formData,
      street: data.street,
      city: data.city,
      state: data.state,
      zipcode: data.zipcode,
    });
  };

  return (
    <section className='container'>
      <h1 className='display-4 font-weight-bold mt-5 text-secondary text-center'>
        Add A Location
      </h1>
      <p className='lead text-secondary text-center'>
        <FontAwesomeIcon icon={faMapMarkedAlt}></FontAwesomeIcon> Add location
        information to your profile.
      </p>
      <small>* required field</small>
      <form
        className='form'
        onSubmit={(e) => {
          e.preventDefault();
          addLocation(formData, navigate);
        }}
      >
        <input
          type='button'
          value='Auto Fill'
          onClick={onAuto}
          className='btn btn-info btn-block mt-2'
        />
        <div className='form-group'>
          <input
            className='form-control form-control-lg'
            type='text'
            placeholder='* Street'
            name='street'
            value={street}
            onChange={onChange}
            required
          />
        </div>
        <div className='form-group'>
          <input
            className='form-control form-control-lg'
            type='text'
            placeholder='* City'
            name='city'
            value={city}
            onChange={onChange}
            required
          />
        </div>
        <div className='form-group'>
          <input
            className='form-control form-control-lg'
            type='text'
            placeholder='* State'
            name='state'
            value={state}
            onChange={onChange}
            required
          />
        </div>
        <div className='form-group'>
          <input
            className='form-control form-control-lg'
            type='text'
            placeholder='* Zip Code'
            name='zipcode'
            value={zipcode}
            onChange={onChange}
            required
          />
        </div>
        <input type='submit' className='btn btn-info mb-5' />
        <Link className='btn btn-success ms-2 mb-5' to='/dashboard'>
          Go Back
        </Link>
      </form>
    </section>
  );
};

AddLocation.propTypes = {
  addLocation: PropTypes.func.isRequired,
};

export default connect(null, { addLocation })(AddLocation);

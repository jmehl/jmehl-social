import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addEducation } from '../../actions/profile';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGraduationCap } from '@fortawesome/free-solid-svg-icons';

const AddEducation = ({ addEducation }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    school: '',
    degree: '',
    fieldofstudy: '',
    from: '',
    to: '',
    current: false,
  });

  const { school, degree, fieldofstudy, from, to, current } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const educationURL = 'https://my.api.mockaroo.com/edu.json?key=39caf430';

  const onAuto = async () => {
    const response = await fetch(educationURL);
    const data = await response.json();
    setFormData({
      ...formData,
      school: data.school,
      degree: data.degree,
      fieldofstudy: data.fieldofstudy,
      from: data.from,
      to: data.to,
    });
  };

  return (
    <section className='container'>
      <h1 className='display-4 font-weight-bold mt-5 text-secondary text-center'>
        Add Your Education
      </h1>
      <p className='lead text-secondary text-center'>
        <FontAwesomeIcon icon={faGraduationCap}></FontAwesomeIcon> Add some
        information about your educational background.
      </p>
      <small>* required field</small>
      <form
        className='form'
        onSubmit={(e) => {
          e.preventDefault();
          addEducation(formData, navigate);
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
            placeholder='* School or Bootcamp'
            name='school'
            value={school}
            onChange={onChange}
            required
          />
        </div>
        <div className='form-group'>
          <input
            className='form-control form-control-lg'
            type='text'
            placeholder='* Degree or Certificate'
            name='degree'
            value={degree}
            onChange={onChange}
            required
          />
        </div>
        <div className='form-group'>
          <input
            className='form-control form-control-lg'
            type='text'
            placeholder='* Field of Study'
            name='fieldofstudy'
            value={fieldofstudy}
            onChange={onChange}
          />
        </div>
        <div className='form-group'>
          <h6>* From Date</h6>
          <input
            className='form-control w-auto form-control-lg'
            type='date'
            name='from'
            value={from}
            onChange={onChange}
          />
        </div>
        <div className='form-check mb-4'>
          <p>
            <input
              type='checkbox'
              className='form-check-input'
              name='current'
              checked={current}
              value={current}
              onChange={() => setFormData({ ...formData, current: !current })}
            />{' '}
            Current School
          </p>
        </div>
        <div className='form-group'>
          <h6>To Date</h6>
          <input
            className='form-control w-auto form-control-lg'
            type='date'
            name='to'
            value={to}
            onChange={onChange}
            disabled={current}
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

AddEducation.propTypes = {
  addEducation: PropTypes.func.isRequired,
};

export default connect(null, { addEducation })(AddEducation);

import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deleteEducation } from '../../actions/profile';
import formatDate from '../../utils/formatDate';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';

const Education = ({ education, deleteEducation }) => {
  const educations = education.map((edu) => (
    <tr key={edu._id}>
      <td>{edu.school}</td>
      <td>{edu.degree}</td>
      <td className='hide-sm'>{edu.fieldofstudy}</td>
      <td>
        {formatDate(edu.from)} - {edu.to ? formatDate(edu.to) : 'Now'}
      </td>
      <td>
        <button
          onClick={() => deleteEducation(edu._id)}
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
        Education
      </h4>
      <table className='table table-responsive'>
        <thead className='bg-info text-white'>
          <tr>
            <th>School</th>
            <th>Degree</th>
            <th className='hide-sm'>Field of Study</th>
            <th>Years</th>
            <th />
          </tr>
        </thead>
        <tbody className='text-dark table-bordered'>{educations}</tbody>
      </table>
    </Fragment>
  );
};

Education.propTypes = {
  education: PropTypes.array.isRequired,
  deleteEducation: PropTypes.func.isRequired,
};

export default connect(null, { deleteEducation })(Education);

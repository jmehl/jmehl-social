import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUserCircle,
  faGraduationCap,
  faMapMarkedAlt,
} from '@fortawesome/free-solid-svg-icons';

const DashboardActions = () => {
  return (
    <div className='dash-buttons d-flex flex-wrap justify-content-center'>
      <Link to='/edit-profile' className='btn btn-info me-2'>
        <FontAwesomeIcon icon={faUserCircle}></FontAwesomeIcon> Edit Profile
      </Link>
      <Link to='/add-location' className='btn btn-info me-2'>
        <FontAwesomeIcon icon={faMapMarkedAlt}></FontAwesomeIcon> Add Location
      </Link>
      <Link to='/add-education' className='btn btn-info'>
        <FontAwesomeIcon icon={faGraduationCap}></FontAwesomeIcon> Add Education
      </Link>
    </div>
  );
};

export default DashboardActions;

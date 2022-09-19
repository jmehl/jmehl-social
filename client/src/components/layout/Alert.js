import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faExclamationTriangle,
  faCheckCircle,
} from '@fortawesome/free-solid-svg-icons';

const Alert = ({ alerts }) => (
  <div className='alert-wrapper'>
    {alerts.map((alert) => (
      <div key={alert.id} className={`alert alert-${alert.alertType}`}>
        {alert.alertType === 'danger' ? (
          <FontAwesomeIcon icon={faExclamationTriangle}></FontAwesomeIcon>
        ) : (
          <FontAwesomeIcon icon={faCheckCircle}></FontAwesomeIcon>
        )}{' '}
        {alert.msg}
      </div>
    ))}
  </div>
);

Alert.propTypes = {
  alerts: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  alerts: state.alert,
});

export default connect(mapStateToProps)(Alert);

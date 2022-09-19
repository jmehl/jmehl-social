import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGlobe, faUser } from '@fortawesome/free-solid-svg-icons';
import {
  faYoutube,
  faFacebook,
  faTwitter,
  faInstagram,
} from '@fortawesome/free-brands-svg-icons';

const ProfileTop = ({
  profile: {
    username,
    website,
    social,
    user: { name, picture },
  },
}) => {
  return (
    <div className='row'>
      <div className='col-md-12'>
        <div className='card card-body bg-info text-white mb-3'>
          <h6 className='mb-0 mt-3 text-white text-center'>{username}</h6>
          <div className='mt-3 mb-3 row'>
            <div className='col-2 m-auto'>
              {picture ? (
                <img className='rounded-circle' src={picture} alt='' />
              ) : (
                <div className='no-picture'>
                  <FontAwesomeIcon icon={faUser}></FontAwesomeIcon>
                </div>
              )}
            </div>
          </div>
          <div className='text-center'>
            <h1 className='text-white text-center'>
              {name.replace(/\w\S*/g, (txt) => {
                return (
                  txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
                );
              })}
            </h1>
            {website ? (
              <a
                href={website}
                className='link-light'
                target='_blank'
                rel='noopener noreferrer'
              >
                <FontAwesomeIcon icon={faGlobe}></FontAwesomeIcon> {website}
              </a>
            ) : null}
          </div>
          <div className='text-center mb-1'>
            {social
              ? Object.entries(social)
                  .filter(([_, value]) => value)
                  .map(([key, value]) => (
                    <a
                      key={key}
                      href={value}
                      className='link-light d-inline-block p-2'
                      target='_blank'
                      rel='noopener noreferrer'
                    >
                      <FontAwesomeIcon
                        {...(key.toString() === 'youtube' && {
                          icon: faYoutube,
                        })}
                        {...(key.toString() === 'facebook' && {
                          icon: faFacebook,
                        })}
                        {...(key.toString() === 'twitter' && {
                          icon: faTwitter,
                        })}
                        {...(key.toString() === 'instagram' && {
                          icon: faInstagram,
                        })}
                      ></FontAwesomeIcon>
                    </a>
                  ))
              : null}
          </div>
        </div>
      </div>
    </div>
  );
};

ProfileTop.propTypes = {
  profile: PropTypes.object.isRequired,
};

export default ProfileTop;

import React, { Fragment, useEffect, useRef, useCallback } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import ProfileItem from './ProfileItem';
import { getProfiles } from '../../actions/profile';
import { getMoreProfiles } from '../../actions/profile';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGlobe } from '@fortawesome/free-solid-svg-icons';

const Profiles = ({
  getProfiles,
  getMoreProfiles,
  profile: { endOfProfiles, loadingMore, profiles, loading },
}) => {
  useEffect(() => {
    getProfiles();
  }, [getProfiles]);

  const observer = useRef();
  let moreProfiles;

  const lastProfile = useCallback(
    (node) => {
      if (loading) return;
      if (!profiles.length) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && !endOfProfiles) {
          getMoreProfiles(profiles[profiles.length - 1]._id);
        }
      });

      if (node) observer.current.observe(node);
    },
    [profiles, loading, getMoreProfiles, endOfProfiles]
  );

  if (loadingMore) {
    moreProfiles = <Spinner />;
  } else {
    moreProfiles = '';
  }

  return (
    <section className='container'>
      {loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <h1 className='display-4 font-weight-bold text-secondary mt-5 text-center'>
            Profiles
          </h1>
          <p className='lead text-muted text-center'>
            <FontAwesomeIcon icon={faGlobe}></FontAwesomeIcon> Browse all
            profiles
          </p>
          <div className='mt-5'>
            {profiles.length > 0 ? (
              profiles.map((profile, i) =>
                profiles.length === i + 1 ? (
                  <div key={profile._id} ref={lastProfile}>
                    <ProfileItem profile={profile} />
                  </div>
                ) : (
                  <div key={profile._id}>
                    <ProfileItem profile={profile} />
                  </div>
                )
              )
            ) : (
              <h4>No profiles found...</h4>
            )}
          </div>
          {moreProfiles}
          {endOfProfiles && (
            <div
              className='alert alert-primary text-center text-light'
              role='alert'
            >
              You reached the end of the list.
            </div>
          )}
        </Fragment>
      )}
    </section>
  );
};

Profiles.propTypes = {
  getProfiles: PropTypes.func.isRequired,
  getMoreProfiles: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
});

export default connect(mapStateToProps, { getProfiles, getMoreProfiles })(
  Profiles
);

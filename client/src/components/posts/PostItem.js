import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import formatDate from '../../utils/formatDate';
import { connect } from 'react-redux';
import { addLike, removeLike, deletePost } from '../../actions/post';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faThumbsUp,
  faThumbsDown,
  faTrashAlt,
  faComment,
  faUser,
} from '@fortawesome/free-solid-svg-icons';

const PostItem = ({
  addLike,
  removeLike,
  deletePost,
  auth,
  post: { _id, text, name, picture, user, likes, unlike, comments, date },
  showActions,
}) => (
  <div className='card card-body bg-white mb-3'>
    <div className='row py-2 px-4'>
      <div className='col-md-2 mt-3'>
        <div className='col-3 px-0 px-lg-2 col-md-12 mx-auto'>
          {picture ? (
            <Link className='text-decoration-none' to={`/profile/${user}`}>
              <img src={picture} alt='' className='rounded-circle' />
              <p className='link lh-sm mt-2 text-info text-center'>
                {name.replace(/\w\S*/g, (txt) => {
                  return (
                    txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
                  );
                })}
              </p>
            </Link>
          ) : (
            <Link className='text-decoration-none' to={`/profile/${user}`}>
              <div className='no-picture text-info'>
                <FontAwesomeIcon icon={faUser}></FontAwesomeIcon>
              </div>
              <p className='link lh-sm mt-2 text-info text-center'>
                {name.replace(/\w\S*/g, (txt) => {
                  return (
                    txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
                  );
                })}
              </p>
            </Link>
          )}
        </div>
      </div>
      <div className='col-md-10 d-flex align-items-start flex-column'>
        <p className='mt-3'>{text}</p>
        <small className='d-block ms-auto me-4 text-muted font-weight-bold pb-3'>
          Posted on {formatDate(date)}
        </small>
        {showActions && (
          <div className='m-auto'>
            <span onClick={() => addLike(_id)} className='me-3 link text-info'>
              <FontAwesomeIcon
                className='soc-a'
                icon={faThumbsUp}
              ></FontAwesomeIcon>{' '}
              <span>{likes.length > 0 && <span>{likes.length}</span>}</span>
            </span>
            <span
              onClick={() => removeLike(_id)}
              className='me-3 link text-info'
            >
              <FontAwesomeIcon
                className='soc-b'
                icon={faThumbsDown}
              ></FontAwesomeIcon>{' '}
              <span>{unlike.length > 0 && <span>{unlike.length}</span>}</span>
            </span>
            <span>
              <Link
                to={`/posts/${_id}`}
                className='me-3 link text-info text-decoration-none'
              >
                <FontAwesomeIcon icon={faComment}></FontAwesomeIcon>{' '}
                {comments.length > 0 && <span>{comments.length}</span>}
              </Link>
            </span>
            {!auth.loading && user === auth.user._id && (
              <span onClick={() => deletePost(_id)} className='link text-info'>
                <FontAwesomeIcon icon={faTrashAlt}></FontAwesomeIcon>
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  </div>
);

PostItem.defaultProps = {
  showActions: true,
};

PostItem.propTypes = {
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  addLike: PropTypes.func.isRequired,
  removeLike: PropTypes.func.isRequired,
  deletePost: PropTypes.func.isRequired,
  showActions: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, {
  addLike,
  removeLike,
  deletePost,
})(PostItem);

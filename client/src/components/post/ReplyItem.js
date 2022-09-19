import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import formatDate from '../../utils/formatDate';
import { addReplyLike, removeReplyLike, deleteReply } from '../../actions/post';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faTrashAlt,
  faUser,
  faThumbsUp,
  faThumbsDown,
} from '@fortawesome/free-solid-svg-icons';

const ReplyItem = ({
  postId,
  commentId,
  reply: { _id, text, name, picture, likes, unlike, user, date },
  auth,
  addReplyLike,
  removeReplyLike,
  deleteReply,
  showActions,
}) => (
  <div className='card card-body bg-white mb-3'>
    <div className='row py-2 px-4'>
      <div className='col-md-2 mt-3'>
        <div className='col-3 px-0 px-lg-2 col-md-12 mx-auto'>
          {picture ? (
            <Link className='text-decoration-none' to={`/profile/${user}`}>
              <img src={picture} alt='' className='rounded-circle' />
              <p className='link mt-1 link-sm text-info text-center'>
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
              <p className='link text-info text-center'>
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
            <span
              onClick={() => addReplyLike(postId, commentId, _id)}
              className='me-3 link text-info'
            >
              <FontAwesomeIcon
                className='soc-a'
                icon={faThumbsUp}
              ></FontAwesomeIcon>{' '}
              <span>{likes.length > 0 && <span>{likes.length}</span>}</span>
            </span>
            <span
              onClick={() => removeReplyLike(postId, commentId, _id)}
              className='me-3 link text-info'
            >
              <FontAwesomeIcon
                className='soc-b'
                icon={faThumbsDown}
              ></FontAwesomeIcon>{' '}
              <span>{unlike.length > 0 && <span>{unlike.length}</span>}</span>
            </span>
            {!auth.loading && user === auth.user._id && (
              <span
                onClick={() => deleteReply(postId, commentId, _id)}
                className='link text-info'
              >
                <FontAwesomeIcon
                  className='soc-i'
                  icon={faTrashAlt}
                ></FontAwesomeIcon>
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  </div>
);

ReplyItem.defaultProps = {
  showActions: true,
};

ReplyItem.propTypes = {
  postId: PropTypes.string.isRequired,
  commentId: PropTypes.string.isRequired,
  reply: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  addReplyLike: PropTypes.func.isRequired,
  removeReplyLike: PropTypes.func.isRequired,
  deleteReply: PropTypes.func.isRequired,
  showActions: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, {
  addReplyLike,
  removeReplyLike,
  deleteReply,
})(ReplyItem);

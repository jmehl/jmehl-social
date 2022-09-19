import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import formatDate from '../../utils/formatDate';
import {
  addCommentLike,
  removeCommentLike,
  deleteComment,
} from '../../actions/post';
import ReplyForm from './ReplyForm';
import ReplyItem from './ReplyItem';
import { getMoreReplies } from '../../actions/post';
import Alert from '../layout/Alert';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faTrashAlt,
  faUser,
  faReply,
  faThumbsUp,
  faThumbsDown,
} from '@fortawesome/free-solid-svg-icons';

const CommentItem = ({
  postId,
  comment: { _id, text, name, picture, likes, unlike, replies, user, date },
  auth,
  addCommentLike,
  removeCommentLike,
  getMoreReplies,
  deleteComment,
  showActions,
}) => {
  const [displayReplies, toggleReplies] = useState(false);
  return (
    <div className='card card-body bg-white mb-3'>
      <div className='row py-2 px-4'>
        <div className='col-md-2 mt-3'>
          <div className='col-3 px-0 px-lg-2 col-md-12 mx-auto'>
            {picture ? (
              <Link className='text-decoration-none' to={`/profile/${user}`}>
                <img src={picture} alt='' className='rounded-circle' />
                <p className='link text-info text-center'>
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
                onClick={() => toggleReplies(!displayReplies)}
                className='me-3 link text-info'
              >
                <FontAwesomeIcon
                  className='soc-i'
                  icon={faReply}
                ></FontAwesomeIcon>
              </span>
              <span
                onClick={() => addCommentLike(postId, _id)}
                className='me-3 link text-info'
              >
                <FontAwesomeIcon
                  className='soc-a'
                  icon={faThumbsUp}
                ></FontAwesomeIcon>{' '}
                <span>{likes.length > 0 && <span>{likes.length}</span>}</span>
              </span>
              <span
                onClick={() => removeCommentLike(postId, _id)}
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
                  onClick={() => deleteComment(postId, _id)}
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
          {replies.length > 0 &&
            (!displayReplies ? (
              <span
                onClick={() => toggleReplies(!displayReplies)}
                className='link text-info d-block me-auto'
              >
                show replies
              </span>
            ) : (
              <span
                onClick={() => toggleReplies(!displayReplies)}
                className='link text-info d-block me-auto'
              >
                hide replies
              </span>
            ))}
        </div>
      </div>
      {displayReplies && (
        <Fragment>
          <div className='col-md-11 mb-5 ps-4 border-start ms-auto'>
            <Alert />
            <ReplyForm postId={postId} commentId={_id}></ReplyForm>
            {replies.map((reply) => (
              <ReplyItem
                key={reply._id}
                reply={reply}
                postId={postId}
                commentId={_id}
              />
            ))}
            {replies.length > 0 && (
              <span
                onClick={() => getMoreReplies(postId, _id, replies.length)}
                className='link text-info ms-5 pb-3'
              >
                show more
              </span>
            )}
          </div>
        </Fragment>
      )}
    </div>
  );
};

CommentItem.defaultProps = {
  showActions: true,
};

CommentItem.propTypes = {
  postId: PropTypes.string.isRequired,
  comment: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  addCommentLike: PropTypes.func.isRequired,
  removeCommentLike: PropTypes.func.isRequired,
  deleteComment: PropTypes.func.isRequired,
  getMoreReplies: PropTypes.func.isRequired,
  showActions: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, {
  addCommentLike,
  removeCommentLike,
  getMoreReplies,
  deleteComment,
})(CommentItem);

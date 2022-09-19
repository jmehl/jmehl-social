import React, { useEffect, useRef, useCallback, Fragment } from 'react';
import PropTypes from 'prop-types';
import { useNavigate, useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import PostItem from '../posts/PostItem';
import CommentForm from '../post/CommentForm';
import CommentItem from '../post/CommentItem';
import { getPost, getMoreComments } from '../../actions/post';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';

const Post = ({
  getPost,
  getMoreComments,
  post: { post, loading, loadingMore, endOfComments },
}) => {
  const { id } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    getPost(id);
  }, [getPost, id]);

  const observer = useRef();
  let moreComments;

  const lastComment = useCallback(
    (node) => {
      if (loading) return;
      if (!post.comments.length) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && !endOfComments) {
          getMoreComments(post._id, post.comments.length);
        }
      });

      if (node) observer.current.observe(node);
    },
    [post, loading, getMoreComments, endOfComments]
  );

  if (loadingMore && !endOfComments) {
    moreComments = <Spinner />;
  } else {
    moreComments = '';
  }

  return (
    <section className='container'>
      {loading || post === null ? (
        <Spinner />
      ) : (
        <Fragment>
          <button
            className='btn btn-sm w-auto px-4 btn-info my-3'
            onClick={() => navigate(-1)}
          >
            <FontAwesomeIcon icon={faAngleLeft}></FontAwesomeIcon>
          </button>
          <PostItem post={post} showActions={false} />
          <CommentForm postId={post._id} />
          <div className='mt-5'>
            {post.comments.map((comment, i) =>
              post.comments.length === i + 1 ? (
                <div key={comment._id} ref={lastComment}>
                  <CommentItem comment={comment} postId={post._id} />
                </div>
              ) : (
                <div key={comment._id}>
                  <CommentItem comment={comment} postId={post._id} />
                </div>
              )
            )}
          </div>
          {moreComments}
          {endOfComments && (
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

Post.propTypes = {
  getPost: PropTypes.func.isRequired,
  getMoreComments: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  post: state.post,
});

export default connect(mapStateToProps, { getPost, getMoreComments })(Post);

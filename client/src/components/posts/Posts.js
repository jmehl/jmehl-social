import React, { useEffect, useRef, useCallback, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import PostItem from './PostItem';
import PostForm from './PostForm';
import { getPosts } from '../../actions/post';
import { getMorePosts } from '../../actions/post';
import Spinner from '../layout/Spinner';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

const Posts = ({
  getPosts,
  getMorePosts,
  post: { posts, loading, loadingMore, endOfPosts },
}) => {
  useEffect(() => {
    getPosts();
  }, [getPosts]);

  const observer = useRef();
  let morePosts;

  const lastPost = useCallback(
    (node) => {
      if (loading) return;
      if (!posts.length) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && !endOfPosts) {
          getMorePosts(posts[posts.length - 1].date);
        }
      });

      if (node) observer.current.observe(node);
    },
    [posts, loading, getMorePosts, endOfPosts]
  );

  if (loadingMore) {
    morePosts = <Spinner />;
  } else {
    morePosts = '';
  }

  return (
    <section className='container'>
      {loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <h1 className='display-4 font-weight-bold mt-5 text-secondary text-center'>
            Posts
          </h1>
          <p className='lead text-secondary text-center'>
            <FontAwesomeIcon icon={faUser}></FontAwesomeIcon> Welcome to the
            community
          </p>
          <div className='mt-5'>
            <PostForm />
          </div>
          <div className='mt-5'>
            {posts.length > 0 ? (
              posts.map((post, i) =>
                posts.length === i + 1 ? (
                  <div key={post._id} ref={lastPost}>
                    <PostItem post={post} />
                  </div>
                ) : (
                  <div key={post._id}>
                    <PostItem post={post} />
                  </div>
                )
              )
            ) : (
              <h4>No Posts found...</h4>
            )}
          </div>
          {morePosts}
          {endOfPosts && (
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

Posts.propTypes = {
  getPosts: PropTypes.func.isRequired,
  getMorePosts: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  post: state.post,
});

export default connect(mapStateToProps, { getPosts, getMorePosts })(Posts);

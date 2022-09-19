import api from '../utils/api';
import { setAlert } from './alert';
import {
  GET_POSTS,
  POST_ERROR,
  UPDATE_LIKES,
  UPDATE_COMMENT_LIKES,
  UPDATE_REPLY_LIKES,
  DELETE_POST,
  ADD_POST,
  GET_POST,
  GET_MORE_POSTS,
  GET_MORE_COMMENTS,
  GET_MORE_REPLIES,
  END_OF_POSTS,
  END_OF_COMMENTS,
  END_OF_REPLIES,
  ADD_COMMENT,
  REMOVE_COMMENT,
  ADD_REPLY,
  REMOVE_REPLY,
} from './types';

// Get posts
export const getPosts = () => async (dispatch) => {
  try {
    const res = await api.get('/posts');

    dispatch({
      type: GET_POSTS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Add Post like
export const addLike = (id) => async (dispatch) => {
  try {
    const res = await api.put(`/posts/like/${id}`);

    dispatch({
      type: UPDATE_LIKES,
      payload: { id, likes: res.data.likes, unlike: res.data.unlike },
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Remove Post like
export const removeLike = (id) => async (dispatch) => {
  try {
    const res = await api.put(`/posts/unlike/${id}`);

    dispatch({
      type: UPDATE_LIKES,
      payload: { id, likes: res.data.likes, unlike: res.data.unlike },
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Add Comment like
export const addCommentLike = (postId, commentId) => async (dispatch) => {
  try {
    const res = await api.put(`/posts/comment/like/${postId}/${commentId}`);

    dispatch({
      type: UPDATE_COMMENT_LIKES,
      payload: {
        postId,
        commentId,
        likes: res.data.likes,
        unlike: res.data.unlike,
      },
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Remove Comment like
export const removeCommentLike = (postId, commentId) => async (dispatch) => {
  try {
    const res = await api.put(`/posts/comment/unlike/${postId}/${commentId}`);

    dispatch({
      type: UPDATE_COMMENT_LIKES,
      payload: {
        postId,
        commentId,
        likes: res.data.likes,
        unlike: res.data.unlike,
      },
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Add Reply like
export const addReplyLike =
  (postId, commentId, replyId) => async (dispatch) => {
    try {
      const res = await api.put(
        `/posts/comment/reply/like/${postId}/${commentId}/${replyId}`
      );

      dispatch({
        type: UPDATE_REPLY_LIKES,
        payload: {
          postId,
          commentId,
          replyId,
          likes: res.data.likes,
          unlike: res.data.unlike,
        },
      });
    } catch (err) {
      dispatch({
        type: POST_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status },
      });
    }
  };

// Remove Reply like
export const removeReplyLike =
  (postId, commentId, replyId) => async (dispatch) => {
    try {
      const res = await api.put(
        `/posts/comment/reply/unlike/${postId}/${commentId}/${replyId}`
      );

      dispatch({
        type: UPDATE_REPLY_LIKES,
        payload: {
          postId,
          commentId,
          replyId,
          likes: res.data.likes,
          unlike: res.data.unlike,
        },
      });
    } catch (err) {
      dispatch({
        type: POST_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status },
      });
    }
  };

// Delete post
export const deletePost = (id) => async (dispatch) => {
  try {
    await api.delete(`/posts/${id}`);

    dispatch({
      type: DELETE_POST,
      payload: id,
    });

    dispatch(setAlert('Post Removed', 'success'));
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Add post
export const addPost = (formData) => async (dispatch) => {
  try {
    const res = await api.post('/posts', formData);

    dispatch({
      type: ADD_POST,
      payload: res.data,
    });

    dispatch(setAlert('Post Created', 'success'));
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Get post
export const getPost = (id) => async (dispatch) => {
  try {
    const res = await api.get(`/posts/${id}`);

    dispatch({
      type: GET_POST,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const getMoreComments = (id, num) => async (dispatch) => {
  try {
    const res = await api.get(`/posts/${id}`, {
      params: {
        num: num,
      },
    });

    console.log(res);

    res.data.comments.length > 0
      ? dispatch({
          type: GET_MORE_COMMENTS,
          payload: res.data.comments,
        })
      : dispatch({
          type: END_OF_COMMENTS,
        });
    sessionStorage.setItem('scroll', window.scrollY);
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const getMorePosts = (date) => async (dispatch) => {
  try {
    const res = await api.get('/posts/more', {
      params: {
        date: date,
      },
    });
    !Array.isArray(res.data) || !res.data.length || res.data.includes(date)
      ? dispatch({
          type: END_OF_POSTS,
        })
      : dispatch({
          type: GET_MORE_POSTS,
          payload: res.data,
        });
    sessionStorage.setItem('scroll', window.scrollY);
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Add comment
export const addComment = (postId, formData) => async (dispatch) => {
  try {
    const res = await api.post(`/posts/comment/${postId}`, formData);

    dispatch({
      type: ADD_COMMENT,
      payload: res.data,
    });

    dispatch(setAlert('Comment Added', 'success'));
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Delete comment
export const deleteComment = (postId, commentId) => async (dispatch) => {
  try {
    await api.delete(`/posts/comment/${postId}/${commentId}`);

    dispatch({
      type: REMOVE_COMMENT,
      payload: commentId,
    });

    dispatch(setAlert('Comment Removed', 'success'));
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Add reply
export const addReply = (postId, commentId, formData) => async (dispatch) => {
  try {
    const res = await api.post(
      `/posts/comment/reply/${postId}/${commentId}`,
      formData
    );

    dispatch({
      type: ADD_REPLY,
      payload: {
        commentId,
        replies: res.data,
      },
    });

    dispatch(setAlert('Reply Added', 'success'));
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Delete reply
export const deleteReply = (postId, commentId, replyId) => async (dispatch) => {
  try {
    await api.delete(`/posts/comment/reply/${postId}/${commentId}/${replyId}`);

    dispatch({
      type: REMOVE_REPLY,
      payload: {
        commentId,
        replyId,
      },
    });

    dispatch(setAlert('Reply Removed', 'success'));
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const getMoreReplies = (id, commentId, num) => async (dispatch) => {
  try {
    const res = await api.get(`/posts/comments/replies/${id}/${commentId}`, {
      params: {
        num: num,
      },
    });

    console.log(res.data);

    res.data.length > 0
      ? dispatch({
          type: GET_MORE_REPLIES,
          payload: {
            commentId,
            replies: res.data,
          },
        })
      : dispatch({
          type: END_OF_REPLIES,
        });
    sessionStorage.setItem('scroll', window.scrollY);
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

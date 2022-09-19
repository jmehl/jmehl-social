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
} from '../actions/types';

const initialState = {
  posts: [],
  post: null,
  loading: true,
  loadingMore: true,
  endOfPosts: false,
  endOfComments: false,
  endOfReplies: false,
  error: {},
};

function postReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_POSTS:
      return {
        ...state,
        posts: payload,
        loading: false,
        loadingMore: false,
        endOfPosts: false,
      };
    case GET_MORE_POSTS:
      return {
        ...state,
        posts: [...new Set([...state.posts, ...payload])],
        loading: false,
        loadingMore: false,
      };
    case END_OF_POSTS:
      return {
        ...state,
        endOfPosts: true,
      };
    case END_OF_COMMENTS:
      return {
        ...state,
        endOfComments: true,
      };
    case END_OF_REPLIES:
      return {
        ...state,
        endOfReplies: true,
      };
    case GET_POST:
      return {
        ...state,
        post: payload,
        loading: false,
        endOfComments: false,
      };
    case GET_MORE_COMMENTS:
      return {
        ...state,
        post: {
          ...state.post,
          comments: [...new Set([...state.post.comments, ...payload])],
        },
        loading: false,
        loadingMore: false,
      };
    case GET_MORE_REPLIES:
      return {
        ...state,
        post: {
          ...state.post,
          comments: state.post.comments.map((comment) =>
            comment._id === payload.commentId
              ? {
                  ...comment,
                  replies: [
                    ...new Set([...comment.replies, ...payload.replies]),
                  ],
                }
              : comment
          ),
        },
        loading: false,
      };
    case ADD_POST:
      return {
        ...state,
        posts: [payload, ...state.posts],
        loading: false,
      };
    case DELETE_POST:
      return {
        ...state,
        posts: state.posts.filter((post) => post._id !== payload),
        loading: false,
      };
    case POST_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    case UPDATE_LIKES:
      return {
        ...state,
        posts: state.posts.map((post) =>
          post._id === payload.id
            ? { ...post, likes: payload.likes, unlike: payload.unlike }
            : post
        ),
        loading: false,
      };
    case UPDATE_COMMENT_LIKES:
      return {
        ...state,
        post: {
          ...state.post,
          comments: state.post.comments.map((comment) =>
            comment._id === payload.commentId
              ? {
                  ...comment,
                  likes: payload.likes,
                  unlike: payload.unlike,
                }
              : comment
          ),
        },
        loading: false,
      };
    case UPDATE_REPLY_LIKES:
      return {
        ...state,
        post: {
          ...state.post,
          comments: state.post.comments.map((comment) =>
            comment._id === payload.commentId
              ? {
                  ...comment,
                  replies: comment.replies.map((reply) =>
                    reply._id === payload.replyId
                      ? {
                          ...reply,
                          likes: payload.likes,
                          unlike: payload.unlike,
                        }
                      : reply
                  ),
                }
              : comment
          ),
        },
        loading: false,
      };
    case ADD_COMMENT:
      return {
        ...state,
        post: { ...state.post, comments: payload },
        loading: false,
      };
    case REMOVE_COMMENT:
      return {
        ...state,
        post: {
          ...state.post,
          comments: state.post.comments.filter(
            (comment) => comment._id !== payload
          ),
        },
        loading: false,
      };
    case ADD_REPLY:
      return {
        ...state,
        post: {
          ...state.post,
          comments: state.post.comments.map((comment) =>
            comment._id === payload.commentId
              ? {
                  ...comment,
                  replies: payload.replies,
                }
              : comment
          ),
        },
        loading: false,
      };
    case REMOVE_REPLY:
      return {
        ...state,
        post: {
          ...state.post,
          comments: state.post.comments.map((comment) =>
            comment._id === payload.commentId
              ? {
                  ...comment,
                  replies: comment.replies.filter(
                    (reply) => reply._id !== payload.replyId
                  ),
                }
              : comment
          ),
        },
        loading: false,
      };
    default:
      return state;
  }
}

export default postReducer;

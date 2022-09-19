const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const PostSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users',
  },
  text: {
    type: String,
    required: true,
  },
  name: {
    type: String,
  },
  picture: {
    type: String,
  },
  likes: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: 'users',
      },
    },
  ],
  unlike: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: 'users',
      },
    },
  ],
  comments: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: 'users',
      },
      text: {
        type: String,
        required: true,
      },
      name: {
        type: String,
      },
      picture: {
        type: String,
      },
      likes: [
        {
          user: {
            type: Schema.Types.ObjectId,
            ref: 'users',
          },
        },
      ],
      unlike: [
        {
          user: {
            type: Schema.Types.ObjectId,
            ref: 'users',
          },
        },
      ],
      replies: [
        {
          user: {
            type: Schema.Types.ObjectId,
            ref: 'users',
          },
          text: {
            type: String,
            required: true,
          },
          name: {
            type: String,
          },
          picture: {
            type: String,
          },
          likes: [
            {
              user: {
                type: Schema.Types.ObjectId,
                ref: 'users',
              },
            },
          ],
          unlike: [
            {
              user: {
                type: Schema.Types.ObjectId,
                ref: 'users',
              },
            },
          ],
          date: {
            type: Date,
            default: Date.now,
          },
        },
      ],
      date: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Post = mongoose.model('post', PostSchema);

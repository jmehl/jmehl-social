const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');

const Post = require('../../models/Post');
const User = require('../../models/User');
const checkObjectId = require('../../middleware/checkObjectId');

router.post(
  '/',
  auth,
  check('text', 'Text is required').notEmpty(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const user = await User.findById(req.user.id).select('-password');

      const newPost = new Post({
        text: req.body.text,
        name: user.name,
        picture: user.picture,
        user: req.user.id,
      });

      const post = await newPost.save();

      res.json(post);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

router.get('/', auth, async (req, res) => {
  try {
    const posts = await Post.find().sort({ date: -1 }).limit(4);
    res.json(posts);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

router.get('/more', async (req, res) => {
  try {
    const curDate = req.query.date;
    const posts = await Post.find({ date: { $lt: curDate } })
      .limit(2)
      .sort({ date: -1 });
    res.json(posts);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

router.get('/:id', auth, checkObjectId('id'), async (req, res) => {
  try {
    const curCom = req.query.num;
    if (curCom) {
      const post = await Post.findById(req.params.id).slice('comments', [
        parseInt(curCom),
        4,
      ]);

      post.comments.map((comment) => {
        comment.replies = comment.replies.slice(0, 4);
      });

      if (!post) {
        return res.status(404).json({ msg: 'Comments not found' });
      }

      res.json(post);
    } else {
      const post = await Post.findById(req.params.id).slice('comments', [0, 4]);

      post.comments.map((comment) => {
        comment.replies = comment.replies.slice(0, 4);
      });

      if (!post) {
        return res.status(404).json({ msg: 'Post not found' });
      }

      res.json(post);
    }
  } catch (err) {
    console.error(err.message);

    res.status(500).send('Server Error');
  }
});

router.delete('/:id', [auth, checkObjectId('id')], async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ msg: 'Post not found' });
    }

    if (post.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }

    await post.remove();

    res.json({ msg: 'Post removed' });
  } catch (err) {
    console.error(err.message);

    res.status(500).send('Server Error');
  }
});

router.put('/like/:id', auth, checkObjectId('id'), async (req, res) => {
  try {
    const post = await Post.findById(req.params.id).select('-comments');

    if (post.likes.some((like) => like.user.toString() === req.user.id)) {
      post.likes = post.likes.filter(
        ({ user }) => user.toString() !== req.user.id
      );
    } else {
      post.likes.unshift({ user: req.user.id });
    }

    post.unlike = post.unlike.filter(
      ({ user }) => user.toString() !== req.user.id
    );

    await post.save();

    return res.json(post);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

router.put('/unlike/:id', auth, checkObjectId('id'), async (req, res) => {
  try {
    const post = await Post.findById(req.params.id).select('-comments');

    if (post.unlike.some((un) => un.user.toString() === req.user.id)) {
      post.unlike = post.unlike.filter(
        ({ user }) => user.toString() !== req.user.id
      );
    } else {
      post.unlike.unshift({ user: req.user.id });
    }

    post.likes = post.likes.filter(
      ({ user }) => user.toString() !== req.user.id
    );

    await post.save();

    return res.json(post);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

router.put(
  '/comment/like/:id/:comment_id',
  auth,
  checkObjectId('id'),
  async (req, res) => {
    try {
      const post = await Post.findById(req.params.id);

      const comment = post.comments.find(
        (comment) => comment.id === req.params.comment_id
      );

      if (comment.likes.some((like) => like.user.toString() === req.user.id)) {
        comment.likes = comment.likes.filter(
          ({ user }) => user.toString() !== req.user.id
        );
      } else {
        comment.likes.unshift({ user: req.user.id });
      }

      comment.unlike = comment.unlike.filter(
        ({ user }) => user.toString() !== req.user.id
      );

      await post.save();

      return res.json(comment);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

router.put(
  '/comment/unlike/:id/:comment_id',
  auth,
  checkObjectId('id'),
  async (req, res) => {
    try {
      const post = await Post.findById(req.params.id);

      const comment = post.comments.find(
        (comment) => comment.id === req.params.comment_id
      );

      if (comment.unlike.some((un) => un.user.toString() === req.user.id)) {
        comment.unlike = comment.unlike.filter(
          ({ user }) => user.toString() !== req.user.id
        );
      } else {
        comment.unlike.unshift({ user: req.user.id });
      }

      comment.likes = comment.likes.filter(
        ({ user }) => user.toString() !== req.user.id
      );

      await post.save();

      return res.json(comment);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

router.put(
  '/comment/reply/like/:id/:comment_id/:reply_id',
  auth,
  checkObjectId('id'),
  async (req, res) => {
    try {
      const post = await Post.findById(req.params.id);

      const comment = post.comments.find(
        (comment) => comment.id === req.params.comment_id
      );

      const reply = comment.replies.find(
        (reply) => reply.id === req.params.reply_id
      );

      if (reply.likes.some((like) => like.user.toString() === req.user.id)) {
        reply.likes = reply.likes.filter(
          ({ user }) => user.toString() !== req.user.id
        );
      } else {
        reply.likes.unshift({ user: req.user.id });
      }

      reply.unlike = reply.unlike.filter(
        ({ user }) => user.toString() !== req.user.id
      );

      await post.save();

      return res.json(reply);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

router.put(
  '/comment/reply/unlike/:id/:comment_id/:reply_id',
  auth,
  checkObjectId('id'),
  async (req, res) => {
    try {
      const post = await Post.findById(req.params.id);

      const comment = post.comments.find(
        (comment) => comment.id === req.params.comment_id
      );

      const reply = comment.replies.find(
        (reply) => reply.id === req.params.reply_id
      );

      if (reply.unlike.some((un) => un.user.toString() === req.user.id)) {
        reply.unlike = reply.unlike.filter(
          ({ user }) => user.toString() !== req.user.id
        );
      } else {
        reply.unlike.unshift({ user: req.user.id });
      }

      reply.likes = reply.likes.filter(
        ({ user }) => user.toString() !== req.user.id
      );

      await post.save();

      return res.json(reply);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

router.post(
  '/comment/:id',
  auth,
  checkObjectId('id'),
  check('text', 'Text is required').notEmpty(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const user = await User.findById(req.user.id).select('-password');
      const post = await Post.findById(req.params.id);

      const newComment = {
        text: req.body.text,
        name: user.name,
        picture: user.picture,
        user: req.user.id,
      };

      post.comments.unshift(newComment);

      await post.save();

      res.json(post.comments);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

router.delete('/comment/:id/:comment_id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    const comment = post.comments.find(
      (comment) => comment.id === req.params.comment_id
    );

    if (!comment) {
      return res.status(404).json({ msg: 'Comment does not exist' });
    }

    if (comment.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }

    post.comments = post.comments.filter(
      ({ id }) => id !== req.params.comment_id
    );

    await post.save();

    return res.json(post.comments);
  } catch (err) {
    console.error(err.message);
    return res.status(500).send('Server Error');
  }
});

router.post(
  '/comment/reply/:id/:comment_id',
  auth,
  checkObjectId('id'),
  check('text', 'Text is required').notEmpty(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const user = await User.findById(req.user.id).select('-password');

      const post = await Post.findById(req.params.id);

      const comment = post.comments.find(
        (comment) => comment.id === req.params.comment_id
      );

      const newReply = {
        text: req.body.text,
        name: user.name,
        picture: user.picture,
        user: req.user.id,
      };

      comment.replies.unshift(newReply);

      await post.save();

      res.json(comment.replies);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

router.delete(
  '/comment/reply/:id/:comment_id/:reply_id',
  auth,
  async (req, res) => {
    try {
      const post = await Post.findById(req.params.id);

      const comment = post.comments.find(
        (comment) => comment.id === req.params.comment_id
      );

      const reply = comment.replies.find(
        (reply) => reply.id === req.params.reply_id
      );

      if (!reply) {
        return res.status(404).json({ msg: 'Reply does not exist' });
      }

      if (reply.user.toString() !== req.user.id) {
        return res.status(401).json({ msg: 'User not authorized' });
      }

      comment.replies = comment.replies.filter(
        ({ id }) => id !== req.params.reply_id
      );

      await post.save();

      return res.json(comment.replies);
    } catch (err) {
      console.error(err.message);
      return res.status(500).send('Server Error');
    }
  }
);

router.get(
  '/comments/replies/:id/:comment_id',
  auth,
  checkObjectId('id'),
  async (req, res) => {
    try {
      const curRep = req.query.num;
      const more = parseInt(curRep) + 4;

      const post = await Post.findById(req.params.id);

      const comment = post.comments.find(
        (comment) => comment.id === req.params.comment_id
      );

      comment.replies = comment.replies.slice(curRep, more);

      if (!post) {
        return res.status(404).json({ msg: 'Replies not found' });
      }

      res.json(comment.replies);
    } catch (err) {
      console.error(err.message);

      res.status(500).send('Server Error');
    }
  }
);

module.exports = router;

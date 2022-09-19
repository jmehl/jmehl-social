import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addComment } from '../../actions/post';

const CommentForm = ({ postId, addComment }) => {
  const [formData, setFormData] = useState({
    text: '',
  });

  const { text } = formData;

  const postURL = 'https://my.api.mockaroo.com/text.json?key=39caf430';

  const onAuto = async () => {
    const response = await fetch(postURL);
    const data = await response.json();
    setFormData({
      formData,
      text: data.text,
    });
  };

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    addComment(postId, { text });
    setFormData({ text: '' });
  };

  return (
    <section className='container'>
      <div className='bg-primary'>
        <p className='lead px-3 py-1 text-light'>Leave a Comment...</p>
      </div>
      <form className='form my-1' onSubmit={onSubmit}>
        <div className='form-group'>
          <textarea
            className='area-h form-control form-control-lg'
            name='text'
            placeholder='Comment on this post'
            value={text}
            onChange={onChange}
            required
          />
        </div>
        <input
          type='button'
          value='Auto Fill'
          onClick={onAuto}
          className='btn btn-info px-4'
        />
        <input type='submit' className='btn px-4 btn-info' value='Post' />
      </form>
    </section>
  );
};

CommentForm.propTypes = {
  addComment: PropTypes.func.isRequired,
};

export default connect(null, { addComment })(CommentForm);

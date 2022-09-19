import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addReply } from '../../actions/post';

const ReplyForm = ({ postId, commentId, addReply }) => {
  const [formData, setFormData] = useState({
    text: '',
  });

  const { text } = formData;

  const replyURL = 'https://my.api.mockaroo.com/text2.json?key=39caf430';

  const onAuto = async () => {
    const response = await fetch(replyURL);
    const data = await response.json();
    setFormData({
      formData,
      text: data.text2,
    });
  };

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    addReply(postId, commentId, { text });
    setFormData({ text: '' });
  };

  return (
    <section className='container mt-4'>
      <div className='bg-primary'>
        <p className='lead px-3 py-1 text-light'>Leave a reply...</p>
      </div>
      <form className='form my-1' onSubmit={onSubmit}>
        <div className='form-group'>
          <textarea
            className='form-control form-control-lg'
            name='text'
            placeholder='Reply to this comment'
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

ReplyForm.propTypes = {
  addReply: PropTypes.func.isRequired,
};

export default connect(null, { addReply })(ReplyForm);

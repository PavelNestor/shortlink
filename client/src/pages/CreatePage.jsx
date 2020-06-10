import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';

import { InputField, Button } from '../components';
import { useHttp, useToast } from '../hooks';
import { AuthContext } from '../context/AuthContext';

export const CreatePage = () => {
  const history = useHistory();
  const auth = useContext(AuthContext);
  const { loading, request } = useHttp();
  const [link, setLink] = useState('');
  const toast = useToast();

  const handleChange = ({ target: { value } }) => {
    setLink(value);
  };

  const handleSubmit = async () => {
    request(
      '/api/link/generate',
      'POST',
      {
        from: link,
      },
      { Authorization: `Bearer ${auth.token}` }
    )
      .then((data) => {
        setLink('');
        if (data) {
          toast({ text: data?.message });
          history.push(`/detail/${data?.link?._id}`);
        }
      })
      .catch((error) => toast({ error: true, text: error }));
  };

  return (
    <div className='row'>
      <div className='col s8 offset-s2'>
        <h1>Create Link:</h1>

        <InputField
          className='validate'
          id='link'
          label='Link'
          name='link'
          onChange={handleChange}
          type='text'
          value={link}
        />

        <Button
          accent
          disabled={loading}
          onClick={handleSubmit}
          text='Create'
        />
      </div>
    </div>
  );
};

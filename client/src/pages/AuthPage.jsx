import React, { useState } from 'react';

import { Button, InputField, Row } from '../components';
import { useHttp, useToast } from '../hooks';
import { useEffect } from 'react';

export const AuthPage = () => {
  const { clearError, error, loading, request } = useHttp();
  const toast = useToast();
  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  useEffect(() => {
    toast({ error: true, text: error });
    clearError();
  }, [clearError, error, toast]);

  const handleChange = ({ target: { name, value } }) => {
    setForm({ ...form, [name]: value });
  };

  const handleRegister = async () => {
    request('api/auth/register', 'POST', { ...form }).then(
      (data) => data && toast({ text: data.message })
    );
  };

  return (
    <div className='row'>
      <div className='col s6 offset-s3'>
        <h1>Short Links</h1>

        <div className='card blue-grey lighten-5'>
          <div className='card-content'>
            <span className='card-title'>Authorization</span>

            <Row>
              <form className='col s12'>
                <Row>
                  <InputField
                    className='validate'
                    id='email'
                    label='Email'
                    name='email'
                    onChange={handleChange}
                    type='email'
                  />
                </Row>

                <Row>
                  <InputField
                    className='validate'
                    id='password'
                    label='Password'
                    name='password'
                    onChange={handleChange}
                    type='password'
                  />
                </Row>
              </form>
            </Row>
          </div>
          <div className='card-action'>
            <Button accent disabled={loading} text='Login' />

            <Button
              className='ml-1'
              disabled={loading}
              onClick={handleRegister}
              text='Register'
            />
          </div>
        </div>
      </div>
    </div>
  );
};

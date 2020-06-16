import React from 'react';
import { useHistory } from 'react-router-dom';

import { Button, Column, Flex } from '@/components';

export const LandingPage = () => {
  const history = useHistory();

  const handleLogin = () => {
    history.push(`/login`);
  };

  return (
    <Column>
      <h1>Create Click-Worthy Links</h1>

      <p>
        Build and protect your brand using powerful, recognizable short links.
      </p>

      <Flex>
        <Button accent onClick={handleLogin} text='Login' />

        <Button accent className='ml-1' onClick={handleLogin} text='Register' />
      </Flex>
    </Column>
  );
};

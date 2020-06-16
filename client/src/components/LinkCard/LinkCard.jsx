import React from 'react';

import { Link } from '@/components/Link/Link';

export const LinkCard = ({ link: { clicks, date, from, to } }) => {
  return (
    <>
      <h2>Link</h2>

      <p>
        Link:{' '}
        <Link href={to} text={to} target='_blank' rel='noopener noreferrer' />
      </p>

      <p>
        Short Link:{' '}
        <Link
          href={from}
          text={from}
          target='_blank'
          rel='noopener noreferrer'
        />
      </p>

      <p>
        Couner click: <strong>{clicks}</strong>
      </p>

      <p>
        Create date: <strong>{new Date(date).toLocaleDateString()}</strong>
      </p>
    </>
  );
};

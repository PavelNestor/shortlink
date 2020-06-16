import React from 'react';

import { JustifyCenter } from '@/components/Grid/JustifyCenter';

export const Loader = () => {
  return (
    <JustifyCenter className=''>
      <div className='preloader-wrapper active'>
        <div className='spinner-layer spinner-green-only'>
          <div className='circle-clipper left'>
            <div className='circle' />
          </div>
          <div className='gap-patch'>
            <div className='circle' />
          </div>
          <div className='circle-clipper right'>
            <div className='circle' />
          </div>
        </div>
      </div>
    </JustifyCenter>
  );
};

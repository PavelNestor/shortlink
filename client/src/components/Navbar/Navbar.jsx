import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';

import { Link } from '../';
import { AuthContext } from '../../context/AuthContext';

export const Navbar = () => {
  const auth = useContext(AuthContext);
  const handleLogout = (event) => {
    event.preventDefault();
    auth.logout();
  };

  return (
    <nav>
      <div className='nav-wrapper light-green accent-2'>
        <a href='/' className='brand-logo'>
          ShortLinks
        </a>
        <ul id='nav-mobile' className='right hide-on-med-and-down'>
          <li>
            <NavLink to='/create'>Create</NavLink>
          </li>

          <li>
            <NavLink to='/links'>Links</NavLink>
          </li>

          <li>
            <Link href='/' text='Logout' onClick={handleLogout} />
          </li>
        </ul>
      </div>
    </nav>
  );
};

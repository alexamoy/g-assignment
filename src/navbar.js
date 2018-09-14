import React from 'react';
import { Icon } from 'semantic-ui-react';

const Navbar = () => {
  return (
    <div className='navbar-container'>
      <Icon name='chevron left' size='large' className='arrow-icon'/>
      <div className='contact-container'>
        <div className='profile-icon'><span>AM</span></div>
        <span>Alexa</span>
      </div>
      <div className='info-icon-container'>
        <Icon name='info' size='small' className='info-icon' />
      </div>
    </div>
  );
};

export default Navbar;

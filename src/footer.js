import React from 'react';
import { Input, Icon } from 'semantic-ui-react';

const Footer = () => {
  return (
    <div className='input-container'>
      <Icon size='large' color='grey' name='camera' />
      <Icon size='large' color='grey' name='app store ios' />
      <Input icon={<Icon size='small' name='microphone' inverted circular link />} placeholder='iMessage' className='input'/>
    </div>
  );
};

export default Footer;

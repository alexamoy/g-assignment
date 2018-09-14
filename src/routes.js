import React from 'react';
import {Route} from 'react-router-dom';
import Messages from './messages';

const Routes = () => {
  return (
    <Route path='/' component={Messages} />
  );
};

export default Routes;

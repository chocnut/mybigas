import React from 'react';
import {useRouteMatch, Redirect} from 'react-router-dom';

export default () => {
  const match = useRouteMatch();
  const {id} = match.params;

  return (
    <Redirect
      to={{
        pathname: '/',
      }}
    />
  );
};

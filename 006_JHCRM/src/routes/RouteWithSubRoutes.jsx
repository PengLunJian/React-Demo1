import React from 'react';
import { Route } from 'react-router-dom';

const RouteWithSubRoutes = (route) => {
  const { path, exact, component, routes, ...otherProps } = route;

  return (
    <Route
      path={path}
      exact={exact}
      render={props => (
        <route.component routes={routes} {...otherProps} {...props} />
      )}
    />
  );
};

export default RouteWithSubRoutes;

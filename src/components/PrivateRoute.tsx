import { Redirect } from '@reach/router';
import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import Layout from './Layout';

type ComponentProps = {
  component: React.FC;
  path: string;
};
const PrivateRoute: React.FC<ComponentProps> = ({
  component: Component,
  ...props
}) => {
  const { isLoggedIn } = useContext(AuthContext);
  return !isLoggedIn ? (
    <Redirect from='' to='/login' noThrow />
  ) : (
    <Layout>
      <Component {...props} />
    </Layout>
  );
};

export default PrivateRoute;

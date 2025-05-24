import React, { use } from 'react'
import { AuthContext } from './AuthProvider';
import { Navigate, useLocation, } from 'react-router';
import Lodding from '../components/Lodding';


const PrivateRoute = ({children}) => {
   const { user, loading } = use(AuthContext);
  //   console.log(user);
  const location = useLocation();
 // console.log(location);

  if (loading) {
    return <Lodding/>;
  }

  if (user && user?.email) {
    return children;
  }
  return <Navigate state={location.pathname} to="/auth/login"></Navigate>;

  //if-> user thake return children
  // navigate--> Login
};
export default PrivateRoute
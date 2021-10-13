import React,{useContext} from 'react';
import { Route, Redirect } from 'react-router-dom';
import Dashboard from './Dashboard';
import { authContext } from './App';
const ProtectedRoute = ({ component: Component, ...rest }) => {
  const authValue=useContext(authContext);
  return (
    <Route {...rest} render={
      props => {
        if (authValue.loginStatus) {
          return <Component {...rest} {...props} />
        }else {
          return (<Redirect to={
            {
              pathname: '/',
              state: {
                from: props.location
              }
            }
          } />)
        }
      }
    } />
  )
}

export default ProtectedRoute;
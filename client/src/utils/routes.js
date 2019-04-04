import React from 'react';
import {Route, Redirect} from 'react-router-dom'

export const LIST_ROUTE = '/list'

const isAuthenticated = () => {console.log('false'); return false}

export function buildPrivateRoute(props) {
    return ({component: Component, ...props}) => {
        return (
        <Route
          {...props}
          render={props =>
            isAuthenticated() ? (
                <Component {...props} />
              ) : (
                <Redirect
                    to={{
                    pathname: '/login',
                    state: {from: props.location}
                    }}
                />
              )
          }
        />
      )
    }
  }

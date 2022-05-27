import React from 'react';
import { Redirect, Route } from 'react-router-dom';

function PublicRoute ({ component: Component, restricted, ...rest }) {
    return (
        <Route
            {...rest}
            render = {props => 
                localStorage.getItem('nickName') ?(
                  <Redirect to={{
                      pathname: '/dailymission-page', 
                    }}
                  />
                ) : ( 
                  <Component {...props} />
                )
            }
        />
    )
}

export default PublicRoute;
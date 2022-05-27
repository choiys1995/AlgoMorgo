import React from 'react';
import { Redirect, Route } from 'react-router-dom';

function PrivateRoute ({ component: Component, ...rest }) {
    return (
        <Route
            {...rest}
            render = {props => 
                localStorage.getItem('nickName')?(
                    <Component {...props} />
                ) : ( 
                    <Redirect to={{
                                    pathname: '/login-page', 
                                  }}
                    />
                )
            }
        />
    )
}

export default PrivateRoute;
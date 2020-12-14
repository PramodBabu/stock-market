import React, { useEffect, useState } from 'react';
import {Redirect, Route} from 'react-router-dom';

const AuthRoute = ({children, ...rest}) => {
    return localStorage.getItem('token') ? <Route {...rest} render={() => children} /> : <Redirect to='/' />
}

export default AuthRoute;
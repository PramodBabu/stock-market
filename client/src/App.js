import React, { Component } from 'react';
import { Redirect, Route, Switch, withRouter} from 'react-router-dom';
import Login from './js/components/Authentication/login/login';
import Home from './js/containers/home/home';
import Layout from './js/hoc/layout/layout';
import AuthRoute from './js/routes/authRoute';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Layout>
          <Switch>
            <AuthRoute path='/home' exact component={Home} />
            <Route path='/' component={Login}></Route>
            <Redirect to='/' />
          </Switch>
        </Layout>
      </div>
    );
  }
}

export default withRouter(App);

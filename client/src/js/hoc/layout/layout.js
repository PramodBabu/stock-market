import React, {Component} from 'react' ;
import Aux from '../auxx/auxx';
import classes from './layout.css';

import Toolbar from '../../components/navigation/toolbar/toolbar';
import SideDrawer from '../../components/navigation/sideDrawer/sideDrawer';

import { Redirect } from 'react-router-dom';

class Layout extends Component {

    state = {
        showsideDrawer: false
    }

    sideDrawerClosedHandler = () => {
        this.setState({showsideDrawer: false});
    }

    _toggleSideDrawer = () => {
        this.setState((prevState) => {
            return  { showsideDrawer : !prevState.showsideDrawer };
        });
    }

    redirectToHome = () => {
        console.log('hello');
        return (
            <Redirect to ='/' />
        );
    }
 

    render () {
        return (
            <Aux>
                <div>
                    <Toolbar toggleSideDrawer={this._toggleSideDrawer} homeRedirect={this.redirectToHome}/>
                    <SideDrawer open={this.state.showsideDrawer} closed={this.sideDrawerClosedHandler}/>
                </div>
                <main className={classes.content}>
                    { this.props.children }
                </main>
            </Aux>
        );
    };
};

export default Layout ;

import React from 'react';
import NavigationItems from '../navigationItems/navigationItems';
import classes from './sideDrawer.css';
import Backdrop from '../../ui/backdrop/backdrop';
import Aux from '../../../hoc/auxx/auxx';
import SideDrawerNavigationItems from '../sideDrawerNavigation/sideDrawerNavigationItems';
import Logo from '../../ui/logo/logo';

const sideDrawer = (props) => {
    
    let attachedClasses = [classes.SideDrawer, classes.Close];

    if(props.open) {
        attachedClasses = [classes.SideDrawer, classes.Open];
    }

    return  (
        <Aux>
            <Backdrop show={props.open} clicked={props.closed} />
            <div className={attachedClasses.join(' ')}>
            <Logo height="70px" className={classes.navText}/>
                <nav  className={classes.navText}>
                    <NavigationItems isAuth={props.isAuth} showAdditonalElements={props.open}/>
                </nav>
                <SideDrawerNavigationItems />
            </div>
        </Aux>
    );
};

export default sideDrawer ;
import React from 'react' ;
import classes from './toolbar.css';
import NavigationItems from '../navigationItems/navigationItems';
import DrawerToggle from '../sideDrawer/drawerToggle/drawerToggle';
import Logo from '../../ui/logo/logo';

const toolbar = (props) => (
    <header className={classes.Toolbar}>
        <DrawerToggle clicked={props.toggleSideDrawer} />
        <div className={classes.ToolbarDiv}>
            <Logo height="80%"/>
        </div>
        <div className={classes.DesktopOnly}>
            <NavigationItems isAuth={props.isAuth} />
        </div>
    </header>
);

export default toolbar ;
import React from 'react' ;
import classes from './logo.css'
import NavigationItem from '../../navigation/navigationItems/navigationItem/navigationItem'

const logo = (props) => (
    <React.Fragment>
        <div className={classes.Logo} style={{height: props.height}} onClick={props.redirectToHome}>
            <NavigationItem link="/home" exact>
                <span className={classes.logoText}>STOCK MARKET</span>
            </NavigationItem>
        </div>
    </React.Fragment>
);

export default logo;
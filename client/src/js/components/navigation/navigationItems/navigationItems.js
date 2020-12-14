import React from 'react' ;
import classes from './navigationItems.css'
import NavigationItem from './navigationItem/navigationItem';
import InputIcon from '@material-ui/icons/Input';

const navigationItems = (props) => {
    
    const items = (
        <div className={classes.NavigationItems}>
            {localStorage.getItem('token') ? (
                <NavigationItem link="/" exact>
                    <span className={classes.navText} onClick={() => {localStorage.removeItem('token')}}>Logout</span>
                    <InputIcon className={classes.navigationItemImages} onClick={() => {localStorage.removeItem('token')}}/>
                </NavigationItem>
                ) 
                : 
                <NavigationItem link="/login" exact>
                    <span className={classes.navText}>Login</span>
                    <InputIcon className={classes.navigationItemImages}/>
                </NavigationItem>
        }
        </div>
    );

    return (
        <div>
            {items}
        </div>
    );
};

export default navigationItems;
import React, {Component} from 'react';
import classes from './home.css';
import CompanyDescription from '../companyDescription/companyDescription';


class Home extends Component {

    render () {
        return (
            <div id="home" className={classes.home}>
                <div id="description">
                    <CompanyDescription />
                </div>
            </div>
        );
    }
};

export default Home ;
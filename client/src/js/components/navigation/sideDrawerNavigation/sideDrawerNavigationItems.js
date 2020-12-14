import React from 'react';
import Tile from '../../ui/tile/tile';
import classes from './sideDrawerNavigationItems.css';

const sideBarNavigationItems = ( props ) => (
    <div id="tiles-container" className={classes.tilesContainer}>
        <span className={classes.title}>To be filled</span>
        <Tile title="1"/>
        <Tile title="2"/>
        <Tile title="3"/>
        <Tile title="4"/>
        <Tile title="5"/>
    </div>
);

export default sideBarNavigationItems ;
import React from 'react';
import classes from './tile.css'

const Tile = (props) => (
    <div className={classes.tile}>
       {props.title}
    </div>
);

export default Tile ;
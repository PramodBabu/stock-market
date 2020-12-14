import React from 'react';
import classes from './card.css'
import ImageContainer from '../imageContainer/imageContainer';
const Card = (props) => (
    <div className={classes.card}>
        <h3 className={classes.cardTitle}>Iphone</h3>
        <ImageContainer src={props.imgSource} height="250px" width ="200px" />
    </div>
);


export default Card ;
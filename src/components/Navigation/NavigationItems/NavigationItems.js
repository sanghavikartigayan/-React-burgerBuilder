import React from 'react';
import NavigationItem from '../NavigationItems/NavigationItem/NavigationItem';
import classes from './NavigationItems.css';

const navigationItems = (props) => (
    <ul className={classes.NavigationItems}>
        <NavigationItem link="/" active>Burger Builder</NavigationItem>
        <NavigationItem link="/">My Orders</NavigationItem>
    </ul>
);

export default navigationItems;

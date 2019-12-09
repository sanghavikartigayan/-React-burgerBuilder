import React from 'react';
import NavigationItem from '../NavigationItems/NavigationItem/NavigationItem';
import classes from './NavigationItems.css';

const navigationItems = (props) => (
    <ul className={classes.NavigationItems}>
        <NavigationItem link="/" >Burger Builder</NavigationItem>
        <NavigationItem link="/orders">My Orders</NavigationItem>
        <NavigationItem link="/auth">Authentication</NavigationItem>
    </ul>
);

export default navigationItems;

import React from 'react';
import classes from './Burger.css';
import BurgerIngredients from './BurgerIngredients/BurgerIngredients';

const burger = (props) => {
    // iterate over ingredients object, get the keys and then map it to return another array of key values,
    // and again map it to return burger ingredient component based on the values.
    // finally return a flattened array of array elements.
    let transformedIngredients = Object.keys(props.ingredients).map(igKeys => {
        return [...Array(props.ingredients[igKeys])].map((_, i) => {
            return <BurgerIngredients key={igKeys + i} type={igKeys} />;
        });
    }).reduce((arr, el) => { return arr.concat(el) }, []);

    if (transformedIngredients.length === 0) {
        transformedIngredients = <p>Please start adding ingredients</p>;
    }

    return (
        <div className={classes.Burger}>
            <BurgerIngredients type="bread-top"></BurgerIngredients>
            {transformedIngredients}
            <BurgerIngredients type="bread-bottom"></BurgerIngredients>
        </div>
    );
};

export default burger;

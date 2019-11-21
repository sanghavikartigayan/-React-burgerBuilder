import React, { Component } from 'react';
import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import axios from '../../axios-orders';

// Global object declaration for individual item price.
const INGREDIENT_PRICES = {
    salad: 0.5,
    bacon: 0.7,
    cheese: 0.4,
    meat: 1.3,
}
class BurgerBuilder extends Component {

    // Initial state of the burger ingredient
    state = {
        ingredients: null,
        totalPrice: 4,
        purchasable: false,
        purchased: false,
        loading: false,
        error: false
    }

    componentDidMount() {
        axios.get('https://react-my-burger-5fca5.firebaseio.com/ingredients.json')
            .then(response => {
                this.setState({ ingredients: response.data })
            })
            .catch(error => { this.setState({ error: true }) });
    }

    // Reusable function which will be called each time the burger item is changed - helps to track whether it is ready to purchase.
    updatePurchasableState(ingredients) {
        // Loop over each item - key and then map it to return an array with key values. 
        // Then sum the elements and check if the sum is greater than 0 to update the purchasable boolean value.
        const sum = Object.keys(ingredients).map(igKey => {
            return ingredients[igKey];
        }).reduce((sum, el) => { return sum + el }, 0);
        this.setState({ purchasable: sum > 0 });
    }
    addIngredientHandler = (type) => {
        // First get the old count of each item in ingredients.
        // Then update the count by 1, also change the totalprice summing with each item price.
        // Upadte the state with price, purchasable and ingredients.
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount + 1;
        const updatedIngredient = {
            ...this.state.ingredients
        };
        updatedIngredient[type] = updatedCount;
        const priceAddition = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAddition;
        this.setState({ totalPrice: newPrice, ingredients: updatedIngredient });
        this.updatePurchasableState(updatedIngredient);
    }

    removeIngredientHandler = (type) => {
        // First get the old count of each item in ingredients.
        // Then substract the count by 1, also change the totalprice reducing with each item price.
        // Upadte the state with price, purchasable and ingredients.

        const oldCount = this.state.ingredients[type];
        // If the old count itself is less than or equal to 0, then simply return.
        if (oldCount <= 0) {
            return;
        }
        const updatedCount = oldCount - 1;
        const updatedIngredient = {
            ...this.state.ingredients
        };
        updatedIngredient[type] = updatedCount;
        const priceAddition = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice - priceAddition;
        this.setState({ totalPrice: newPrice, ingredients: updatedIngredient });
        this.updatePurchasableState(updatedIngredient);
    }

    purchasedHandler = () => {
        this.setState({ purchased: true });
    }

    purchaseCancelledHandler = () => {
        this.setState({ purchased: false });
    }

    purchaseContinueHandler = () => {
        this.setState({ loading: true });

        const order = {
            ingredients: this.state.ingredients,
            price: this.state.totalPrice,
            customer: {
                name: 'Sanghavi Kartigayan',
                address: {
                    street: '45 Plowshare Crescent',
                    postalCode: 'M9V4Y1',
                    country: 'Canada'
                },
                email: 'sanghavikartigayan@gmail.com'
            },
            deliveryMethod: 'fastest'
        }

        axios.post('/orders.json', order)
            .then(response => this.setState({ loading: false, purchased: false }))
            .catch(err => this.setState({ loading: false, purchased: false }));
    }

    render() {
        const disabledInfo = {
            ...this.state.ingredients
        };

        // Setting boolean values to each ingredient item based on the count value.
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }

        let orderSummary = null;
        let burger = this.state.error ? <p>Ingredients can't be loaded!</p> : <Spinner />;
        if (this.state.ingredients) {
            burger = (
                <Aux>
                    <Burger ingredients={this.state.ingredients} />
                    <BuildControls
                        ingredientAdded={this.addIngredientHandler}
                        ingredientRemoved={this.removeIngredientHandler}
                        disabled={disabledInfo}
                        totalPrice={this.state.totalPrice}
                        purchasable={this.state.purchasable}
                        ordered={this.purchasedHandler} />
                </Aux>
            );

            orderSummary = <OrderSummary
                ingredients={this.state.ingredients}
                price={this.state.totalPrice}
                purchaseCancelled={this.purchaseCancelledHandler}
                purchaseContinued={this.purchaseContinueHandler}>
            </OrderSummary>;
        }

        if (this.state.loading) {
            orderSummary = <Spinner />;
        }

        return (
            <Aux>
                <Modal show={this.state.purchased} modalClosed={this.purchaseCancelledHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
        )
    }
}

export default withErrorHandler(BurgerBuilder, axios);

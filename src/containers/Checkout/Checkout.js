import React, { Component } from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';
import { Route } from 'react-router-dom';

class Checkout extends Component {
    state = {
        ingredients: {
            cheese: 1,
            bacon: 1,
            meat: 1,
            salad: 1
        }
    }

    // Pssing ingredients data from burger builder component through url.
    componentDidMount() {
        // creating javascript object urlserachparams that gets the data from url.
        let query = new URLSearchParams(this.props.location.search);
        const ingredients = {};

        // looping over the query object entries that we got and constructiong the ingredients object which can be set late to the state.
        for (let param of query.entries()) {
            ingredients[param[0]] = +param[1];
        }
        this.setState({ ingredients: ingredients });
    }

    checkoutCancelledHandler = () => {
        this.props.history.goBack();
    }

    checkoutContinuedHandler = () => {
        this.props.history.replace('/checkout/contact-data');
    }

    render() {
        return (
            <div>
                <CheckoutSummary
                    ingredients={this.state.ingredients}
                    checkoutCancelled={this.checkoutCancelledHandler}
                    checkoutContinued={this.checkoutContinuedHandler} />
                <Route path={this.props.match.path + '/contact-data'} component={ContactData} />
            </div>
        );
    }

}


export default Checkout;

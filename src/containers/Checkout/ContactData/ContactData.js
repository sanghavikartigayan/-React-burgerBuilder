import React, { Component } from 'react';
import classes from './ContactData.css';
import Button from '../../../components/UI/Button/Button';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';

class ContactData extends Component {
    state = {
        name: '',
        email: '',
        address: {
            street: '',
            postalCode: ''
        },
        loading: false
    }

    finalOrderHandled = (event) => {
        event.preventDefault();

        this.setState({ loading: true });

        const order = {
            ingredients: this.props.ingredients,
            price: this.props.totalPrice,
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
            .then(response => {
                this.setState({ loading: false });
                this.props.history.push('/')
            })
            .catch(err => this.setState({ loading: false }));

    }

    render() {

        let form = (<form>
            <input className={classes.Input} type="text" name="name" placeholder="Your Name" />
            <input className={classes.Input} type="text" name="email" placeholder="Your Mail" />
            <input className={classes.Input} type="text" name="street" placeholder="Street Name" />
            <input className={classes.Input} type="text" name="potalCode" placeholder="Postal Code" />
            <Button btnType="Success" clicked={this.finalOrderHandled}> Order Now</Button>
        </form>);

        if (this.state.loading) {
            form = <Spinner />;
        }

        return (
            <div className={classes.ContactData}>
                <h4><b>Enter your Contact Information</b></h4>
                {form}
            </div>
        );
    }
}

export default ContactData;

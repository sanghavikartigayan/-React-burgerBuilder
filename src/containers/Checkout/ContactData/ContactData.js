import React, { Component } from 'react';
import classes from './ContactData.css';
import Button from '../../../components/UI/Button/Button';

class ContactData extends Component {
    state = {
        name: '',
        email: '',
        address: {
            street: '',
            postalCode: ''
        }
    }

    render() {
        return (
            <div className={classes.ContactData}>
                <h4><b>Enter your Contact Information</b></h4>
                <form>
                    <input className={classes.Input} type="text" name="name" placeholder="Your Name" />
                    <input className={classes.Input} type="text" name="email" placeholder="Your Mail" />
                    <input className={classes.Input} type="text" name="street" placeholder="Street Name" />
                    <input className={classes.Input} type="text" name="potalCode" placeholder="Postal Code" />
                    <Button btnType="Success"> Order Now</Button>
                </form>
            </div>
        );
    }
}

export default ContactData;

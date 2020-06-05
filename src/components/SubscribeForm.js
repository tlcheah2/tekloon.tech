import React from "react";
import styles from './SubscribeForm.module.css'
import addToMailchimp from 'gatsby-plugin-mailchimp'
import { FaCheckCircle } from 'react-icons/fa';

export default class SubscribeForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            firstName: '',
            subscribed: false,
        }
    }
  
    // Note that you need to send an email & optionally, listFields
    // these values can be pulled from React state, form fields,
    // or wherever.  (Personally, I recommend storing in state).
  
    // 1. via `.then`
    _handleSubmit = e => {
      e.preventDefault();
      const { email, firstName } = this.state;
      addToMailchimp(email, {
        FNAME: firstName
      }).then((data) => {
            console.log('data', data);
            this.setState({ subscribed: true });
        });
    }

    onEmailChange(event) {
        this.setState({
            email: event.target.value,
        })
    }

    onFirstNameChange(event) {
        this.setState({
            firstName: event.target.value,
        })
    }

    render () {
        if (this.state.subscribed) {
            return (
                <div className={`${styles.formContainer} ${styles.formSuccessSubscribe}`}>
                    <FaCheckCircle className={styles.icSuccess} />
                    <p className={styles.successSubscribed}>You have successfully subscribed.</p>
                </div>
            )
        }
        return (
            <form className={`${styles.formContainer} ${styles.formSubscribe}`}
                onSubmit={this._handleSubmit.bind(this)}>
                <h4 className={styles.subscribeTitle}>Subscribe to Newsletter to Receive Updates via Email</h4>
                <input type="email" required={true} placeholder="Email Address" value={this.state.email}  onChange={this.onEmailChange.bind(this)}></input>
                <input type="text" placeholder="First Name" value={this.state.firstName} onChange={this.onFirstNameChange.bind(this)}></input>
                <button type="submit" className={styles.btnSubscribe}>Subscribe</button>
            </form>
        )
    }

}
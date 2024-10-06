/*************************************************************************
 * 
 * KLEAREXPRESS CONFIDENTIAL
 * __________________
 * 
 *  Copyright (c) 2018 - 2018 KlearExpress Corporation.
 *  All Rights Reserved.
 * 
 * NOTICE:  All information contained herein is, and remains
 * the property of KlearExpress Corporation and its suppliers,
 * if any.  The intellectual and technical concepts contained
 * herein are proprietary to KlearExpress Corporation
 * and its suppliers and may be covered by U.S. and Foreign Patents,
 * patents in process, and are protected by trade secret or copyright law.
 * Dissemination of this information or reproduction of this material
 * is strictly forbidden unless prior written permission is obtained
 * from KlearExpress Corporation.
 */


 import React, { Component } from 'react';
 import './css/login.css';
 import { Button, Segment, Form, Input, Header, Checkbox, Icon } from 'semantic-ui-react';
 import {forgotPassword} from "../../components/container/api/index";
import {Link} from 'react-router-dom'
import  Login  from './indexDrayage';
 
 
 class ForgotPassword extends Component {
   constructor() {
     super();
     this.state = {
         checkEmail: false
     }
   }
 
   handleChange = (e, { name, value }) => this.setState({ [name]: value }, console.log(this.state))
 
   handleSubmit = (evt) => {
     evt.preventDefault();
     const { email } = this.state
    forgotPassword(
       this.state.email
     ).then(response => {
       return response.json()
     }).then(responseData => {
       if (responseData.eventMessage.header.code === 301) {
         document.getElementById('loginError').innerHTML = "<br /><center> Email is not registered. </center>"
         this.setState({ error: true })
       } else if (responseData.eventMessage.header.code === 400) {
           document.getElementById('loginError').innerHTML = "<br /><center> You have not accepted our Terms of Service.</center>"
           this.setState({ error: true })
       } else if (responseData.eventMessage.header.code === 200) {
           this.setState ({ checkEmail: true })
       }
     }).catch(err => console.log('ERROR:', err))
   }

 
   render() {
 
     if (this.state.toNextPage === true) {
       document.location = window._env_.REACT_APP_LOGIN_URL_CUSTOMER;
     } 
     let setImage = this.props.type === "DRAYAGE_PARTNER_USER" ? "images/Login_page.png" : "";
     
     
     // else if (this.state.toNextPage === true && window.location.href === 'http://localhost:3000/') {
     //   document.location = 'https://customer-dev.klearexpress.com';
     // } else if (this.state.toNextPage === true && window.location.href === 'https://cob-staging.klearexpress.com/') {
     //   document.location = 'https://customer-staging.klearexpress.com';
     // } else if (this.state.toNextPage === true && window.location.href === 'https://cob.klearexpress.com/') {
     //   document.location = 'https://customer.klearexpress.com';
     // }
 
     const { email } = this.state
     return (
       // <div className="left-div">
      <div className="mainContainer">
        <div className="flex-container">
          <div className="top-content">
            <Segment className="login-container" >

              {this.state.checkEmail === true ?
                <center>
                  <Icon className='mailSent' name='mail outline' />
                  <p>Please check your email and follow the instructions to reset your password.</p>
                </center>
              :

                <Form id='forgot-password' onSubmit={this.handleSubmit}>
                  <p className="login-header">Forgot Password</p>
                  <br />
                  <Form.Field>
                    <label>Please enter your email that you used to signup with us.</label>
                    <Input placeholder='Your email address'
                      fluid
                      name="email"
                      type="email"
                      value={email}
                      className="login-input"
                      onChange={this.handleChange}
                    />
                  </Form.Field>
                  <br />

                  {/* <Link to='#'> */}
                    <Button
                      onClick={this.handleSubmit}
                      type='submit'
                      className="loginButton"
                      color="twitter"
                      size='small'
                      disabled={!this.state.email}
                    >SUBMIT</Button>
                    <div id='loginError'></div>
                  {/* </Link> */}
                  <br />
                </Form>
                }
                  <br />
                  <br />
                  <br />

                  <center>
                    {/* <Link to='#' className="forgotLogin" onClick={this.togglePopup.bind(this)}>Forgot Username / Password?</Link>
                    <br /> <br /> */}
                    <Link to="/">Back to login</Link>
                    
                  </center>
            </Segment>
            <div className="rs-container">
                <div>
                    <div className="rs-hero">
                      <img src={setImage} className="ui image rs-bg" />
                    </div>
                </div>
              </div>
          </div>
        </div>
      </div>
       // </div>
     );
   }
 }
 
 export default ForgotPassword;
 
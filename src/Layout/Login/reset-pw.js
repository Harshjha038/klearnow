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
import {Link} from 'react-router-dom'
import { Button, Segment, Form, Input, Header, Checkbox } from 'semantic-ui-react';
import {resetPassword} from '../../components/container/api/index';

class ResetPassword extends Component {
  constructor() {
    super();
    this.state = {
        submitted: false,
        match: false
    }
  }

  componentWillMount() {
		const pathArray = window.location.pathname.split('/');
		const tempToken = pathArray[2];
		// alert("The user's tempory token is" + tempToken);
		// alert(typeof(tempToken));
		this.setState({tempToken: tempToken});
  }

  passwordError = () => {
    this.state.match === true ? 
      document.getElementById('pwError').innerHTML = "" :
      document.getElementById('pwError').innerHTML = "<br /><center> Passwords do not match. </center>"
  }
  
  passwordMatch = () => {
    this.state.newPassword === this.state.repeatPassword ? 
      this.setState({ match: true }, this.passwordError)
        : 
      this.setState({ match: false }, this.passwordError)
  }

  handleChange = (e, { name, value }) => {
    this.setState({ [name]: value }, this.passwordMatch)
  }

  handleSubmit = (evt) => {
    evt.preventDefault();
    const { newPassword, repeatPassword } = this.state
    if(newPassword.length<8){
      document.getElementById('pwError').innerHTML = "<br /><center> The minimum length for a password is 8 characters. </center>"
    }else{
      this.setState ({ submitted: true })
      resetPassword(
        this.state.tempToken,
        this.state.newPassword
      )
    }
  }

  render() {
      
    const { newPassword, repeatPassword } = this.state
    return (
      // <div className="left-div">
      <div className="mainContainer">
        <div className="flex-container">
          <div className="top-content">
      <Segment className="login-container" >

      {this.state.submitted === true ?
      <p><center>Submitted!</center></p>
      :

        <Form id='forgot-password' onSubmit={this.handleSubmit}>
          <p className='login-header'> Reset Password </p>
          <Form.Field>
            <label>ENTER NEW PASSWORD</label>
            <Input placeholder='New password'
              fluid
              name="newPassword"
              type="password"
              value={newPassword}
              className="login-input"
              onChange={this.handleChange}
            />
            <br />
            <label>CONFIRM NEW PASSWORD</label>
            <Input placeholder='Re-enter new password'
              fluid
              name="repeatPassword"
              type="password"
              value={repeatPassword}
              className="login-input"
              onChange={this.handleChange}
            />
          </Form.Field>
          <div id ='pwError'></div>
          <br />

          {/* <Link to='#'> */}
            <Button
              onClick={this.handleSubmit}
              type='submit'
              className="loginButton"
              color="twitter"
              size='small'
              disabled={this.state.match === false}
            >SUBMIT</Button>
          {/* </Link> */}
        </Form>

        }

          <br />

          <center>
            {/* <Link to='#' className="forgotLogin" onClick={this.togglePopup.bind(this)}>Forgot Username / Password?</Link>
            <br /> <br /> */}
            <Link to='/' className="forgotLogin" > Back to Login</Link>
          </center>
 
      </Segment>
      </div>
      </div>
      </div>
      // </div>
    );
  }
}

export default ResetPassword;

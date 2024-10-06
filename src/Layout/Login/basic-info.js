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

import React, { Component } from "react";
import "./css/basic-info.css";
import { Button, Segment } from "semantic-ui-react";
import {updateProfile} from "../../components/container/api/index";
import { Input, FreeForm, FormRow, Dropdown } from "kx-common-components";
import axios from "axios";
import {Navigate} from 'react-router-dom'
// import Upload from "../../media/upload.svg";
import { get } from "lodash";

class BasicInfo extends Component {
  constructor() {
    super();
    this.state = {
      toNextPage: false,
      progress: 11.1,
      email: "",
      password: "",
      confirmPassword: "",
      additionalEmail: "",
      phoneType: "",
      phoneNumber: "",
      error: false,
    };
  }

  passwordError = () => {
    this.setState({ error: true }, () => {
      document.getElementById("pwError").innerHTML = "<br /><center> Passwords do not match. </center>";
    });
  };
  passwordLengthError=()=>{
    this.setState({ error: true }, () => {
      document.getElementById("pwError").innerHTML = "<br /><center> The minimum length for a password is 8 characters. </center>";
    });
  }

  passwordMatch = () => {
    const { password, confirmPassword } = this.state;
    return password === confirmPassword;
  };
  

  formatPhone = (str) => {
    return str.replace(/\D/g, "");
  };

  handleUpdate(key, e) {
    this.setState({ [key]: e, error: false });
  }

  handleSubmit = () => {
    const { sessionData } = this.props;
    const { password, image, phoneNumber, match } = this.state;
    if(password.length>=8){
      if (this.passwordMatch()) {
        updateProfile(sessionData.tempToken, sessionData.companyName, sessionData.email, sessionData.contactName, password, this.formatPhone(phoneNumber))
          .then((response) => {
            return response.json();
          })
          .then((responseData) => {
            let token = responseData.eventMessage.user.kxCustomerToken;
            document.cookie = "kxCustomerToken=" + token + ";domain=klearexpress.com";
          })
          .then(this.setState({ toNextPage: true }))
          .catch((err) => console.log("ERROR:", err));
      } else {
        this.passwordError();
      }
    }else{
      this.passwordLengthError();
    }
    
  };

  render() {
    const { sessionData, storeProgressData } = this.props;
    const { fullname, email, password, additionalEmail, phoneNumber, confirmPassword, toNextPage, error } = this.state;
    console.log("state: ", this.state);
    console.log("props: ", this.props);
    if (toNextPage === true) {
      storeProgressData("basicInfo", "piece progress-green");
      return <Navigate replace to="/finish" />;
    }

    return (
      <div className="mainContainer">
        <div className="flex-container">
          <div className="top-content">
            <Segment padded="very" className="basic-info-segment" raised>
              <div className="login-header">Personal Information</div>
              <div className="basic-info-content">
                <FreeForm>
                  <FormRow>
                    <Input value={sessionData.companyName} onChange={(e) => this.handleUpdate("companyName", e)} label={"COMPANY NAME"} singleElement topElement />
                  </FormRow>
                  <FormRow>
                    <Input value={sessionData.contactName} onChange={(e) => this.handleUpdate("fullName", e)} label={"FULL NAME"} singleElement />
                  </FormRow>
                  <FormRow>
                    <Input value={sessionData.email} onChange={(e) => this.handleUpdate("email", e)} label={"EMAIL"} singleElement />
                  </FormRow>
                  <FormRow>
                    <Input onChange={(e) => this.handleUpdate("phoneNumber", e)} label={"PHONE NUMBER"} singleElement bottomElement />
                  </FormRow>
                </FreeForm>
                <br />
                <br />
                <FreeForm>
                  <FormRow>
                    <Input onChange={(e) => this.handleUpdate("password", e)} label={"PASSWORD"} singleElement topElement password />
                  </FormRow>
                  <FormRow>
                    <Input onChange={(e) => this.handleUpdate("confirmPassword", e)} label={"CONFIRM PASSWORD"} singleElement bottomElement password />
                  </FormRow>
                </FreeForm>
                {error && <span id={"pwError"}></span>}
                <br />
                <br />
                <div className={"button-row"}>
                  <Button className="hollow-button cancel-button">CANCEL</Button>
                  <Button className="solid-button" onClick={() => this.handleSubmit()}>
                    NEXT
                  </Button>
                </div>
              </div>
            </Segment>
          </div>
        </div>
      </div>
    );
  }
}

export default BasicInfo;

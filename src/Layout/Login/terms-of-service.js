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
import "./css/terms-of-service.css";
import { Link, Navigate } from 'react-router-dom'
import { Button, Segment, Form, Input, Header, Checkbox, Dimmer, Loader } from "semantic-ui-react";
// import Images from "../../media/tos/tos";
import { termsOfService } from "../../components/container/api/index";
import moment from "moment";
import TOS from "./tos/index";

class TermsOfService extends Component {
  constructor() {
    super();
    this.state = {
      accept: false,
      toNextPage: false,
      tempToken: "",
      date: moment().format("MMMM Do YYYY"),
      tokenStatus: null,
      isLoading: false,
    };
  }

  componentWillMount() {
    const pathArray = window.location.pathname.split("/");
    const tempToken = pathArray[4];
    // console.log("The user's tempory token is", tempToken);
    console.log(typeof tempToken);
    this.setState({ tempToken: tempToken }, () => this.validateTempToken());
  }

  handleChange = (e, { name, value }) => this.setState({ [name]: value }, () => console.log(this.state));

  toggle = () => this.setState({ accept: !this.state.accept }, console.log(this.state.accept));

  validateTempToken = () => {
    this.setState({ isLoading: true })
    termsOfService(this.state.tempToken)
      .then((response) => {
        if(response.status === 400){
          return this.setState({ tokenStatus: false });
        }
        return response.json();
      })
      .then((responseData) => {
        this.setState({ isLoading: false });
        if (responseData.code === 400) {
          this.setState({ tokenStatus: false });
        } else {
          this.setState({ tokenStatus: true });
          this.props.storeSessionData(responseData.eventMessage.userBasicInfo.companyName, responseData.eventMessage.userBasicInfo.email, responseData.eventMessage.userBasicInfo.contactName, this.state.tempToken);
        }
      })
      .catch((err) => {
        console.log("ERROR:", err);
      });
  }

  onSubmit = () => {
    // const { accept } = this.state
    // this.setState({ accept: true },
    // 	console.log(this.state))
    this.setState(() => ({
      toNextPage: true
    }))

  };

  render() {
    if (this.state.toNextPage === true) {
      return <Navigate replace to="/basicinfo" />;
    }

    const { isLoading } = this.state;

    return (
      <div className="mainContainer">
        <div className="flex-container">
          <div className="top-content">
            <Segment padded="very" className="login-form tos-form">
              {
                this.state.tokenStatus === false ?
                  <div>
                    <center>
                      <Header className="tos-title" as="h2">
                        Invitation link expired. Please contact Klearnow support
                      </Header>
                    </center>
                  </div> :
                  <Form onSubmit={this.handleSubmit}>
                    <center>
                      <Header className="tos-title" as="h1">
                        KLEARNOW Corp. Terms and conditions of service.
                      </Header>
                      <Header className="tos-title" as="h5">
                        UNITED STATES AND CANADA
                      </Header>
                      <Header className="tos-title" as="h5">
                        As of October 5th, 2018
                      </Header>
                    </center>
                    <Form.Field>
                      <div className="tosContainer">
                        <TOS />
                      </div>
                    </Form.Field>
                    <div>
                      <Checkbox className="tosAccept" label="I ACCEPT THE TERMS AND CONDITIONS." value="accept" name="checkbox-accept-tos" checked={this.state.accept} onClick={this.toggle} />
                      <br /><br />
                      <center>

                        {/* <Link to='/basicinfo'> */}
                        <Button disabled={this.state.accept === false} onClick={this.onSubmit.bind(this)} type="submit" className="tosSubmit">
                          GET STARTED
                        </Button>
                      </center>
                    </div>
                    {/* </Link> */}
                  </Form>}
            </Segment>
            {
              isLoading &&
              <Dimmer active inverted inline="centered">
                <Loader inverted content='Loading' />
              </Dimmer>
            }
          </div>
          <div className="footer-wrapper" style={{ "color": "white", "marginTop": "25px" }}>
            <p>
              <span className="companyName">
                <strong>KlearNow Corp.</strong>
              </span>
              &nbsp; &nbsp;| &nbsp; &nbsp;
              <Link to="/view-terms" style={{ "color": "white", "margin-top": "25px" }}>Terms</Link>
              &nbsp; &nbsp; | &nbsp; &nbsp;
              <Link to="/privacy" style={{ "color": "white", "margin-top": "25px" }}>Privacy</Link>
              &nbsp; &nbsp;
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default TermsOfService;

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
import "./css/account-info-1.css";
import { Button, Segment, Form, Input, Header, Checkbox, Grid, Progress } from "semantic-ui-react";

class Finish extends Component {
  constructor() {
    super();
    this.state = {
      navigate: false
    };
  }

  componentDidMount() {
    setTimeout(() => this.setState({ navigate: true}), 3000)
  }

  render() {
    if (this.state.navigate === true) {
      window.location.pathname = "/";
    }

    return (
      <div className="mainContainer">
        <div className="flex-container">
          <div className="top-content">
            <Segment padded="very" className="account-info-1-segment">
              <center>
                <br />

                <Header as="h1">Thanks!</Header>

                <p>You will be rerouted to the Login page shortly.</p>

                <p>
                  Click <a href="/">here</a> if a problem occurs.
                </p>
              </center>
            </Segment>
          </div>
        </div>
      </div>
    );
  }
}

export default Finish;

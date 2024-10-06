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
import React from 'react';
import {BrowserRouter, Route, Routes, Navigate} from 'react-router-dom'

import ForgotPassword from './forgot-pw';
import LoginDrayage from './indexDrayage';
import ResetPassword from './reset-pw';
import TermsOfService from './terms-of-service';
import BasicInfo from './basic-info';
import Finish from './finish';
import ViewPrivacy from './view-privacy';
import ViewTerms from './view-terms';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sessionData: {
        companyName: "",
        email: "",
        contactName: "",
        tempToken: "",
      },
         
      progressData: {
        basicInfo: "piece progress-gray",
        basicInfoCompany: "piece progress-gray",
        ai1: "piece progress-gray",
        ai2: "piece progress-gray",
        ai3: "piece progress-gray",
        ai4: "piece progress-gray",
        poa: "piece progress-gray",
        payment: "piece progress-gray",
        addTeam: "piece progress-gray"
      }, 
      

      
    };
    this.storeSessionData = this.storeSessionData.bind(this);
    this.storeProgressData = this.storeProgressData.bind(this);
  }

  
  storeSessionData = (companyName, email, contactName, tempToken) => {
    console.log("Previous Parent State: " + JSON.stringify(this.state), "color: orange");
    this.setState(
      {
        sessionData: {
          companyName: companyName,
          email: email,
          contactName: contactName,
          tempToken: tempToken
        }
      },
      // () => console.log("Updated Parent State: ", this.state)
    );
  };

  storeProgressData = (name, status) => {
    console.log("Previous Parent State: " + JSON.stringify(this.state), "color: blue");
    this.setState(
      {
        progressData: { ...this.state.progressData, [name]: status }
      },
      // () => console.log("Updated Parent State: ", this.state)
    );
  };

  // handleNavigation = (param) => {
  //   if(param==='forgot-password'){
  //     return Navigate ("/forgot-password")
  //   }
  //   else if(param==='basicinfo'){
  //     return Navigate("/basicinfo") 
  //   }
  //   else if(param==='finish'){
  //     return Navigate("/finish") 
  //   }
  //   else if(param==='privacy'){
  //     return Navigate("/privacy") 
  //   }
  //   else if(param === 'view-terms'){
  //     return Navigate("/view-terms") 
  //   }
  //   else if(param === 'back-to-login'){
  //     return Navigate("/") 
  //   }
  //   else{
  //     return Navigate("/") 
  //   }
  // }
  
  render() {
    return(       
      <BrowserRouter>
        <Routes>
          <Route exact path='/email-confirmation/user/email/:tmp/confirm'  element={<TermsOfService handleNavigation= {this.handleNavigation} sessionData={this.state.sessionData} storeProgressData={this.storeProgressData} storeSessionData={this.storeSessionData} progressData={this.state.progressData} />}/>
          <Route exact path='/basicinfo'  element={<BasicInfo handleNavigation= {this.handleNavigation} sessionData={this.state.sessionData} storeSessionData={this.storeSessionData} storeProgressData={this.storeProgressData} progressData={this.state.progressData} />} />
          <Route exact path='/' element={<LoginDrayage handleNavigation= {this.handleNavigation} type={this.props.type} />} />
          <Route exact path='/forgot-password' element={<ForgotPassword handleNavigation= {this.handleNavigation} type={this.props.type} />} />
          <Route exact path='/reset-password' element={<ResetPassword/>} />
          <Route exact path='/reset-password/*' element={<ResetPassword/>} />
          <Route exact path='/finish' element={<Finish/>} />
          <Route exact path='/view-terms' element={<ViewTerms/>} />
          <Route exact path='/privacy' element={<ViewPrivacy/>} />
        </Routes>
      </BrowserRouter>
    )
  }
}

export default Login;
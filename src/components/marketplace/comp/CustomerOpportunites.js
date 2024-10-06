import React, { Component } from "react";

import { OpportunityClosedCommon } from "KN-Drayage-UI";
import OpportunityOpened from "./OpportunityOpened";
// import "./partner-styles.scss"

export default class CustomerOpportunites extends Component {
  constructor(props) {
    super(props);

    console.log("CustomerOpportunites : customerData", this.props);

    let isOpenMap = new Map();
    if (this.props.customerOpportunity) {
      for (let oppor of this.props.customerOpportunity.opportunityList) {
        isOpenMap.set(oppor.opportunityId, false);
      }
    }

    this.state = {
      isOpenMap: isOpenMap,
      showModal: true,
      partnerId: "123de3",
    };
  }

  onButtonClick = (isEdit, id) => {
    console.log("onButtonClick : ", id);
    let isOpenMap = this.state.isOpenMap;
    isOpenMap.set(id, !isOpenMap.get(id));

    this.props.getOpportunityDetailsApi(id);
    this.setState({ isOpenMap: isOpenMap });
  };

  // getAdditionalCharges=(partnerId)=>{
  //     getDrayageAdditionalCharges(partnerId).then(res=>{
  //         console.log(" getDrayageAdditionalCharges success ",res)
  //         let additionalCharges = get(res.data,"eventMessage.chargeList")

  //         this.setState({additionalCharges:additionalCharges})

  //     }).catch(err=>{
  //         console.log("getDrayageAdditionalCharges",err)
  //     })

  // }
  // componentDidMount() {
  //     let additionalCharges=  this.getAdditionalCharges(this.state.partnerId)
  // }

  render() {
    console.log("CustomerOpportunites customer:", this.props); //object
    console.log("additionalCharges : ", this.state.additionalCharges);
    let customerEmail = this.props.customerOpportunity.customerId;
    let customerName = customerEmail.substring(
      0,
      customerEmail.lastIndexOf("@")
    );
    customerName = customerName.toUpperCase();
    let customer = customerEmail.substring(customerEmail.lastIndexOf("@") + 1);
    console.log("customerName", customerName);
    console.log("customer", customer);

    //         var email = "john.doe@example.com";
    // var name   = email.substring(0, email.lastIndexOf("@"));
    // var domain = email.substring(email.lastIndexOf("@") +1);

    // console.log( name );   // john.doe
    // console.log( domain ); // example.com

    return (
      <div>
        <section className="cust-sec">
          <div className="cust-text">CUSTOMER:</div>
          <div>{customerName}</div>
        </section>

        {this.props.customerOpportunity.opportunityList.map((opportunity) => {
          console.log(
            "CustomerOpportunites :opportunity",
            opportunity,
            this.state.isOpen
          );
          return !this.state.isOpenMap.get(opportunity.opportunityId) ? (
            <OpportunityClosedCommon
              isOpen={this.state.isOpen}
              opportunity={opportunity}
              onButtonClick={(isEdit) => {
                this.onButtonClick(isEdit, opportunity.opportunityId);
              }}
            />
          ) : (
            <div>
              <OpportunityClosedCommon
                isOpen={this.state.isOpen}
                opportunity={opportunity}
                onButtonClick={(isEdit) => {
                  this.onButtonClick(isEdit, opportunity.opportunityId);
                }}
              />
              <OpportunityOpened
                tab={this.props.tab}
                isOpen={this.state.isOpen}
                opportunityData={this.props.opportunityData}
                opportunity={opportunity}
                onButtonClick={this.onButtonClick}
                handleOpenPortWiseModal={this.props.handleOpenPortWiseModal}
                selectedTab={this.props.selectedTab}
                additionalCharges={this.props.standardPartnerAdditionalCharges}
                partnerId={this.state.partnerId}
                setAdditionalChargesInStore={
                  this.props.setAdditionalChargesInStore
                }
                //   standardPartnerAdditionalCharges={this.props.standardPartnerAdditionalCharges}
                setLaneBidChargesInStore={this.props.setLaneBidChargesInStore}
                submitOpportunityBidData={this.props.submitOpportunityBidData}
              />
            </div>
          );
        })}
      </div>
    );
  }
}

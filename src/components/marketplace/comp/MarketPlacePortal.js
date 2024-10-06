import React from "react";
// import "./partner-styles.scss";

import BidModal from "./BidModal"
import LaneBidCard from "./LaneBidCard";
import OpportunityModal from "./OpportunityModal";


import { SELECTED_TABS,MarketplacePortalCommon, DRAYAGE_APP } from "KN-Drayage-UI";
import { OPPORTUNITY_MODAL_VIEW, getModalClassName } from '../util';
import LaneAdditionalCharges2 from "./LaneAdditionalCharges2";


// import MarketplacePortalCommon from "KN-Drayage-UI"


class MarketPlacePortal extends React.Component {
  constructor(props) {
    super(props);
    console.log("MarketPlacePortal :: constructor")
    this.state = {
      view : OPPORTUNITY_MODAL_VIEW.None,
      selectedTab: SELECTED_TABS.NEW,
      customerData: new Map(),
      opportunityData: new Map(),

      showLaneBidCard : false,
      
      selectedSourcePortCode : "",
      selectedSourcePortName:"",
      selectedDestinationName : "",
      selectedLaneId : "",
      selectedDestinationLaneData :"",
      


      partyName: "MID ATLANTIC AND THE SOUTH",
      expiryDate: "SEP 21,2021",
      customer: "LIFE STYLE INC.",
      header: {
        portName: "NEW YORK PORT,NY",
        numberofDestinations: "6",
        suggestedBid: "SUGGESTED BID",
        totalPorts: 2,
        totalContainers: 2000,
      },
      data: [
        {
          destination: "GLASSBORO,NJ(08928)",
          approxValue: "500",
          price: "350",
        },
        {
          destination: "WATERLOO,TX(07928)",
          approxValue: "2000",
          price: "350",
        },
        {
          destination: "WOOD RIFE,NJ(08927)",
          approxValue: "3500",
          price: "350",
        },
      ],
    };
  }

  handleOpportunityBidClicked = (isFromEdit) => {
    console.log("MarketPlacePortal :: Modal open button clicked...", isFromEdit)
    this.setState({view : OPPORTUNITY_MODAL_VIEW.BidModal, isFromEdit : isFromEdit})
  }

  handleOpportunityBidModalCanceled = () => {
    console.log("MarketPlacePortal :: Modal open button clicked...")
    this.setState({view : OPPORTUNITY_MODAL_VIEW.None})
  }


  componentDidMount() {
    console.log("MarketPlacePortal :: componentDidMount", this.props)
  }

  //array of objects

  render() {
    const { header, data, partyName, expiryDate, customerData } = this.state;
    console.log("MarketPlacePortal :: props and state", this.props, this.state);
    // console.trace("MarketPlacePortal :: props ", this.props)
    console.log("MarketPlacePortal opp :customerOpportunities", this.props.customerOpportunities instanceof Map);
    
    let customerIdList = Array.from(this.state.customerData.keys());
    console.log("customerIdList : ", customerIdList);

    let customerOpportunities = this.props.customerOpportunities
    let opportunityData = this.props.opportunityData
    //let thisOpportunityData =   this.props.opportunityData.get() 
   // console.log("opp0r data dashboard",this.props.opportunityData)

    if (this.props.tab === SELECTED_TABS.SUBMITTED) {
      // customerOpportunities = this.props.customerOpportunitiesSubmitted
      // opportunityData = this.props.opportunityDataSubmitted
    } else if (this.props.tab === SELECTED_TABS.ACTIVE){
      customerOpportunities = this.props.customerOpportunitiesActive
      // opportunityData = this.props.opportunityDataActive
    } else if (this.props.tab === SELECTED_TABS.REJECTED) {
      customerOpportunities = this.props.customerOpportunitiesRejected
      // opportunityData = this.props.opportunityDataRejected

    }

    // let thisOpportunityData = new Map()
    // if (this.props.opportunityData.has(this.props.opportunityOpenedForBid)) {
    //   thisOpportunityData = this.props.opportunityData.get(this.props.opportunityOpenedForBid)
    // }
    console.log("MarketPlacePortal : customerOpportunities ", customerOpportunities);
    
    // let grandTotalVol = thisOpportunityData.grandTotalVolume;
    // let grandTotalAmount = thisOpportunityData.grandTotalAmount
    // grandTotalAmount = grandTotalAmount > 1000000  ? parseFloat(grandTotalAmount / 1000000).toFixed(2) + "M" : grandTotalAmount;
 
    return (
      <div id="market-place-portal">
        <MarketplacePortalCommon
          {...this.props}
          portalTabs={
            [
            SELECTED_TABS.PARTNER_NEW,
            SELECTED_TABS.PARTNER_SUBMITTED,
            SELECTED_TABS.PARTNER_ACTIVE,
            SELECTED_TABS.PARTNER_REJECTED,
          ]}
          partnerId={this.props.partnerId}
          drayageApp={DRAYAGE_APP.KLEARDRAY_PARTNER}
          handleOpenBidModal={
            //Calls the BE API to fetch opportunit details
            this.props.handleOpenBidModal
          }
          handleOpportunityBidClicked={
            //Makes the bid modal visible by the setting the view
            this.handleOpportunityBidClicked
          }
          handleSetChargeForEdit={this.props.handleSetChargeForEdit}
        />

        <BidModal
          drayageApp={DRAYAGE_APP.KLEARDRAY_PARTNER}
          // **********************   Properties **************************
          // isOpen={this.props.opportunityOpenedForBid != "" && !this.state.showLaneBidCard}
          isOpen={this.state.view === OPPORTUNITY_MODAL_VIEW.BidModal}
          opportunityId={this.props.opportunityOpenedForBid} // Opportunity ID for whoch bid modal has been opened
          opp_key={this.props.opportunityOpenedForBid_opp_type} // Opportunity ID for whoch bid modal has been opened
          opportunityData={this.props.opportunityData} // Map of opportunity id to opportunity data in detailed. Key is opportunityId. 
          // opportunityPortsData={ //Detatils of port data for this opportunity identified by opportunityId. This is 
          //   thisOpportunityData.portData
          //     ? thisOpportunityData.portData
          //     : new Map()
          // }
          // grandTotalVol={grandTotalVol}
          // grandTotalAmount={grandTotalAmount}
          isFromEdit= {this.state.isFromEdit}

          standardPartnerAdditionalCharges={ //Standard additional charges for partner 
            this.props.standardPartnerAdditionalCharges
          }
          partnerId={this.props.partnerId} 

          // **********************   Methods **************************
          setAdditionalChargesInStore={
            // redux action function for setting additional charges in redux store when a set of additional charges are submitted 
            // for a given port or lane
            this.props.setAdditionalChargesInStore
          }
          setLaneBidChargesInStore={
            // redux action for setting all filled bidding charges for a given opportunity in redux store. This is called when DONE button
            // on lane bid card is clicked.
            this.props.setLaneBidChargesInStore
          }
          submitOpportunityBidData={
            // redux action function for finally submitting all bid data for a given opportunity. This is called upon hitting
            // SUBMIT button on final confirmation after filling all bidding info
            this.props.submitOpportunityBidData
          }
          handleOpportunityBidModalCanceled={
            // Local functon to capture cancelling of bid modal
            this.handleOpportunityBidModalCanceled
          }
          getOpportunityList={
            //api call 
            this.props.getOpportunityList
          }
          handleSetChargeForEdit={
            this.props.handleSetChargeForEdit
          }
        />
      </div>
    );
  }
}

export default MarketPlacePortal;

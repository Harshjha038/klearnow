/*************************************************************************
 *
 * KLEAREXPRESS CONFIDENTIAL
 * __________________
 *
 *  Copyright (c) 2018 - 2021 KlearExpress Corporation.
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

 import { connect } from "react-redux";
 import {
   getOpportunityList,
   getOpportunityDetailsApi,
   setAdditionalChargesInStore,
   getStandardPartnerAdditionalCharges,
   setLaneBidChargesInStore,
   submitOpportunityBidData,
   handleOpenBidModal,
   handleOpporunityOpenArrow,
   setCustomerLanePriceSelected,
   setPartnerIdInStore,
   handleSetChargeForEdit
//  } from "../actions/Opportunity";
 } from "KN-Drayage-UI";
 
 
  
 import MarketPlacePortal from "../components/marketplace/comp/MarketPlacePortal"
 

 const mapStateToProps = (state) => {
 
   console.trace("MarketPlacePortal :: mapStateToProps", state)
   return {
        tab: state.opportunityReducer.tab,
        partnerId : state.opportunityReducer.partnerId,
        
        /*
         * New tab data
         */
        opportunityCount : state.opportunityReducer.opportunityCount,
        customerOpportunities : state.opportunityReducer.customerOpportunities,
        containerOpportunities : state.opportunityReducer.containerOpportunities,
        laneOpportunities : state.opportunityReducer.laneOpportunities,
        opportunityData : state.opportunityReducer.opportunityData,

        /*
         * Submitted tab data
         */
        customerOpportunitiesSubmitted : state.opportunityReducer.customerOpportunitiesSubmitted, // key : customer id, value : list of opportunties
        opportunityDataSubmitted : state.opportunityReducer.opportunityDataSubmitted, 

        /*
         * Active tab data
         */
        customerOpportunitiesActive : state.opportunityReducer.customerOpportunitiesActive, // key : customer id, value : list of opportunties
        opportunityDataActive : state.opportunityReducer.opportunityDataActive, 

        /*
         * Rejected tab data
         */
        customerOpportunitiesRejected : state.opportunityReducer.customerOpportunitiesRejected, // key : customer id, value : list of opportunties
        opportunityDataRejected : state.opportunityReducer.opportunityDataRejected, 

        opportunityColumnData : state.opportunityReducer.opportunityColumnData, //Map of column data for opened opportunity
        openedOpportunities : state.opportunityReducer.openedOpportunities, //Map of which opportunity ids are opened 
        opportunityOpenedForBid : state.opportunityReducer.opportunityOpenedForBid, // Opportunity which is opened for filling bid data
        opportunityOpenedForBid_opp_type : state.opportunityReducer.opportunityOpenedForBid_opp_type, // Opportunity which is opened for filling bid data
        opportunityPortOpenedForBid : state.opportunityReducer.opportunityPortOpenedForBid , //Port code within opportunity which opened for filling bid data
        opportunityDestinationOpenedForBid : state.opportunityReducer.opportunityDestinationOpenedForBid, //Destination id wit
        standardPartnerAdditionalCharges : state.opportunityReducer.standardPartnerAdditionalCharges,
        setCustomerLanePriceSelected : state.opportunityReducer.setCustomerLanePriceSelected,
        time : state.opportunityReducer.time,
        loadingData: state.opportunityReducer.loadingData,

   };
 };
 
 const mapDispatchToProps = {
    getOpportunityList,
    getOpportunityDetailsApi,
    setAdditionalChargesInStore,
    getStandardPartnerAdditionalCharges,
    setLaneBidChargesInStore,
    submitOpportunityBidData,
    handleOpenBidModal,
    handleOpporunityOpenArrow,
    setPartnerIdInStore,
    handleSetChargeForEdit
 };
 
 export default connect(
   mapStateToProps,
   mapDispatchToProps
 )(MarketPlacePortal);
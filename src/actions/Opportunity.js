/*************************************************************************
 *
 * KlearNow CONFIDENTIAL
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

import {API_GET_OPPORTINITY_LIST, API_GET_OPPORTINITY_DETAILS,  SET_OPPORTUNITY_BID_DATA,ADDITONAL_CHARGE_DONE_CLICKED, PARTNER_STANDARD_ADDITIONAL_CHARGES,LANE_BID_DONE_CLICKED,OPPORTUNITY_UPDATE_CLICKED} from "./index"
import { getDrayag, getOpportunities, getDrayageOpportunityDetails, getDrayageAdditionalCharges, formOpportunitySubmitMessage } from "../components/marketplace/api";
import store from "../store"
import { timeoutPromise } from "../../src/util";
import { get } from "lodash";

let MAX_TIMOUTOUT = 10000;




//If called at port level,
//  source - "PORT_ADDITIONAL_CHARGE", opportunuityId, portId, charges are provided, destinationId is null
//If called at lane level,
//  source - "LANE_ADDITIONAL_CHARGE", opportunuityId, portId, destinationId, charges are provided
//
export const submitOpportunityBidData = (opportunityId, opportunityData) => {

    let msgToSend = formOpportunitySubmitMessage(opportunityId, opportunityData)
    return (dispatch, getState) => {
        msgToSend.then(res=>{
            console.log(" submitOpportunityBidData :: Success ",res)
            let success = get(res.data,"eventMessage.response")
            dispatch(setStandardPartnerAdditionalChargesInStore(success))

        }).catch(err=>{
            console.log("getDrayageAdditionalCharges",err)
        })
    }

}

export const getStandardPartnerAdditionalCharges = () => {

    return (dispatch, getState) => {
        let state = store.getState();
        let partnerId = state.partnerId
        
        getDrayageAdditionalCharges(partnerId).then(res=>{
            console.log(" getDrayageAdditionalCharges :: Success ",res)
            let additionalCharges = get(res.data,"eventMessage.chargeList")
            dispatch(setStandardPartnerAdditionalChargesInStore(additionalCharges))

        }).catch(err=>{
            console.log("getDrayageAdditionalCharges",err)
        })
    }
}

export const setAdditionalChargesInStore = (source, opportunuityId, portId, destinationId, charges) => {
    return (dispatch, getState) => {
        dispatch(setAdditionalCharges(source, opportunuityId, portId, destinationId, charges))
    }
}
//function to take the laneBid charges in the reducer
export const setLaneBidChargesInStore=(opportunuityId, portId, laneId, bidData)=>{
    console.log("setLaneBidChargesInStore : ",  opportunuityId, portId, laneId, bidData)
    return (dispatch,getState)=>{
        dispatch (setLaneBidCharges(opportunuityId, portId, laneId, bidData))
    }

}
export const getOpportunityList = (tab) => {
    return (dispatch, getState) => {
      return dispatch(getOpportunityListApi(tab));
    };
};

export const getOpportunityListApi = (tab) => {
    return async (dispatch, getState) => {
  
      
    //   let state = store.getState();

      // console.log('1111 state', state)
    //   let {tab} = state.opportunityReducer.tab;
      let drayageOpportunityRequest = getDrayageOpportunities(tab);
  
      /*
      * Fetch new and regular shipments
      */
      const [opportunityListResponse] = [await timeoutPromise(MAX_TIMOUTOUT, drayageOpportunityRequest)];

      
      
      let opportynityData = get(opportunityListResponse, "data.eventMessage", {})
      console.log("getOpportunityListApi :: ", opportynityData)
      
      dispatch(setOpportunityList(tab, opportynityData)); 
  
    };    
};

export const getOpportunityDetailsApi = (opportunityId, isAlreadyOpened) => {
    return async (dispatch, getState) => {
  
      
    let state = store.getState();

    console.log('getOpportunityDetailsApi : ', opportunityId, isAlreadyOpened)
    let { partnerId, tab } = state.opportunityReducer.partnerId;
     
    getDrayageOpportunityDetails(opportunityId).then((res) => {
        console.log("getOpportunityDetailsApi : response", res);

        let opportunityDetailData = get(res.data, "eventMessage", {});
        let opportunityPortsData = new Map();

        console.log(
          "getOpportunityDetailsData :",
          opportunityDetailData,
          typeof opportunityDetailData
        );
        let opportunityDetails = opportunityDetailData.opportunityDetails;
        console.log("opportunityDetails", opportunityDetails);


        let portListDetail = opportunityDetailData.portList; //array of obj
        console.log(portListDetail, "portListDetail");
        for (let port of portListDetail) {
          let destinationData = new Map();

          opportunityPortsData = opportunityPortsData.set(port.sourcePortCode, port);
          console.log("opportunityPortsData : ", opportunityPortsData);
          let destinations = opportunityPortsData.get(port.sourcePortCode).destinations; //as an array of obj

          let sourcePort = opportunityPortsData.get(port.sourcePortCode).sourcePort;
          console.log("sourcePort", sourcePort);

          console.log("destinations", destinations);

          for (let destination of destinations) {
            destinationData = destinationData.set(
              destination.destinationId,
              destination
            );
            console.log("destinationData", destinationData);
            let destinationIds = Array.from(destinationData.keys());
            console.log("destinationIds", destinationIds);
            let destinationAddress = destinationData.get(
              destination.destinationId
            ).destinationAddress;
            console.log("destinationAddress Opportunity.js", destinationAddress);
            let approxVolume = destinationData.get(
              destination.destinationId
            ).approxVolume;
            console.log(" approxVolume", approxVolume);
            let laneId = destinationData.get(destination.destinationId).laneId;
            console.log(" laneIde", laneId);
          }
          destinationData = port["destinations"];
        }
        console.log("opportunityPortsData :", opportunityPortsData);
        dispatch(setOpportunityDetails(opportunityId, opportunityDetails, opportunityPortsData, isAlreadyOpened)); 
      }).catch((err) => {
        console.log("getOpportunityDetailsData err", err);
      });;
      let opportynityDetailData = {}
      /*
      * Fetch new and regular shipments
      */
      // console.log("Shipment API responses  : New Shipments", newShipmentRes, " Shipments ",  shipmentDetails)
 
      
    };    
};




export const setStandardPartnerAdditionalChargesInStore = (additionalCharges)  => {
    return {
        type : PARTNER_STANDARD_ADDITIONAL_CHARGES,
        payload : additionalCharges
    }
}

export const setAdditionalCharges = (source, opportunuityId, portId, laneId, charges) => {
    return {
        type : ADDITONAL_CHARGE_DONE_CLICKED,
        payload : {source, opportunuityId, portId, laneId, charges}
        
    }
}
export const setLaneBidCharges =(opportunuityId, portId, laneId, bidData)=>{
    return{
        type:LANE_BID_DONE_CLICKED,
        payload:{opportunuityId, portId, laneId, bidData}
    }
}

export const setOpportunityList = (tab, opportynityData) => {
    return {
        type : API_GET_OPPORTINITY_LIST,
        payload : opportynityData,
        tab : tab
        
    }
}


export const setOpportunityDetails = (opportunuityId,opportunityDetails,opportunityPortsData,) => {
    return {
        type : API_GET_OPPORTINITY_DETAILS,
        payload : {
            opportunuityId : opportunuityId,
            opportunityDetails : opportunityDetails,
            opportunityPortsData : opportunityPortsData,
            isAlreadyOpened : isAlreadyOpened
            
            
        }
    }
}

export const setOpportunityBidData = (opportunuityId, bidData) => {
    return {
        type : SET_OPPORTUNITY_BID_DATA,
        payload : {
            opportunuityId : opportunuityId,
            bidData : bidData
        }
    }
}


  
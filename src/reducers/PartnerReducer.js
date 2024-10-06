/*************************************************************************
 *
 * KLEARNOW CONFIDENTIAL
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


 import * as actions from '../actions/index';
 import { get,equal } from 'lodash';
 import {getOpportunityDataForTab, updateCustomerOpportunityMap, updateOpportunityAdditionalCharges,
    updateOpportunityDataMapWithDetails, updateOpportunityDataMapWithBidDetails, opportunityInitialState,
    getOpenedOpportunityStatus, setOpenedOpportunityStatus} from 'KN-Drayage-UI'
import { SELECTED_TABS} from 'KN-Drayage-UI';

 let initialState = opportunityInitialState
 initialState.tab = SELECTED_TABS.PARTNER_NEW
 initialState.partnerId = ""
 initialState.loadingData = true;


 export default function PartnerReducer(state = initialState, action) {
   console.log("OpportunityReducer :  type and payload ",action.type,  action.payload)
//    console.trace("OpportunityReducer : ")

//    return OpportunityReducerCommon(state = initialState, action)
   let opporData = null
   let openedOpportunities = null
   let opportunityId = null

   switch (action.type) {

    case actions.OPPORTUNITY_ARROW_CLICKED :

        openedOpportunities = state.openedOpportunities
        opportunityId = action.payload

        let currentState = getOpenedOpportunityStatus(openedOpportunities,  state.tab, opportunityId)
        console.log("OpportunityReducer :   openedOpportunities ",opportunityId, openedOpportunities, currentState)
        // setOpenedOpportunityStatus(openedOpportunities, state.tab, opportunityId, !currentState)
        // openedOpportunities.set(opportunityId, !openedOpportunities.get(opportunityId))
        console.log("OpportunityReducer :   openedOpportunities ",openedOpportunities)

        return {
            ...state,
            openedOpportunities : openedOpportunities
        }
    case actions.OPPORTUNITY_BID_CLICKED: // Bid button of a opened opportunity clicked

        // let openedOpportunities = state.openedOpportunities
        // openedOpportunities.opportunityOpenedForBid = action.payload

        return {
            ...state,
            opportunityOpenedForBid : action.payload.opportunuityId,
            opportunityOpenedForBid_opp_type : action.payload.opp_key,
        }

    case actions.OPPORTUNITY_UPDATE_CLICKED: //This is from API, so we need to map accordingly
        //updae the states
        console.log("Edit clicked >> ", action.payload)
        // updateOpportunityAPIAdditionalCharges(state, action.payload.opportunuityId, action.payload.data)
        return {
            ...state
        }

    case actions.OPPORTUNITY_BID_MODAL_BID_CLICKED: // Bid button inside a bid modal is clicked, it will open a lane bid card

        break

    case actions.OPPORTUNITY_BID_MODAL_PORT_ADDITIONAL_CHARGE_CLICKED: // Port level additional charge is clicked, open additional charge modal

        break

    case actions.OPPORTUNITY_BID_MODAL_SUBMIT_CLICKED: // Bid modal level submit is clicked

        break
    
    case actions.OPPORTUNITY_BID_MODAL_CANCEL_CLICKED: // Bid modal level cancel is clicked

        break
    
    case actions.LANE_BID_DONE_CLICKED: // Lane level DONE is clicked, one lane data is done
       let laneBidData =  updateOpportunityDataMapWithBidDetails(state,action.payload)
       console.log("OpportunityReducer :laneBidData",laneBidData)

       return{
           ...state,
           opportunityData:laneBidData
       }
    
    case actions.LANE_BID_CANCEL_CLICKED: // Lane level Cancel is clicked, one lane data is done

        break
    
    case actions.LANE_BID_ADDITIONAL_CHARGE_CLICKED: // Lane level additional charge is clicked, one lane data is done

        break

    case actions.ADDITONAL_CHARGE_DONE_CLICKED:  // Additional  charge is DONE clicked
        
        opporData = updateOpportunityAdditionalCharges(state, action.payload)
        return {
            ...state,
            opportunityData : opporData
        }

    case actions.ADDITONAL_CHARGE_CANCEL_CLICKED: // Additional charge Cancel is clicked 

        break

    case actions.PARTNER_STANDARD_ADDITIONAL_CHARGES:
        return {
            ...state,
            standardPartnerAdditionalCharges : action.payload
        }

    case actions.API_GET_OPPORTINITY_LIST:
        let newData = updateCustomerOpportunityMap(state, action.payload, action.tab)
        console.log("OpportunityReducer : API_GET_OPPORTINITY_LIST ",action.type,  action.payload, newData)
        //console.log("OpportunityReducer : API_GET_OPPORTINITY_LIST ",typeof(newData.customerOpportunities))


        

        return {
            ...state, 
            tab : action.tab,
            // customerOpportunities : newData.customerOpportunities,
            containerOpportunities: newData.containerOpportunities,
            laneOpportunities: newData.laneOpportunities,
            opportunityData : newData.opportunityData,
            opportunityCount : newData.opportunityCount,
            loadingData: false,
        } 
        
    case actions.API_GET_OPPORTINITY_DETAILS:
        opporData = state.opportunityData
        if (!action.payload.isAlreadyOpened) {
            opporData = updateOpportunityDataMapWithDetails(state, action.payload)
        }
        console.log("OpportunityReducer : API_GET_OPPORTINITY_DETAILS updated oppordata ",opporData)


        openedOpportunities = state.openedOpportunities
        opportunityId = action.payload.opportunuityId

        console.log("OpportunityReducer :   openedOpportunities 1 ",action.payload.isAlreadyOpened, opportunityId, openedOpportunities, 
                                getOpenedOpportunityStatus(openedOpportunities,  state.tab, opportunityId))
                                
        // openedOpportunities.set(opportunityId, !action.payload.isAlreadyOpened)
        setOpenedOpportunityStatus(openedOpportunities, state.tab, opportunityId, !action.payload.isAlreadyOpened)
        console.log("OpportunityReducer :   openedOpportunities 2",openedOpportunities)

        return {
            ...state,
            opportunityData : opporData,
            openedOpportunities : openedOpportunities,
            time : Date.now()
        }
        
    case actions.SET_OPPORTUNITY_BID_DATA:
        return {
            ...state,
            opportunityData : updateOpportunityDataMapWithBidDetails(state, action.payload)
        }
        
    case actions.PARTNER_SET_ID:
        console.log("Set partner id:: ",action.payload.partnerId )
        return {
            ...state,
            partnerId : action.payload.partnerId
        }

     default:
       return state;
   }
 }
 
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


 import { combineReducers } from 'redux';
//  import ShipmentList from '../reducers/shipmentList'
 import PartnerReducer from './PartnerReducer'

// import {OpportunityReducer} from "KN-Drayage-UI" 
 
 
 export default combineReducers({
  //  shipmentList: ShipmentList
  opportunityReducer : PartnerReducer
 })
 
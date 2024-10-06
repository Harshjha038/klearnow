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
 import { HttpClient } from "../../../Api/httpClient"
 
 const getRequestHeadersNoToken = () => {
   return {
     Accept: "application/json",
     "Content-Type": "application/json",
   };
 };
 
 // {
 //   "eventMessage": {
 //       "searchType": "SEARCH_TYPE_CUSTOMER",
 //       "filters": [
 //           {
 //               "key": "SEARCH_FILTERS_MODE",
 //               "value": [
 //                   "AIR","TRUCK", "OCEAN"
 //               ]
 //           },
 //           {
 //               "key": "SEARCH_FILTERS_KXEMAIL",
 //               "value": [
 //                   "lifestyle@klearexpress.us"
 //               ]
 //           }
 //       ],
 //       "pageNumber": 1,
 //       "searchOrder": {
 //           "searchTab": "SEARCH_TAB_NEW_ISF",
 //           "direction": "DESC"
 //       }
 //   },
 //   "eventType": "SEARCH_SHIPMENTS_CUSTOMER",
 //   "eventTime": 1604110056356
 // }
 
 const getCookie = (cname = "kxPartnerToken") => {
   let name = cname + "=";
   let decodedCookie = decodeURIComponent(document.cookie);
   let ca = decodedCookie.split(";");
   for (let i = 0; i < ca.length; i++) {
     let c = ca[i];
     while (c.charAt(0) === " ") {
       c = c.substring(1);
     }
     if (c.indexOf(name) === 0) {
       return c.substring(name.length, c.length);
     }
   }
   return "";
 };
 
//  getHistoryTabResults: function (shipmentIds) {
  //   const data = {
  //     eventMessage: {
  //       shipmentIds
  //     },
  //     eventTime: Date.now()
  //   };
  //   return HttpClient.mockCustom("/api/changeLog.json", {
  //     data
  //   });
  // },
 const kxToken = getCookie("kxPartnerToken");
 const getRequestHeaders = () => {
   return {
     "Content-Type": "application/json",
     kxToken: kxToken,
   };
 };
 
 const getDrayageOpportunities = (tab) => {
   let data = {};
     data = {
       eventMessage: {
        tabType: "DRAYAGE_PUBLISHED"//tab
        //tabType:"PUBLISHED",
       },
       eventType: "DRAYAGE_GET_OPPORTUNITIES",
       eventTime: Date.now(),
     };
   
//    return HttpClient.custom({
//      data,
//    });

    //  return HttpClient.mockCustom("api/getDrayage.json", {
      return HttpClient.custom( {
        data
    });
 };

 const getDrayageOpportunityDetails = (opportunityId) => {
    let data = {};
      data = {
        eventMessage: {
            opportunityId: opportunityId
        },
        eventType: "DRAYAGE_GET_OPPORTUNITY_DETAILS",
        eventTime: Date.now(),
      };
    
      // return HttpClient.mockCustom("/api/getOpportunityDetail.json", {
         
         return HttpClient.custom({
           data
    });
  };
  

  const getDrayageAdditionalCharges =(partnerId)=>{
    let data={}
    data={

      eventMessage:{
        "partnerId":"123de3"
      },
      eventType: "DRAYAGE_GET_PARTNER_CHARGES",
      eventTime: Date.now(),
    }
    return HttpClient.custom({
          data,})
  }
 

  // {
  //   "opportunityId": "wewq12312",
  //   "partnerId": "partnerCode1/can also pick from guid",
  //   "portList": [
  //     {
  //       "sourcePortId": "knLocid",
  //       "laneList": [
  //         {
  //           "laneId": "lane1",
  //           "baseFees": "100",
  //           "fuelCharge": "20%",
  //           "notes": "as",
  //           "laneChargeList": [
  //             {
  //               "glCode": 345578,
  //               "amount": "120",
  //               "unit": "day",
  //               "quantity": 2
  //             },
  //             {
  //               "glCode": 345579,
  //               "amount": "50",
  //               "unit": "hr",
  //               "quantity": 2
  //             },
  //             {
  //               "glCode": 345578,
  //               "amount": "120",
  //               "unit": "day",
  //               "quantity": 2
  //             },
  //             {
  //               "glCode": 345578,
  //               "amount": "120",
  //               "unit": "day",
  //               "quantity": 2
  //             }
  //           ]
  //         },
  //         {
  //           "laneId": "lane2",
  //           "bidValue": "332",
  //           "baseFees": "100",
  //           "fuelCharge": "20%",
  //           "notes": "as",
  //           "laneChargeList": [
  //             {
  //               "glCode": 345578,
  //               "amount": "120",
  //               "unit": "day",
  //               "quantity": 2
  //             },
  //             {
  //               "glCode": 345579,
  //               "amount": "50",
  //               "unit": "hr",
  //               "quantity": 2
  //             },
  //             {
  //               "glCode": 345578,
  //               "amount": "120",
  //               "unit": "day",
  //               "quantity": 2
  //             },
  //             {
  //               "glCode": 345578,
  //               "amount": "120",
  //               "unit": "day",
  //               "quantity": 2
  //             }
  //           ]
  //         }
  //       ],
  //       "sourceChargeList": [
  //         {
  //           "glCode": 345578,
  //           "amount": "120",
  //           "unit": "day",
  //           "quantity": 2
  //         },
  //         {
  //           "glCode": 345579,
  //           "amount": "50",
  //           "unit": "hr",
  //           "quantity": 2
  //         }
  //       ]
  //     }
  //   ]
  // }
 



 export const formOpportunitySubmitMessage = (opportunityId, opportunityData) => {

  let data = opportunityData.get(opportunityId)
  if (!data) {
      console.log("No data for opportunity ", opportunityId)
      return
  }

  let portData = data.portData
  if (!portData)  {
      console.log("No port data in opportunity ", opportunityId)
      return
  }

  let portList = []

  for (let [sourcePortId, value] of portData) {
      let onePortData = {}

      onePortData.sourcePortId = sourcePortId
      onePortData.laneList = []

      for (let destination of value.destinations) {
          let lane = {}

          lane.laneId = destination.laneId
          let destinationBidData = destination.destinationBidData
          if (destinationBidData) {
              lane.baseFees = destinationBidData.baseFees
              lane.fuelCharge = destinationBidData.fuelCharges
              lane.chasisRentalperday = destinationBidData.chasisRentalperday
              lane.minReqDays = destinationBidData.minReqDays
              lane.notes =  destinationBidData.notes
              lane.capacityPerMonth= destinationBidData.capacityPerMonth
              lane.rateValidUntilDate=destinationBidData.rateValidUntilDate
          }

          /*
           * Add base charges and lane level additional charfes
           */

          onePortData.laneList.push(lane)
      }

      /*
       * Add port level additional charges
       */

      portList.push(onePortData)
  }
  let msg = {
    "opportunityId": opportunityId,
     "portList" : portList
  }

  data={
    eventMessage:msg,
    eventType: "DRAYAGE_PARTNER_SUBMIT_BID",
    eventTime: Date.now(),
  }

  console.log("Submit bid message : ", data)
  return HttpClient.custom({ data,})

}


 export {getDrayageOpportunities, getDrayageOpportunityDetails, getDrayageAdditionalCharges, getRequestHeadersNoToken}

//  {
//   "eventMessage":  {
//    "opportunityId": "wewq12312"
//  },
//   "eventType": "DRAYAGE_GET_OPPORTUNITY_DETAILS",
//   "eventTime": 1539730411376
//  }
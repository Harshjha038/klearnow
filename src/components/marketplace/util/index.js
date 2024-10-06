/*
 * String constants
 */
import{Popup } from "semantic-ui-react"
import React from "react";

export const toISODateFormat = (date) => {
	return date?date.getFullYear()+'-' + (date.getMonth()+1) + '-'+date.getDate():"";
}
export const OPPORTUNITY_MODAL_VIEW = {
	None : "None",
	BidModal : "BidModal", 
	LaneBidCard : "LaneBidCard", 
	AdditionalCharges: "AdditionalCharges", 
	PortAdditionalCharges: "PortAdditionalCharges", 
	ConfirmationForSubmit : "ConfirmationForSubmit", 
	SuccessfulSubmission : "SuccessfulSubmission", 
	FailureSubmission :"FailureSubmission"
}
export const isBidModalClose=(view)=>{
  return view= OPPORTUNITY_MODAL_VIEW.None
}
export const isBidModalOpen = (view) => {
	return view != OPPORTUNITY_MODAL_VIEW.None
}

export const isViewBidModal = (view) => {
	return view === OPPORTUNITY_MODAL_VIEW.BidModal
}

export const isViewLaneBid = (view) => {
	return view === OPPORTUNITY_MODAL_VIEW.LaneBidCard
}

export const isViewLaneAdditionalCharges = (view) => {
	return view === OPPORTUNITY_MODAL_VIEW.AdditionalCharges
}

export const isViewPortAdditionalCharges = (view) => {
	return view === OPPORTUNITY_MODAL_VIEW.PortAdditionalCharges
}

export const isViewConfirmationButton = (view) => {
	return view === OPPORTUNITY_MODAL_VIEW.ConfirmationForSubmit
}

export const isViewSuccessfulSubmission = (view) => {
	return view === OPPORTUNITY_MODAL_VIEW.SuccessfulSubmission
}

export const isViewFailureSubmission = (view) => {
	return view === OPPORTUNITY_MODAL_VIEW.FailureSubmission
}

export const totalAdditionalCharge = (additionalCharges) => {
	let grandTotal =0;
	if (!additionalCharges) {
		return 0
	}
	console.log("totalAdditionalCharge : ", additionalCharges)
	for (let i = 0; i < additionalCharges.length; i++) {
		let total = 0;
		let charge = additionalCharges[i];
  
		console.log("grandTotal charge :", charge);
		if (charge.reqQuantityUsed) {
		  total = parseInt(charge.unitPrice) * parseInt(charge.reqQuantityUsed);
		   grandTotal += total;
		   console.log("grandTotal util",grandTotal)
		}
	  }
	  return grandTotal
}

export const totalBidAmountForLane = (state) => {

	let basefee = 0;
    let minDaysReq = 0;
    let chasisRentalPerDay = 0;
    let fuelCharges = 0;
    if (state.baseFees) {
      basefee = parseInt(state.baseFees);
    }
    if (state.minReqDays) {
      minDaysReq = parseInt(state.minReqDays);
    }
    if (state.chasisRentalperday) {
      chasisRentalPerDay = parseInt(state.chasisRentalperday);
    }
    if (state.fuelCharges) {
      fuelCharges = parseFloat(state.fuelCharges);
    }

	console.log("totalBidAmountForLane :: ", state )
    let totalFee =
      basefee + minDaysReq * chasisRentalPerDay + (basefee * fuelCharges) / 100;

    let tmp = []
    for (let [key,value] of state.additionalchargesForLane) {
      tmp.push(value)
    }  

    let totalAdditionalchargesForLane = totalAdditionalCharge(tmp)
     
    totalFee = totalFee  + totalAdditionalchargesForLane
    console.log("additionalchargesForLane :",tmp, totalAdditionalchargesForLane)

	return totalFee

}
export const   splitForTooltip = (name) => {
	if(!name) 
	return"TBD"
	
	

	let firstPart = name.substring(0,15);
	
	console.log("splitForTooltip :: ", name,  ", firstPart", firstPart)
	return  <div>
		{firstPart}
		{name.length>15?
			<Popup content={name} trigger={<b><a style={{color: "#0A8B8F",marginTop:"-20px"}}>...</a></b>} />
		:""
		}
		</div>

		
}

//let modalClassName = "partner-modal-first !important"
    
// if (this.state.modalView === "DesinationLaneBidCard") {
// 	modalClassName  = "partner-modal-first !important"
//   } else if (this.state.modalView === "AdditionalCharges") {
// 	modalClassName  = "partner-Modal !important" 
//   }
// BidModal : "BidModal",
// LaneBidCard : "LaneBidCard", 
// 	AdditionalCharges: "AdditionalCharges", 
// 	ConfirmationForSubmit : "ConfirmationForSubmit", 
// 	SuccessfulSubmission : "SuccessfulSubmission", 
// 	FailureSubmission :"FailureSubmission"
export const getModalClassName = (view) => {
	switch(view) {
		case OPPORTUNITY_MODAL_VIEW.BidModal :
			return "partner-modal-first !important"
		
		case OPPORTUNITY_MODAL_VIEW.PortAdditionalCharges:
			return "partner-Modal !important"	
		
		case OPPORTUNITY_MODAL_VIEW.LaneBidCard :
			return "partner-modal-first !important"
		
		case OPPORTUNITY_MODAL_VIEW.AdditionalCharges :
			return "partner-Modal !important"
			
		case OPPORTUNITY_MODAL_VIEW.ConfirmationForSubmit :
			return "Modal"
		case OPPORTUNITY_MODAL_VIEW.SuccessfulSubmission :
			return "Modal"
		case OPPORTUNITY_MODAL_VIEW.FailureSubmission :
			return "Modal"		
	}
}
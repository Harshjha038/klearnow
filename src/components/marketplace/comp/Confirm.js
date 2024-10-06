import { render } from 'node-sass'
import React, { Component } from 'react'
import ReactModal from 'react-modal'
//import images from "../images"
import Success from './Success'

export default class Confirm extends Component {
  // constructor(){
  //   super()
  //   this.state={
  //     feesDetails:{}
  //   }
  // }

  render () {
    return <div></div>
  }
  
  // render() {

  //   let opportunityId = this.props.opportunityId
  //   console.log("confirm opportunityId", opportunityId)
  //   let opportunityData = this.props.opportunityData
  //   //let indivData=opportunityData.this.props.opportunityId
  //   let indivData = opportunityData.get(this.props.opportunityId)
  //   let portData = indivData.portData
  //   console.log("confirm portData", portData)
  //   let indivPortData = portData.get(this.props.sourcePortCode)
  //   console.log("confirm indivPortData", indivPortData)
  //   let destinations = indivPortData.destinations
  //   console.log("confirm destinations", destinations)

  //   let priceDetails = () => {
  //     for (let destination of destinations) {
  //       let desinationBidData = destination.destinationBidData
  //       console.log("confirm desinationBidData", desinationBidData)
  //       let feesDetails = {
  //         "Base Fees": feesDetails.desinationBidData.baseFees,
  //         "capacityPerMonth": feesDetails.desinationBidData.capacityPerMonth
  //       }
  //       this.setState({feesDetails:destination.feesDetails})

  //     }
      
      
  //   }


  //   return (
  //     <div>
  //        <div>
        
  //       <div className="partner-modal-first-confirmation-contents">
  //         <img style={{ marginLeft: "230px" }} src="/images/files/confirm.svg" />
  //         <div className="text-confirm">Confirm Submission</div>
  //         <div>{this.state.feesDetails}</div>
  //         {/* <div className="email-text">
  //             We 'll send you a confirmation email shortly.
  //           </div> */}
  //         <div>
  //           <button style={{ marginLeft: "120px" }}
  //             onClick={(e) => {
  //               this.props.bidSubmissionConfirmed();
  //             }}
  //             className="btn-done"
  //           >
  //             Yes
  //           </button>
  //           <button
  //             onClick={(e) => {
  //               this.props.bidSubmissionCanceled();
  //             }}
  //             className="cancel-btn"
  //           >
  //             No
  //           </button>
  //         </div>
  //       </div>
  //       {/* </ReactModal> */}
  //     </div>
        
  //     </div>
  //   );
  // }
}




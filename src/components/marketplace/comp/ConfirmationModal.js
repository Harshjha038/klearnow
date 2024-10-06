import React, { Component } from 'react';

class ConfirmationModal extends Component {

    constructor(props) {
        super(props)
        this.state = {
            feesDetails: []

        }
    }


    
   
    priceDetails = (destinations) => {
        let updatedFeesDetails = []
        for (let destination of destinations) {
            let desinationBidData = destination.destinationBidData
            console.log("confirm desinationBidData", desinationBidData)


            let eachFeesDetails = {
                "Base Fees": desinationBidData.baseFees,
                "capacityPerMonth": desinationBidData.capacityPerMonth
            }
            console.log("updatedFeesDetails", eachFeesDetails)
            updatedFeesDetails.push(eachFeesDetails)


        }
        //this.setState({ feesDetails: updatedFeesDetails })
        // return this.state.feesDetails
    }


    //console.log("priceList",priceList)
    render(){
       let opportunityId = this.props.opportunityId
    console.log("confirm opportunityId", opportunityId)
    let opportunityData = this.props.opportunityData
    let indivData=opportunityData.this.props.opportunityId
    // let indivData = opportunityData.get(this.props.opportunityId)
   let portData = indivData.portData
    console.log("confirm portData", portData)
    let indivPortData = portData.get(this.props.sourcePortCode)
    console.log("confirm indivPortData", indivPortData)
   let destinations = indivPortData.destinations
    console.log("confirm destinations", destinations)
    let priceList= this.priceDetails(destinations)
    
        return (
            <div>
                <div>
    
                    <div className="partner-modal-first-confirmation-contents">
                        <img style={{ marginLeft: "230px" }} src="/images/files/confirm.svg" />
                        <div className="text-confirm">Confirm Submission</div>
                        <div>{priceList}</div>
                        {/* <div className="email-text">
                        We 'll send you a confirmation email shortly.
                      </div> */}
                        <div>
                            <button style={{ marginLeft: "120px" }}
                                onClick={(e) => {
                                    this.props.bidSubmissionConfirmed();
                                }}
                                className="btn-done"
                            >
                                Yes
                            </button>
                            <button
                                onClick={(e) => {
                                    this.props.bidSubmissionCanceled();
                                }}
                                className="cancel-btn"
                            >
                                No
                            </button>
                        </div>
                    </div>
                    {/* </ReactModal> */}
                </div>
    
            </div>
        );
    }
            


}


export default ConfirmationModal;
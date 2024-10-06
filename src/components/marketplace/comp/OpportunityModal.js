import React, { Component } from 'react'
import ReactModal from "react-modal";
import { OPPORTUNITY_MODAL_VIEW, getModalClassName } from '../util';
import BidModal from './BidModal';
import LaneBidCard from './LaneBidCard';
import LaneAdditionalCharges2 from "./LaneAdditionalCharges2"


export default class OpportunityModal extends Component {

    constructor(props) {
        super(props);
        console.log("OpportunityModal :: constructor")
        let view = OPPORTUNITY_MODAL_VIEW.None
        if (this.props.isModalOpen) {
            view = OPPORTUNITY_MODAL_VIEW.BidModal
        }
        this.state = {
            view: view, //BidModal, LaneBidCard, AdditionalCharges, Confirmation, SuccessfulSubmission, FailureSubmission
            showPortWiseBidModal : false,
            selectedPortCode : "",
            selectedSourcePort : "",
            selectedSourcePortName:"",
            selectedDestinationName : "",
            selectedLaneId : "",
            selectedDestinationLaneData :"",
        };
    }

    componentDidUpdate(prevProps, prevState) {
        console.log("OpportunityModal :: componentDidUpdate ", prevProps.isModalOpen, this.props.isModalOpen)
        if (prevProps.isModalOpen != this.props.isModalOpen) {
            this.setState({view : OPPORTUNITY_MODAL_VIEW.BidModal})
        }
    }


    individualBidClickHandler = (
        portId,
        sourcePort,
        destinationName,
        selectedLaneId,
        sourcePortName,
        destinationData
      ) => {
        /*
         * Extract lane information using portId,sourcePort,destinationName from this.state.portData
         * Save openedLanePortId, openedLaneDestination, openedLaneData in state
         */
    
        console.log(
          "individualBidClickHandler :: ",
          portId,
          sourcePort,
          destinationName,
          selectedLaneId
        );
        this.setState({
          view: OPPORTUNITY_MODAL_VIEW.LaneBidCard,
          selectedPortCode: portId,
          selectedSourcePort: sourcePort,
          selectedDestinationName: destinationName,
          selectedLaneId: selectedLaneId,
          selectedSourcePortName: sourcePortName,
          selectedDestinationLaneData : destinationData,
        });
      };
    
        
    individualBidDoneHandler = () => {
        this.setState({view:OPPORTUNITY_MODAL_VIEW.BidModal})
    }

    individualBidCancelHandler = () => {
        this.setState({view:OPPORTUNITY_MODAL_VIEW.BidModal})
    } 

    additionalChargeClickHandler = (e) => {
        this.setState({ view: OPPORTUNITY_MODAL_VIEW.AdditionalCharges });
    };

    additionalChargeDoneHandler = (e) => {
        this.setState({view : OPPORTUNITY_MODAL_VIEW.LaneBidCard})
    }

    portAddtionalChargeClickHandler = (sourcePortCodeForAdditionalCharge) => {
        console.log("addtionalChargeClickHandler : ", sourcePortCodeForAdditionalCharge)
        this.setState({
          isAdditionalCharges: !this.state.additionalCharges,
          view: OPPORTUNITY_MODAL_VIEW.PortAdditionalCharges,
          sourcePortCodeForAdditionalCharge: sourcePortCodeForAdditionalCharge,
        });
    };

    portAddtionalChargeDoneHandler = () => {
        this.setState({view : OPPORTUNITY_MODAL_VIEW.BidModal})
    };

    render() {
        let className = getModalClassName(this.state.view)
        console.log("OpportunityModal :: render ", this.props)
        
        return (
          <div>
            {/* <ReactModal
              isOpen={this.state.view != "None"}
              contentLabel="onRequestClose Example"
              // onRequestClose={this.props.handleCloseModal}
              className={className}
              overlayClassName="Overlay"
              id={this.props.opportunityOpenedForBid}
            > */}
                {
                    this.state.view === OPPORTUNITY_MODAL_VIEW.BidModal ? 
                        <BidModal 
                            {...this.props} 
                            individualBidClickHandler={this.individualBidClickHandler}
                            isOpen={true}
                            showPortWiseBidModal ={this.state. showPortWiseBidModal }
                            additionalChargeClickHandler={this.additionalChargeClickHandler}
                            // key={this.props.opportunityOpenedForBid}
                        /> :
                    this.state.view === OPPORTUNITY_MODAL_VIEW.LaneBidCard ? 
                        <LaneBidCard 
                            {...this.props}
                            
                            bidAdditionalChargeHandler={this.bidAdditionalChargeHandler}
                            standardPartnerAdditionalCharges={this.props.standardPartnerAdditionalCharges}
                            partnerId={this.props.partnerId}
                            destinationName={this.state.selectedDestinationName}
                            sourcePort={this.state.selectedSourcePort}
                            sourcePortName={this.state.selectedSourcePortName}
                            sourcePortCode={this.state.selectedPortCode}
                            laneId={this.state.selectedLaneId}
                            setAdditionalChargesInStore={this.props.setAdditionalChargesInStore}
                            standardPartnerAdditionalCharges={
                                this.props.standardPartnerAdditionalCharges
                            }
                            setLaneBidChargesInStore={this.props.setLaneBidChargesInStore}
                            individualBidDoneHandler={this.individualBidDoneHandler}
                            individualBidCancelHandler={this.individualBidCancelHandler}
                            selectedDestinationLaneData={this.state.selectedDestinationLaneData}
                            additionalChargeClickHandler={this.portAddtionalChargeClickHandler}
                            isOpen={true}

                        /> :
                        this.state.view === OPPORTUNITY_MODAL_VIEW.AdditionalCharges ? 
                        <LaneAdditionalCharges2 
                            {...this.props}
                            additionalChargeCancelHandler={this.additionalChargeCancelHandler}
                            bidAdditionalChargeHandler={this.props.bidAdditionalChargeHandler}
                            standardPartnerAdditionalCharges={this.props.standardPartnerAdditionalCharges}
                            partnerId={this.props.partnerId}
                            sourcePort={this.props.sourcePortCode}
                            opportunityId={this.props.opportunityId}
                            destinationName={this.props.destinationName}
                            laneId={this.props.laneId}
                            fromLaneBidCard={true}
                            sourcePortName={this.props.sourcePortName}
                            additionalChargeDoneHandler={this.additionalChargeDoneHandler}
                            setAdditionalChargesInStore={
                                this.props.setAdditionalChargesInStore
                        }
                        />:
                        this.state.view === OPPORTUNITY_MODAL_VIEW.PortAdditionalCharges ? 
                        <LaneAdditionalCharges2 
                            {...this.props}
                            additionalChargeCancelHandler={this.additionalChargeCancelHandler}
                            bidAdditionalChargeHandler={this.props.bidAdditionalChargeHandler}
                            standardPartnerAdditionalCharges={this.props.standardPartnerAdditionalCharges}
                            partnerId={this.props.partnerId}
                            sourcePort={this.props.sourcePortCode}
                            opportunityId={this.props.opportunityId}
                            destinationName={this.props.destinationName}
                            laneId={this.props.laneId}
                            fromLaneBidCard={true}
                            sourcePortName={this.props.sourcePortName}
                            additionalChargeDoneHandler={this.portAddtionalChargeDoneHandler}
                            setAdditionalChargesInStore={
                                this.props.setAdditionalChargesInStore
                            }
                        />:
                    // this.state.view === OPPORTUNITY_MODAL_VIEW.AdditionalCharges ? 
                        // <LaneAdditionalCharges2 /> :
                    null
                }

            {/* </ReactModal> */}
          </div>
        );
    }
}

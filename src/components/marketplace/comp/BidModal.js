import React, { Component } from "react";
import ReactModal from "react-modal";
import PortwiseData from "./PortwiseData";
import LaneAdditionalCharges2 from "./LaneAdditionalCharges2";
import {isViewBidModal , isViewLaneAdditionalCharges, isViewLaneBid, isViewPortAdditionalCharges, OPPORTUNITY_MODAL_VIEW,isViewConfirmationButton , isViewSuccessfulSubmission} from "../util";
import LaneBidCard from "./LaneBidCard";
import ModalConfirm from "./ModalConfirm";
import Success from "./Success"
import Failure from "./Failure"
import { SELECTED_TABS, DRAYAGE_API_RESPONSE, amountToShortString} from "KN-Drayage-UI";
import "./styles.scss";

export default class BidModal extends Component {
  constructor(props) {
    super(props);
    /* 
        
        Level 1 Map : 
           Key : SourcePort
           Value : Level 2 Map
        
        Level 2 Map :
           Key : DestinationId
           Value : Bid Data

        {
            "oakland" : {
                "dest1"  :{ // Data from big form of one port and destination
                  "baseFee": ..,
                  FuelChar : ..,
                  ..
                },
                "dest2" : {

                }
            },
            "NewYork" : {

            }



        } */

    let isOpenPortMap = new Map();

    // this.state={
    //     isOpenMap:isOpenMap,
    //     showModal: true,
    //     partnerId: "123de3",

    // modalView 
    //   1. OpportunityBidView : Full view of opportunity - all ports and destination (all DestinationLanes)
    //   2. DesinationLaneBidCard : Bid data form for a given destination lane
    //   3. AdditionalCharges : Additional charge due at port level or lane level
    //
    //
    this.state = {
      modalView : OPPORTUNITY_MODAL_VIEW.BidModal, //"AdditionalCharges"
      isOpenPortMap: isOpenPortMap,
      isAdditionalCharges: false,
      isConfirmation : false,
      sourcePortCodeForAdditionalCharge:"" ,
      isSubmit:false,
      
      destinationName:"",
      sourcePort:"",
      sourcePortName:"",
      sourcePortCode:"",
      laneId:"",

      selectedSourcePortName : "",
      selectedSourcePortCode : "",
      selectedLaneId : "",
      selectedContainerLoadType:"",
      selectedContainerType:"",
      selectedwarehouseAppointment:"",
      addressName:"",
      isEditBidModal:true,
      bidOperationType:""
    };
  }

  handleModalViewChange = (actionClicked) => {
      if (actionClicked === "BID_") {

      // } else if () {

      }
  }

  additionalChargeClickHandler = (sourcePortCodeForAdditionalCharge, modalView) => {
    //console.log("additionalChargeClickHandler : ", sourcePortCodeForAdditionalCharge)
    this.setState({
      isAdditionalCharges: !this.state.additionalCharges,
      modalView: modalView,
      sourcePortCodeForAdditionalCharge: sourcePortCodeForAdditionalCharge,
    });
  };

  additionalChargeDoneHandler = (fromLaneBidCard) => {
    // console.log(
    //   "additionalChargeDoneHandler : done",
    //   this.state.modalView
    // );
    this.setState({ modalView: fromLaneBidCard ? OPPORTUNITY_MODAL_VIEW.LaneBidCard : OPPORTUNITY_MODAL_VIEW.BidModal });
  };

  onPortArrowClick = (sourcePortName, sourcePortCode) => {
    let isOpenPortMap = this.state.isOpenPortMap;
    // isOpenPortMap.set(sourcePortCode, !isOpenPortMap.get(sourcePortCode));
    // console.log(
    //   "BidModal oArrowClick :: ",
    //   sourcePortName,
    //   sourcePortCode,
    //   isOpenPortMap.get(sourcePortCode)
    // );

    /*
     * Case 1 : A opened port was closed
     * Case 2 : A different port was clicked to be opened, so open this and close any previously opened
     * Case 3 : All were closed a new port has been opened
     */
    let thisPortWasOpened = isOpenPortMap.get(sourcePortCode)
    if (thisPortWasOpened) { // case 1
      isOpenPortMap.set(sourcePortCode, !isOpenPortMap.get(sourcePortCode));
      sourcePortName = ""
      sourcePortCode = ""
    } else { // case 2 and 3 - close all ports, and open this one
      for (let [portCode, opened] of isOpenPortMap) {
        isOpenPortMap.set(portCode, false)
      }
      isOpenPortMap.set(sourcePortCode, true)
    }

    this.setState({
      isOpenPortMap: isOpenPortMap,
      selectedSourcePortName : sourcePortName,
      selectedSourcePortCode : sourcePortCode
    });
  };

  bidSubmissionConfirmed = () => {
                            console.log("submitOpportunityBidData  :: Call submit api" )
                            const { drayageApp } = this.props
                                  // Call submit api here
                                  let result = this.props.submitOpportunityBidData(
                                    this.props.opportunityId,
                                    this.props.opportunityData,
                                    this.props.partnerId,
                                    this.props.isFromEdit,
                                    this.state.bidOperationType,
                                    drayageApp
                                  );
                                  result
                                    .then((res) => {
                                      console.log(
                                        "bidSubmissionConfirmed : result ",
                                        res
                                      );
                                      this.setState({
                                        isConfirmation: false,
                                        isSubmit: true,
                                        modalView:
                                          res === DRAYAGE_API_RESPONSE.SUCCESS
                                            ? OPPORTUNITY_MODAL_VIEW.SuccessfulSubmission
                                            : OPPORTUNITY_MODAL_VIEW.FailureSubmission,
                                      });
                                    })
                                    .catch((err) => {
                                      this.setState({
                                        isConfirmation: false,
                                        isSubmit: true,
                                        modalView:
                                          OPPORTUNITY_MODAL_VIEW.FailureSubmission,
                                      });
                                    });
                                }

  bidSubmissionCanceled = () => {
    this.setState({isConfirmation: false, modalView : OPPORTUNITY_MODAL_VIEW.BidModal})
  }

  bidModalCanceled = () => {
     this.props.handleOpportunityBidModalCanceled()
  }

  bidSubmissionStarted = (type) => {
    this.setState({isConfirmation: true,modalView:OPPORTUNITY_MODAL_VIEW.ConfirmationForSubmit, bidOperationType: type})

  }
  bidAfterSubmitDoneHandler=()=>{
    this.props.handleOpportunityBidModalCanceled()
    //call get  oppor api and now the current oppor shounity that we submitted shouldnot appear in new
   
    this.setState({modalView : OPPORTUNITY_MODAL_VIEW.BidModal})
    this.props.getOpportunityList(SELECTED_TABS.PARTNER_SUBMITTED);
  }
  additionalChargeCancelHandler=(fromLaneBidCard)=>{
    //console.log("additionalChargeCancelHandler","cancel")
    this.setState({isAdditionalCharges: false,modalView: fromLaneBidCard ? OPPORTUNITY_MODAL_VIEW.LaneBidCard : OPPORTUNITY_MODAL_VIEW.BidModal })
  }

  individualBidClickHandler = (
    portId,
    sourcePort,
    destinationName,
    selectedLaneId,
    sourcePortName,
    destinationData,
    containerLoadType,
    containerType,
    warehouseAppointment,
    addressName

  ) => {
    /*
     * Extract lane information using portId,sourcePort,destinationName from this.state.portData
     * Save openedLanePortId, openedLaneDestination, openedLaneData in state
     */

    // console.log(
    //   "individualBidClickHandler :: ",
    //   portId,
    //   sourcePort,
    //   this.state.selectedSourcePortName,
    //   destinationName,
    //   selectedLaneId,
    //   addressName
    // );
    if(this.props.opp_key === "containerOpportunities"){
      destinationData.eta = this.getOpportunityDataForOpportunityId().eta
    }
    this.setState({
      modalView: OPPORTUNITY_MODAL_VIEW.LaneBidCard,
      selectedPortCode: portId,
      selectedSourcePort: sourcePort,
      selectedDestinationName: destinationName,
      selectedLaneId: selectedLaneId,
      selectedSourcePortName: sourcePortName,
      selectedDestinationLaneData : destinationData,
      showLaneBidCard:true,
      selectedContainerLoadType:containerLoadType,
      selectedContainerType:containerType,
      selectedwarehouseAppointment:warehouseAppointment,
      addressName:addressName

    });
  };

  individualBidDoneHandler = () => {
    this.setState({modalView:OPPORTUNITY_MODAL_VIEW.BidModal, selectedLaneId : ""})
  }

  individualBidCancelHandler = () => {
    this.setState({modalView:OPPORTUNITY_MODAL_VIEW.BidModal, selectedLaneId : ""})
  }
  
  getOpportunityDataForOpportunityId = () => {
    let thisOpportunityData = new Map()
    if (this.props.opportunityData && this.props.opportunityData.has(this.props.opportunityId)) {
      thisOpportunityData = this.props.opportunityData.get(this.props.opportunityId)
    }
    return thisOpportunityData
  }

  componentDidUpdate(prevProps, prevState) {
    //console.log("OpportunityModal :: componentDidUpdate ");

    let isOpenPortMap = new Map();

    let thisOpportunityData = this.getOpportunityDataForOpportunityId()
    let opportunityPortsData = thisOpportunityData.portData ? thisOpportunityData.portData :new Map()

    let portDataKeys = Array.from(opportunityPortsData.keys());
    console.log("BidModal :: ", opportunityPortsData);
    console.log("BidModal :: ", "array : ", portDataKeys);
    let isFirst = true
    for (let key of portDataKeys) {
      let portData = opportunityPortsData.get(key);
      console.log("BidModal  :: port ", portData);
      isOpenPortMap.set(portData.sourcePortCode, isFirst ? true : false);
      isFirst = false
    }
    console.log("BidModal :: isOpenPortMap", isOpenPortMap);
  }

  render() {
    /*
     * Find data for opportunity
     */
    let thisOpportunityData = this.getOpportunityDataForOpportunityId()
    let opportunityPortsData = thisOpportunityData.portData ? thisOpportunityData.portData :new Map()
    console.log("BidModal :: Opportunity Details", thisOpportunityData, opportunityPortsData)

    let allBidsEntered = true
    let totalProposedVolume = 0
    let totalProposedAmount = 0
    let totalEnteredBidAmount = 0
    
    if (opportunityPortsData ) {
      for (let [sourcePort, portData] of opportunityPortsData) {
          let portTotalApproxVolume = 0
          
          for (let destination of portData.destinations) {
            console.log("BidModal :: destination", destination)
            if (!destination.destinationBidData || !destination.destinationBidData.baseFees || !destination.destinationBidData.capacityPerMonth)  {
              allBidsEntered = false
              // break
            } else {
              totalEnteredBidAmount += parseInt(destination.approxVolume)*parseInt(destination.destinationBidData.bidBaseTotal)
            }
            console.log("BidModal :: totalEnteredBidAmount", destination.approxVolume,destination.proposedBid, destination.destinationBidData.bidBaseTotal, totalEnteredBidAmount)
            totalProposedVolume +=   parseInt(destination.approxVolume)
            totalProposedAmount += parseInt(destination.proposedBid*parseInt(destination.approxVolume)) 
            portTotalApproxVolume += parseInt(destination.approxVolume)
          }
          portData.portTotalApproxVolume = portTotalApproxVolume
          console.log("BidModal :: totalEnteredBidAmount",portTotalApproxVolume, portData.portAdditionalCharges)
          // if (!allBidsEntered) {
          //   break
          // }

               /*
         * Find total port additional charge that will add up to totalEnteredBidAmount
         */
        let totalPortAdditionalCharges = 0
        portData.totalPortAdditionalCharges = 0
        if (portData.portAdditionalCharges) {
          for (let [key, charge] of portData.portAdditionalCharges) {
            if (charge.reqQuantityUsed && charge.reqQuantityUsed  > 0) {
              totalPortAdditionalCharges += charge.unitPrice*parseInt(charge.reqQuantityUsed)
            }
          }
          portData.totalPortAdditionalCharges = totalPortAdditionalCharges
          totalEnteredBidAmount += totalPortAdditionalCharges*portTotalApproxVolume
        }
      }
    }

    let modalClassName = "partner-modal-first !important"
    if(isViewSuccessfulSubmission(this.state.modalView)){
      modalClassName ="partner-modal-success !important"
    }
    if ((isViewLaneBid(this.state.modalView)) || isViewLaneAdditionalCharges(this.state.modalView) || isViewPortAdditionalCharges(this.state.modalView)) {
        modalClassName = "partner-modal-first-bid-card !important"
    }    
    // if (this.state.modalView === OPPORTUNITY_MODAL_VIEW.BidModal) {
    //   modalClassName  = "partner-modal-first !important"
    // } else if (this.state.modalView === OPPORTUNITY_MODAL_VIEW.AdditionalCharges) {
    //   modalClassName  = "partner-Modal !important" 
    // }

    /*
     *
     *   Find additional charges applicable
     */
    let additionalCharges = new Map()
    if (isViewBidModal(this.state.modalView) ||  isViewPortAdditionalCharges(this.state.modalView)) { 
      //Read port additional charges for selected port to be shown in bid modal

      let portData = opportunityPortsData.get(this.state.selectedSourcePortCode)
      console.log("BidModal ::  Port data ", portData)
      if (portData) {
        additionalCharges = portData.portAdditionalCharges
      }

    } else if (isViewLaneBid(this.state.modalView) ||  isViewLaneAdditionalCharges(this.state.modalView)) {
      //Read port additional charges for selected lane
      let portData = opportunityPortsData.get(this.state.selectedSourcePortCode)
      console.log("BidModal ::  Port data for lan bid ", portData)
      if (portData && portData.destinations) {
        let destinations = portData.destinations
        for (let destination of destinations)  {
          if (destination.laneId === this.state.selectedLaneId) {
            console.log("BidModal ::  Port data destination ", destination, " for ", this.state.selectedLaneId)
            additionalCharges = destination.destinationAdditionalCharges
            break
          }
        }
      }
    }

    console.log("BidModal ::  additionalCharges ", additionalCharges)
   
    return (
      <div>
        <ReactModal
          isOpen={this.props.isOpen}
          contentLabel="onRequestClose Example"
          onRequestClose={this.props.handleCloseModal}
          className={modalClassName}
          overlayClassName="Overlay"
          ariaHideApp={false}
          // style={!isViewBidModal(this.state.modalView) ? {"display" : "none"} : null}
        >
          <div className="partner-bid-modal-header">
            <div className="icon-text">
              <div
                style={(this.state.modalView===OPPORTUNITY_MODAL_VIEW.LaneBidCard || this.state.modalView===OPPORTUNITY_MODAL_VIEW.AdditionalCharges || this.state.modalView===OPPORTUNITY_MODAL_VIEW.PortAdditionalCharges)?{  marginTop: "1px", }
              :(this.state.modalView===OPPORTUNITY_MODAL_VIEW.ConfirmationForSubmit ||this.state.modalView===OPPORTUNITY_MODAL_VIEW.SuccessfulSubmission)?{marginLeft:"450px", marginTop: "1px"}:{  marginTop: "1px",marginLeft:"75%" }}
                
                className="img-bidIcon"
              >
              </div>
              {isViewBidModal(this.state.modalView) &&<div style={{ marginLeft: "370px" }} className="bid-text">
                SUBMIT YOUR BEST BID
              </div>}
            </div>
          </div>
        

          {isViewBidModal(this.state.modalView) ? (
            <div>
              <div className="scrollableDiv">
                {opportunityPortsData &&
                  Array.from(opportunityPortsData.keys()).map((portId) => {
                    // console.log("portwisebid page : port ",
                    // portId,
                    // opportunityPortsData.get(portId),
                    // this.state.isOpenPortMap
                      
                    // ); 
                    let portData = opportunityPortsData.get(portId)
                    return (
                      <div>
                        <PortwiseData
                          // **********************   Properties **************************

                          portData={opportunityPortsData.get(
                            //Port data for this portId
                            portId
                          )}
                          isOpen={this.state.isOpenPortMap.get(
                            // Whether this port is open for display or not
                            portData.sourcePortCode
                          )}
                          partnerId={this.props.partnerId}
                          opp_key={this.props.opp_key}
                          additionalCharges={additionalCharges}
                          // **********************   Methods **************************
                          onPortArrowClick={
                            //When a port arrow is clicked to open all lanes of a port
                            (e) => {this.onPortArrowClick(portData.sourcePort, portData.sourcePortCode)}
                          }
                          individualBidClickHandler={
                            //Local function forr - A given lane BID button is clicked which will open the LaneBidCard
                            this.individualBidClickHandler
                          }
                          additionalChargeClickHandler={
                            //Local function called when ADD is clicked for additiona charge for a PORT
                            this.additionalChargeClickHandler
                          }
                          isFromEdit={this.props.isFromEdit}
                        />
                      </div>
                    );
                  })}
                  {/* {
                    this.props.opp_key !== 'containerOpportunities' &&
                    <section
                      style={{ marginTop: "20px", marginLeft: "10px" }}
                      className="best-cont"
                    >
                      <div className="partner-best-box-grand">GRAND TOTAL</div>
                      <div className="partner-cont-bid-box">
                        <div className="partner-total-price-bid">{totalProposedVolume}</div>
                        <div style={{marginLeft:"27%"}} className="partner-per-cont">{amountToShortString(totalProposedAmount, true)} </div>
                        <div style={{marginLeft:"30%"}} className="partner-per-cont">{amountToShortString(totalEnteredBidAmount, true)}</div>

                      </div>
                    </section>
                  } */}
              </div>
              <div>
                {this.props.isFromEdit  && <button
                  className="partner-btn-submit-save"
                  onClick={() => this.bidSubmissionStarted("SAVE")}
                  disabled={!allBidsEntered}
                  style={!allBidsEntered ? {opacity:"50%" } :null}
                >
                  SAVE
                </button>}
                <div style={this.props.isFromEdit === false ? {marginLeft: "295px"} :{display: "contents"} }>
                  <button
                    className="partner-btn-submit"
                    onClick={() => this.bidSubmissionStarted("UPDATE_BID")}
                    disabled={!allBidsEntered}
                    style={!allBidsEntered ? {opacity:"50%" } :null}
                  >
                    {this.props.isFromEdit ? "RE-SUBMIT" : "SUBMIT"}
                  </button>
                  <button className="cancel-btn" onClick={this.bidModalCanceled}>
                    CANCEL
                  </button>
                </div>
                {this.props.isFromEdit && <button className="cancel-btn" 
                  style={{marginLeft: "20px"}} 
                  onClick={() => this.bidSubmissionStarted("DISCARD")}
                >
                  DISCARD CHANGES
                </button>}
              </div>
            </div>
          ) : this.state.modalView ===
            OPPORTUNITY_MODAL_VIEW.PortAdditionalCharges ? (
            // <ReactModal
            //   isOpen={true}
            //   contentLabel="onRequestClose Example"
            //   onRequestClose={this.props.handleCloseModal}
            //   className="Modal !important"
            //   overlayClassName="Overlay"
            // >
            <LaneAdditionalCharges2
              // **********************   Properties **************************
              isOpen={true}
              // bidAdditionalChargeHandler={this.bidAdditionalChargeHandler}
              opportunityId={this.props.opportunityId} // Opportunity which has opened for display in this modal
              // additionalCharges={this.props.additionalCharges} // Additional charges accumuated so far this opporunity
              partnerId={this.props.partnerId} // Drayage partner id for this app
              sourcePort={this.state.sourcePortCodeForAdditionalCharge} // Source port which has been selected for additional charge addition
              destinationName={this.props.destinationName} // destination name which has been opened for additional charge addition
              opportunityPortsData={opportunityPortsData} // Ports data for opportunity which contains bid and additional charge info
              fromLaneBidCard={false}
              sourcePortName={this.state.selectedSourcePortName}
              selectedAddress={this.state.addressName}
              standardPartnerAdditionalCharges={
                this.props.standardPartnerAdditionalCharges
              } // Standard partner additional charges feteched from BE
              // key={Date.now()}
              additionalCharges={
                additionalCharges ? Array.from(additionalCharges.values()) : []
              }
              // **********************   Methods **************************
              additionalChargeDoneHandler={
                //Handler when additional charge addition is done
                this.additionalChargeDoneHandler
              }
              setAdditionalChargesInStore={
                //Handler to send additional charge to redux store
                this.props.setAdditionalChargesInStore
              }
              additionalChargeCancelHandler={
                //Handler when cancel button on additional charge is clicked
                this.additionalChargeCancelHandler
              }
            />
          ) : // </ReactModal>
          this.state.modalView === OPPORTUNITY_MODAL_VIEW.AdditionalCharges ? (
            // <ReactModal
            //   isOpen={true}
            //   contentLabel="onRequestClose Example"
            //   onRequestClose={this.props.handleCloseModal}
            //   className="Modal !important"
            //   overlayClassName="Overlay"
            // >
            <LaneAdditionalCharges2
              // **********************   Properties **************************
              isOpen={true}
              // bidAdditionalChargeHandler={this.bidAdditionalChargeHandler}
              opportunityId={this.props.opportunityId} // Opportunity which has opened for display in this modal
              // additionalCharges={this.props.additionalCharges} // Additional charges accumuated so far this opporunity
              partnerId={this.props.partnerId} // Drayage partner id for this app
              sourcePort={this.state.sourcePortCodeForAdditionalCharge} // Source port which has been selected for additional charge addition
              sourcePortName={this.state.selectedSourcePortName}
              selectedAddress={this.state.addressName}
              laneId={this.state.selectedLaneId}
              destinationName={this.props.destinationName} // destination name which has been opened for additional charge addition
              opportunityPortsData={opportunityPortsData} // Ports data for opportunity which contains bid and additional charge info
              fromLaneBidCard={true}
              additionalCharges={
                additionalCharges ? Array.from(additionalCharges.values()) : []
              }
              standardPartnerAdditionalCharges={
                this.props.standardPartnerAdditionalCharges
              } // Standard partner additional charges feteched from BE
              // key={Date.now()}

              // **********************   Methods **************************
              additionalChargeDoneHandler={
                //Handler when additional charge addition is done
                this.additionalChargeDoneHandler
              }
              setAdditionalChargesInStore={
                //Handler to send additional charge to redux store
                this.props.setAdditionalChargesInStore
              }
              additionalChargeCancelHandler={
                //Handler when cancel button on additional charge is clicked
                this.additionalChargeCancelHandler
              }
            />
          ) : // </ReactModal>
          this.state.modalView === OPPORTUNITY_MODAL_VIEW.LaneBidCard ? (
            <LaneBidCard
              // **********************   Properties **************************
              isOpen={true}
              opportunityId={this.props.opportunityId}
              // openedLaneData={this.state.openedLaneData}
              // isOpen={this.state.showLaneBidCard}
              // bidAdditionalChargeHandler={this.bidAdditionalChargeHandler}
              
              partnerId={this.props.partnerId}
              standardPartnerAdditionalCharges={
                // Standard partnet charges feteched from BE
                this.props.standardPartnerAdditionalCharges
              }
              opp_key={this.props.opp_key}
              destinationName={this.state.selectedDestinationName} // Destination lane name which opened for filling bid info
              sourcePort={this.state.selectedSourcePort} // Source port  opened for lane display
              sourcePortName={this.state.selectedSourcePortName} // Source port name opened for lane display

              sourcePortCode={this.state.selectedPortCode} // Source port code opened for lane display
              selectedAddress={this.state.addressName}
              laneId={this.state.selectedLaneId} // Destination lane id which opened for filling bid info
              warehouseAppointment={this.state.selectedwarehouseAppointment} // Destination lane id  warehouse appointment status
              containerLoadType={this.state.selectedContainerLoadType}
              containerType={this.state.selectedContainerType}
              selectedDestinationLaneData={
                this.state.selectedDestinationLaneData
              } // TBD : Why do we need this?
              key={this.props.opportunityId}
              additionalCharges={additionalCharges} // Additional charge for this lane
              expirationDate={thisOpportunityData.opportunityExpiryDate}
              knStandardFuelPercent={thisOpportunityData.knFuelPercent}
              // **********************   Method **************************

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
              individualBidDoneHandler={
                //When DONE for a given bid for given lane is clicked, this is lhe local function to change the view
                this.individualBidDoneHandler
              }
              individualBidCancelHandler={
                //When CANCEL for a given bid for given lane is clicked, this is lhe local function to change the view
                this.individualBidCancelHandler
              }
              additionalChargeClickHandler={
                //Local function called when ADD is clicked for additiona charge for a LANE
                this.additionalChargeClickHandler
              }
            />
          ) : this.state.modalView ===
            OPPORTUNITY_MODAL_VIEW.ConfirmationForSubmit ? (
            <ModalConfirm
            {...this.props}
              bidSubmissionConfirmed={this.bidSubmissionConfirmed}
              bidSubmissionCanceled={this.bidSubmissionCanceled}//
              opportunityId={this.props.opportunityId}
              selectedSourcePortCode={this.state.selectedPortCode} 
              selectedSourcePortName={this.state.selectedSourcePortName}
              destinationName={this.state.selectedDestinationName}
              totalEnteredBidAmount={totalEnteredBidAmount}
              totalProposedVolume={totalProposedVolume}
              bidOperationType={this.state.bidOperationType}
              isFromEdit= {this.props.isFromEdit}


              

             
            />
          ) : this.state.modalView ===
            OPPORTUNITY_MODAL_VIEW.SuccessfulSubmission ? (
            <Success
              bidAfterSubmitDoneHandler={this.bidAfterSubmitDoneHandler}
              style={{marginLeft:"160px"}}
              isFromEdit= {this.props.isFromEdit}
              bidOperationType={this.state.bidOperationType}
            />
          ) : this.state.modalView ===
            OPPORTUNITY_MODAL_VIEW.FailureSubmission ? (
            <Failure
              bidAfterSubmitDoneHandler={this.bidAfterSubmitDoneHandler}
            />
          ) : null}
        </ReactModal>
      </div>
    );  
  }
}

import React, { Component } from "react";
import PortOpportunity from "./PortOpportunity";
import BidModal from "./BidModal";
// import "./partner-styles.scss";
import LaneBidCard from "./LaneBidCard";
import { SELECTED_TABS, OpportunityOpenedCommon, DRAYAGE_APP } from "KN-Drayage-UI";


export default class OpportunityOpened extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // showModal: false,
      showCard: false,
      showLaneBidCard: false,
      showAddCard: false,
      selectedPortCode : "",
      selectedSourcePort : "",
      selectedSourcePortName:"",
      selectedDestinationName : "",
      selectedLaneId : "",
      selectedDestinationLaneData :"",
      // selectedPortId: "",
      // selectedLaneDestination: "",
      // selectedPortName: "",
      // selectedDestination: "",
      total: "800",
      
      isPort: false,
      opportunityDetails: {},

      // opportunityPortsData: [],
      destinationData: "",
      showPortWiseBidModal: false,

      /*
       * Opened landBidCard
       */
      openedLanePortId : "",
      openedLaneDestination : "",
      openedLaneData : "",
    };
  }

  onArrowClick = () => {
    console.log("oArrowClick : ", this.state.showCard);
    this.setState({ showCard: !this.state.showCard });
  };

  addClickHandler = () => {
    this.setState({ showAddCard: true });

  };
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
      showPortWiseBidModal: false,
      showLaneBidCard: true,
      selectedPortCode: portId,
      selectedSourcePort: sourcePort,
      selectedDestinationName: destinationName,
      selectedLaneId: selectedLaneId,
      selectedSourcePortName: sourcePortName,
      selectedDestinationLaneData : destinationData,
    });
  };
  
  individualBidDoneHandler = () => {
      this.setState({showLaneBidCard:false, showPortWiseBidModal:true})
  }

  individualBidCancelHandler = () => {
    this.setState({showLaneBidCard:false, showPortWiseBidModal:true})
}

  
  bidAdditionalChargeHandler = (portId, destination, additionalCharges) => {

  }
  
  changeHandler = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  portAddClickHandler = (portId, portName) => {
    this.setState({
      selectedPortCode: portId,
      selectedPortName: portName,
      isPort: true,
      showBidCard: false,
    });
  };

  handleOpenPortWiseModal = () => {
    console.log("handleOpenPortWiseModal : called")
    this.setState({ showPortWiseBidModal: true });
  };

  handleClosePortWiseModal = () => {
    this.setState({ showPortWiseBidModal: false });
  };

  componentDidMount = () => {
    console.log("oppor id", this.props.opportunity.opportunityId);
    // this.getOpportunityDetailsData(this.props.opportunity.opportunityId);
  };

  

  render() {
    //const { data, header } = this.props;
    console.log("opp source port",this.state.selectedSourcePort)
    console.log("opportunity opened",this.props)
    console.log("modal", this.state.showModal);
    console.log("all vol", this.state.opportunityDetails["grandTotalVolume"]);
     
    let grandTotalVol = this.state.opportunityDetails["grandTotalVolume"];
    let grandTotalAmount = this.state.opportunityDetails["grandTotalAmount"];
    let opportunityExpiryDate=this.state.opportunityDetails["opportunityExpiryDate"]
    let  expirationDate = parseInt(opportunityExpiryDate);
     expirationDate = moment.utc(moment(expirationDate).utc()).toDate(); //converting epoch to date object in UTC

   
     expirationDate =  expirationDate.toLocaleDateString("en-US", options).toUpperCase();
    
   

    grandTotalAmount =
      grandTotalAmount > 1000000
        ? grandTotalAmount / 1000000 + "M"
        : grandTotalAmount;

    console.log("OpportunityOpened :: props", this.props)    
    let thisOpportunityData =   this.props.opportunityData.get(this.props.opportunity.opportunityId)  
    console.log("OpportunityOpened data for this id : ", thisOpportunityData.portData,   typeof(thisOpportunityData))  
    // console.log(
    //   "OpportunityOpened page : ",
    //   this.state.opportunityPortsData,
    //   this.state.opportunityPortsData ? Array.from(this.state.opportunityPortsData.keys()) : ""
    // );

    // console.log("OpportunityOpened : Port data ", this.state.opportunityPortsData, this.props.opportunity.portData)

    let headers = []
    return (
      <div>
        <OpportunityOpenedCommon {...this.props} thisOpportunityData={thisOpportunityData} 
        drayageApp={DRAYAGE_APP.KLEARDRAY_PARTNER}
        handleOpenPortWiseModal={this.handleOpenPortWiseModal}
        />
        
        {/* {this.props.tab === SELECTED_TABS.NEW && (
            <div className="action-btn">
              <div>
                <button
                  className="bid-btn"
                  onClick={(e) => {
                    this.handleOpenPortWiseModal();
                  }}
                >
                  BID
                </button>
                <button className="decline-btn">DECLINE</button>
              </div>
            </div>
          )} */}

            
        {/* <div>
          {thisOpportunityData &&
            thisOpportunityData.portData &&
            Array.from(thisOpportunityData.portData.keys()).map((portId) => {
              console.log(
                "OpprtunitiesOPened page : port ",
                portId,
                thisOpportunityData.portData.get(portId)
              );
              return (
                <PortOpportunity
                  portData={thisOpportunityData.portData.get(portId)}
                  additionalCharges={this.props.additionalCharges}
                  partnerId={this.props.partnerId}
                  tab={this.props.tab}
                />
              );
            })}
        </div>
        <div className="grand-action">
          <div className="grand-total-wrapper">
            <div className="grand-total"> Grand Total</div>
            <div className="grand-cont">{grandTotalVol}</div>
            <div className="grand-price">{grandTotalAmount}</div>
          </div>

          {this.props.tab === SELECTED_TABS.NEW && (
            <div className="action-btn">
              <div>
                <button
                  className="bid-btn"
                  onClick={(e) => {
                    this.handleOpenPortWiseModal();
                  }}
                >
                  BID
                </button>
                <button className="decline-btn">DECLINE</button>
              </div>
            </div>
          )}
        </div> */}

        <BidModal
          isOpen={this.state.showPortWiseBidModal}
          opportunityId={this.props.opportunity.opportunityId}
          handleCloseModal={this.handleCloseModal}
          handleClosePortWiseModal={this.handleClosePortWiseModal}
          // opportunityPortsData={this.state.opportunityPortsData}
          opportunityData={this.props.opportunityData}
          opportunityPortsData={
            thisOpportunityData.portData
              ? thisOpportunityData.portData
              : new Map()
          }
          individualBidClickHandler={this.individualBidClickHandler}
          additionalCharges={this.props.additionalCharges}
          partnerId={this.props.partnerId}
          setAdditionalChargesInStore={this.props.setAdditionalChargesInStore}
          standardPartnerAdditionalCharges={
            this.props.standardPartnerAdditionalCharges
          }
          submitOpportunityBidData={this.props.submitOpportunityBidData}
        />

        <LaneBidCard
          opportunityId={this.props.opportunity.opportunityId}
          openedLaneData={this.state.openedLaneData}
          isOpen={this.state.showLaneBidCard}
          bidAdditionalChargeHandler={this.bidAdditionalChargeHandler}
          additionalCharges={this.props.additionalCharges}
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
          key={Date.now()}
          expirationDate={expirationDate}
        />
      </div>
    );
  }
}

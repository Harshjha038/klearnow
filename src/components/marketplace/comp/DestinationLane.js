import React, { Component } from "react";
// import exporter from "../images/exporter";
// import LaneBidCard from "./LaneBidCard";
 import {Popup }from  "semantic-ui-react"
import {get} from "lodash" 
import {amountToShortString, extractAddressToDisplay, amountToCommaSeparated, amountToTwoDecimal} from "KN-Drayage-UI"

export default class DestinationLane extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bidData : {}
    };
  }
  

  render() {
    console.log(
      "DestinationLane :: props",
      this.props,
      typeof this.props.destinationData
    );

    //this.props.destinationData
    // baseFees: "600"
    // chasisRentalperday: "12"
    // fuelCharges: "2"
    // minReqDays: "12"
    //bidBaseTotal
    //let bidBaseTotal = get(this.props, "destinationData.destinationBidData.bidBaseTotal",  null)
    let bidBaseTotal = get(this.props, "destinationData.destinationBidData.laneAmount", null)
    
     

    const { destinationData } = this.props;
    let destinationName = destinationData.destinationId;
    let destinationApproxVolume = destinationData.approxVolume;
    //console.log("destinationApproxVolume",destinationApproxVolume)
    let destinationProposedBid  = destinationData.proposedBid//amountToTwoDecimal(destinationData.proposedBid,true);
    //console.log("destinationProposedBid1",destinationProposedBid)
    destinationProposedBid= destinationProposedBid ? amountToTwoDecimal(destinationProposedBid,true):""
    //console.log("destinationProposedBid2",destinationProposedBid)
    
    let totalPrice = parseInt(destinationApproxVolume) * destinationProposedBid;
    let portId= destinationData.sourcePortCode
    let sourcePortCode = destinationData.sourcePortCode
    let sourcePortName= destinationData.sourcePort
    let laneId = destinationData.laneId
    //let sorcePortName=destinationData.sourcePortName
    let destinationAddressName = destinationData["destinationAddress"].addressName.value
    destinationAddressName = destinationAddressName ?  destinationAddressName.toUpperCase() : "TBD"
    // destinationAddressName= !destinationAddressName ?"TBD":destinationAddressName
    //containerLoadType: "LCL"
//containerType: "ty1"
   
   let containerLoadType= destinationData.containerLoadType
   let containerType= destinationData. containerType
   let warehouseAppointment=destinationData.warehouseAppointment
    
    console.log("destinationAddressName",destinationAddressName )
    let totalLaneBidPrice=bidBaseTotal *destinationApproxVolume
    console.log("totalLaneBidPrice",totalLaneBidPrice)

    let addressInfo = get(destinationData, "destinationAddress.address.values", [])
    
    let addressName = extractAddressToDisplay(addressInfo)
    console.log("addressName",addressName)

    let totalPriceBidLane= parseFloat(totalLaneBidPrice).toFixed(2)
    // totalPriceBidLane=parseFloat(totalPriceBidLane).toFixed

    // totalPrice = totalPrice > 1000 ? totalPrice / 1000 + "K" : totalPrice;
    let bidClickHandler = (baseFee, fuelCharge, chasisRentla, additionalCharges) => {
     
        this.props.individualBidClickHandler(destinationData.laneId,destinationData.sourcePortCode,destinationData.destinationId,sourcePortName,containerLoadType,containerType,warehouseAppointment,addressName)
        let bidData = {baseFee, fuelCharge, chasisRentla, additionalCharges,}  
        this.setState({
            bidData: bidData
        });
      };
 


  let splitForTooltip = (name) => {
    if (!name) return "TBD";

    let firstPart = name.substring(0, 12);

    return (
      <>
        {firstPart}
        {name.length > 12 ? (
          <Popup
            content={name}
            trigger={
              <b>
                <a style={{ color: "#0A8B8F",  }}>
                  {"  "} ...
                </a>
              </b>
            }
          />
        ) : (
          ""
        )}
      </>
    );
  };


    return (
      <div  >
        {!this.props.isOpen ? (
          <div>
            <div   className="data-wrapper">
              <div className="first-col">
                <div className="small-text left">TO:</div>
                <div>
                  <img
                    style={{ marginLeft: "-26px" }}
                    className="warehouse-img"
                    src="images/files/warehouse.svg"
                  />
                </div>
                <div style={{fontSize:"18px",fontWeight:"bold"}} className="portName-text">
                  {splitForTooltip(addressName)}
                </div>
              </div>
              <div className="sec-col">
                <div className="cont-num ">{destinationApproxVolume}</div>
              </div>

              <div className="third-col">
                {/* <div className="price">${destinationProposedBid } </div> */}
                <div className="price-total">{destinationProposedBid}</div>

              </div>
              <div className="fourth-col">
                {/* <div className="price-total">{amountToTwoDecimal(totalPrice, true)}</div> */}
                <div className="price-total">{amountToTwoDecimal(destinationProposedBid, true)}</div>
              </div>
            </div>
          </div>
        ) : (
          <div >
            <div className={bidBaseTotal ? "partner-bid-body-header partner-bid-body-data bid-done" : "partner-bid-body-header partner-bid-body-data bid-not-done"}>
              <div className="partner-bid-empty">
               
                  
                 {this.props.isFromEdit?<img onClick={() => {
                  this.props.individualBidClickHandler(
                    portId,
                    sourcePortCode,
                    destinationAddressName,
                    laneId,
                    sourcePortName,
                    destinationData,
                    "",
                    "",
                    "",
                    addressName
                  );
                }} src="images/files/edit.svg" className="partner-warehouse-img"/> :<img src="images/files/warehouse.svg" className="partner-warehouse-img"/>}
              
              </div>

              <div className="partner-bid-dest partner-sec-col-header-bid-text-data-row">
                {/* <div style={{ marginTop: "-7px", textAlign:"left",paddingLeft:"10px"}} className="small-text ">
                  TO:
                </div> */}
                <div className="portName-text-bid ">
                  {splitForTooltip(addressName)}
                </div>
              </div>

              {/* <div className="partner-approx-bid">
                <div className="partner-sec-col-header-bid-text partner-sec-col-header-bid-text-data-rows">
                  {destinationApproxVolume}
                </div>
              </div> */}

              <div className="partner-approx-bid-two">
                <div className="partner-sec-col-header-text-bid partner-sec-col-header-bid-text-data-rows">
                {/* {destinationProposedBid > 0 ? "$" + destinationProposedBid :"" }  */}
                {destinationApproxVolume} 
                </div>
              </div>
              <div className="partner-approx-bid-three">
                <div className="partner-sec-col-header-text-bid partner-sec-col-header-bid-text-data-rows">
                {destinationProposedBid} 
                </div>
              </div>
              <div className="partner-approx-bid-five partner-approx-bid-five-data" style={bidBaseTotal ? {backgroundColor:"#1158BA"}: null}>
                {/* <button onClick={() => { this.props.portDestinationBidHandler(portId,sourcePort,destinationName, this.state.bidData) }} className="bid-price">BID </button> */}
                {!bidBaseTotal ? <button
                  onClick={() => {
                    this.props.individualBidClickHandler(
                      portId,
                      sourcePortCode,
                      destinationAddressName,
                      laneId,
                      sourcePortName,
                      destinationData,
                      "",
                      "",
                      "",
                      addressName,
                    );
                  }}
                  className="partner-bid-price"
                >
                BID
                </button> : 
                <div 
                onClick={() => {
                  this.props.individualBidClickHandler(
                    portId,
                    sourcePortCode,
                    destinationAddressName,
                    laneId,
                    sourcePortName,
                    destinationData,
                    "",
                    "",
                    "",
                    addressName
                  );
                }}
                className="partner-approx-bid-five-data2"> {amountToTwoDecimal(bidBaseTotal, true)} </div>
                }
              </div>
              {/* <div className="partner-bid-best-your partner-sec-col-header-bid-text-data-rows">
                {(amountToShortString(totalPriceBidLane, true))}
              </div> */}
            </div>
          </div>
        )}
      </div>
    );
  }
}

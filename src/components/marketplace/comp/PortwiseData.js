import React, { Component } from "react";
import { SELECTED_TABS, BidModalTopLine, amountToShortString,amountToTwoDecimal } from "KN-Drayage-UI";
import DestinationLane from "./DestinationLane";
import { times } from "lodash-es";
import { OPPORTUNITY_MODAL_VIEW } from "../util";
import {Popup }from  "semantic-ui-react"
import {get} from "lodash"

export default class PortwiseData extends Component {
  constructor(props) {
    super(props);
    this.state = {
      submitBidConfirmed: false,
    };
  }

  render() {
    console.log("PortwiseData :: ", this.props);
//     chargeName: "Chassis Rental"
// glCode: 60001
// reqQuantityUsed: "1"
// unitMeasurement: "DAY"
// unitPrice: 35
let splitForTooltip = (name) => {
  if (!name) return "TBD";

  let firstPart = name.substring(0, 15);

  return (
    <>
      {firstPart}
      {name.length > 15 ? (
        <Popup
          content={name}
          trigger={
            <b>
              <a style={{ color: "#0A8B8F", marginTop: "-80px" }}>
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

    // let additionalCharges = this.props.additionalCharges ? this.props.additionalCharges : new Map()
    let totalAdditionalCharges = this.props.portData.totalPortAdditionalCharges
    // for (let [key, charge] of additionalCharges) {
    //     if (charge.reqQuantityUsed && charge.reqQuantityUsed.length  > 0) {
    //       totalAdditionalCharges += charge.unitPrice*parseInt(charge.reqQuantityUsed)
    //     }
    // }
    totalAdditionalCharges = amountToTwoDecimal(totalAdditionalCharges, true)

    let getTotalVolume = () => {
      let totalVolume = 0;

      for (let i = 0; i < this.props.portData.destinations.length; i++) {
        let cont = this.props.portData.destinations[i].approxVolume;
        totalVolume += cont;
        console.log("Cont", cont);
      }
      console.log("totalvol", totalVolume);
      return totalVolume;
    };
    let totalVol = getTotalVolume();
    console.log("totalvol", totalVol);
    let totalBussiness = () => {
      let total = 0;
     

      for (let i = 0; i < this.props.portData.destinations.length; i++) {
        let cont = this.props.portData.destinations[i].approxVolume;
          let price = this.props.portData.destinations[i].proposedBid;
         
        
          total = total + cont * price;
        
       
      }
      return total;
    };
    let totalBuss = totalBussiness();
    // totalBuss = totalBuss > 1000000 ? totalBuss / 1000000 + "M" : totalBuss;
    let sourcePort=get(this.props, "portData.sourcePort", "").toUpperCase()
    let totalEnteredBusiness = 0
    return (
      <div>
        <div className="partner-m-layout">
          <BidModalTopLine
            sourcePort={sourcePort}
            sourcePortCode={this.props.portData.sourcePortCode}
            onArrowClick={this.props.onPortArrowClick}
            isOpen={this.props.isOpen}
          />

          {this.props.isOpen && (
            <div>
              <div  className="partner-bid-body-header partner-bid-body-bottom" >
                <div className="partner-bid-empty"></div>

                <div className="partner-bid-dest">Destinations</div>
                {/* <div className="bid-oppor ">Opportunity/month</div>
                                                            <div className= "bid-suggest">Suggested Bid</div> */}
                <div className="partner-approx-bid">
                  <div className="partner-sec-col-header-bid-text  ">
                    {
                      this.props.opp_key !== "containerOpportunities" ? 
                      "Approx Volume"
                      :
                      "Volume"
                    }
                    
                  </div>
                  <div className="partner-lower">{ this.props.opp_key !== "containerOpportunities" && "Cont.Per Month"}</div>
                </div>
                <div className="partner-approx-bid-two">
                  <div className="partner-sec-col-header-bid-text  ">
                    Suggested Bid
                  </div>
                  <div className="partner-lower">Per Cont.</div>
                </div>
                {/* <div className="partner-approx-bid-three">
                  <div className="partner-sec-col-header-bid-text  ">
                    Approx Total
                  </div>
                  <div className="partner-lower">Business</div>
                </div> */}

                {/* {this.props.tab === SELECTED_TABS.SUBMITTED ? <div> Submitted</div> : null}                                             */}

                <div className="partner-approx-bid-five">
                  <div className="partner-bid-best">Your Best Bid</div>
                  <div
                    style={{marginTop:"-2px",paddingRight: "60px" }}
                    className="partner-lower"
                  >
                    Per Cont.
                  </div>
                </div>
                {/* <div className="partner-bid-best-your">Your Best Bid Total</div> */}
              </div>

             <div className="partner-lanes-wrapper">                       
              {this.props.portData.destinations &&
                this.props.portData.destinations.map((destinationData) => {
                  console.log(
                    "destination data from port oppor",
                    destinationData
                  );
                  if (destinationData.destinationBidData) {
                    totalEnteredBusiness += parseInt(destinationData.destinationBidData.bidBaseTotal)*parseInt(destinationData.approxVolume)
                  }

                  return (
                    <DestinationLane
                      destinationData={destinationData}
                      totalVol={totalVol}
                      isOpen={this.props.isOpen}
                      individualBidClickHandler={
                        this.props.individualBidClickHandler
                      }
                      additionalCharges={this.props.additionalCharges}
                      partnerId={this.props.partnerId}
                      opp_key={this.props.opp_key}
                      isFromEdit={this.props.isFromEdit}
                    />
                  );
                })}
              </div>            

              {/* <div className="partner-bid-body-header">
                <div className="partner-bid-empty"></div>

                <div className="partner-bid-dest ">
                  <div className="portName-text-bid ">TOTAL</div>
                </div>

                <div className="partner-approx-bid">
                  <div className="partner-sec-col-header-bid-text partner-sec-col-header-bid-text-data-rows">
                    {totalVol}
                  </div>
                </div>

                <div className="partner-approx-bid-two">
                  <div className="partner-sec-col-header-text-bid partner-sec-col-header-bid-text-data-rows"></div>
                </div>
                <div className="partner-approx-bid-three">
                  <div style={{paddingTop:"6px"}} className="partner-sec-col-header-text-bid partner-sec-col-header-bid-text-data-rows">
                    {amountToShortString(totalBuss, true)}
                  </div>
                </div>
                <div className="partner-approx-bid-five">
                </div>
                <div className="partner-bid-best-your partner-sec-col-header-bid-text-data-rows">
                  {amountToShortString(totalEnteredBusiness,true)}
                </div>
              </div> */}

              {/* <div className="partner-indiv-total-wrapper">
                <div
                  className="partner-indiv-total"
                >
                  Total
                </div>
                <div  className="partner-total-cont">
                  {totalVol}
              </div>
                <div
                  style={{  marginTop: "4px",marginLeft:"15px" }}
                  className="partner-total-indiv-sum"
                >
                  ${totalBuss}
                </div>
              </div> */}

              <div className="partner-pot-add">
                <div className="partner-pot-text">
                  POTENTIAL ADDITIONAL CHARGES
                </div>
                <div
                  className="partner-add"
                  onClick={(e) => {
                    this.props.additionalChargeClickHandler(
                      this.props.portData.sourcePortCode,
                      OPPORTUNITY_MODAL_VIEW.PortAdditionalCharges
                    );
                  }}
                >
                  {" "}
                  {totalAdditionalCharges != "$0" ? <div className="pot-charge-btn"> {totalAdditionalCharges ? totalAdditionalCharges : "ADD"} </div>
                  :<div className="pot-add-btn"> ADD </div>
                  }
                  
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}

import React, { Component } from "react";
import exporter from "../images/exporter";
import DestinationLane from "./DestinationLane";

export default class PortOpportunity extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    console.log("Port Opportunity : ", this.props.portData,typeof(this.props.portData));
    console.log("Port Opportunity dest : ", this.props.portData.destinations);
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
    let totalBussiness=()=>{
       let total= 0;
       
       for(let i=0;i<this.props.portData.destinations.length; i++){
        let cont = this.props.portData.destinations[i].approxVolume;
        let price=  this.props.portData.destinations[i].proposedBid;
         total= total+cont*price
         

       }
       return total


    }
     let totalBuss= totalBussiness()
    totalBuss = totalBuss > 1000000 ? totalBuss / 1000000 + "M" : totalBuss;
    let sourcePort= (this.props.portData.sourcePort).toUpperCase()
    let tab = this.props.tab
    let className = "content-open"
    if (tab === "Submitted")  {
      className = "content-open submitted"
    }
     return (
      <div>
        <div className={className}>
          <div className="data-header">
            <div>
              <div className="small-text">FROM</div>
              <div>
                <img className="anchor-img" src="images/files/anchor.svg" />
              </div>

              <div className="party-name">{sourcePort}</div>
            </div>
            <div className="oppor-header-sec">
              <div className="sec-col-header-text  ">APPROX VOLUME</div>
              <div className="lower ">Cont.Per Month</div>
            </div>
            <div>
              <div className="sec-col-header-text  ">SUGGESTED BID</div>
              <div className="lower ">Per Cont.</div>
            </div>

            <div>
              <div className="third-col-header-text">Approx Total Business</div>
            </div>

            {tab === "Submitted" && <div>
                <div className="third-col-header-text">Submitted Bid </div>
              </div>
            }


          </div>
          <div>
            {" "}
            {this.props.portData.destinations &&
              this.props.portData.destinations.map((destinationData) => {
                console.log(
                  "destination data from port oppor",
                  destinationData
                );

                return (
                  <DestinationLane
                    destinationData={destinationData}
                    totalVol={totalVol} 
                    totalBuss={totalBuss}
                    tab={this.props.tab}
                    
                  />
                );
              })}
          </div>
          <div className="indiv-total-wrapper">
          <div className="indiv-total">Total</div>
          <div className="total-cont">{totalVol}</div>
          {/* <div className="total-price">{this.state.header.totalPrice}</div> */}
          <div className="total-indiv-sum">{parseFloat(totalBuss).toFixed}</div>
        </div>
        
 
           
        </div>
       
       
      
      </div>
    );
  }
}

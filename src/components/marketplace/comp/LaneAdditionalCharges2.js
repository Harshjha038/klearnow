import React from "react";
//import {Header, Icon} from 'semantic-ui-react';
import {get} from "lodash"
import {totalAdditionalCharge,splitForTooltip} from "../util/index"
import ReactModal from "react-modal";
import "./styles.scss";
import { add } from "date-fns";


class LaneAdditionalCharges2 extends React.Component {
  constructor(props) {
    super(props);
    let chargesMap = new Map();
    let checkedCharges = {};

    console.log(
      "this.props.additionalCharges : ",
      this.props.standardPartnerAdditionalCharges,
      this.props.additionalCharges
    );

    // let standardPartnerAdditionalCharges = []
    // if (this.props.standardPartnerAdditionalCharges) {
    //   standardPartnerAdditionalCharges = this.props.standardPartnerAdditionalCharges
    // }

    // let existingAdditionalChargesChecked = {}
    // for (let charge of this.additionalCharges) {
    //   existingAdditionalChargesChecked[charge.glCode] = charge.reqQuantityUsed && charge.reqQuantityUsed.length > 0
    // }
    let additionalCharges = this.props.additionalCharges;
    if (!additionalCharges || additionalCharges.length == 0) {
      additionalCharges = this.props.standardPartnerAdditionalCharges;
    }

    if (additionalCharges) {
      for (let charge of additionalCharges) {
        chargesMap.set(charge.glCode, { ...charge });
        checkedCharges[charge.glCode] =
          charge.reqQuantityUsed && charge.reqQuantityUsed > 0;
      }
    }

    console.log("this.props.additionalCharges : checkedCharges :: ", checkedCharges)

    let grandTotal = 0;

    this.state = {
      showModal: this.props.showBidCard,
      additionalCharges: additionalCharges,
      chargesMap: chargesMap,
      grandTotal: grandTotal,
      checkedCharges: checkedCharges,
    };
  }
  handleOpenModal = () => {
    this.setState({ showModal: true });
  };

  handleCloseModal = () => {
    this.setState({ showModal: false });
  };

  onChange = (e) => {
    console.log("AA", this.state.chargesMap);
    let aa = this.state.chargesMap;
    console.log(
      "AA :: ",
      this.state.chargesMap.get(parseInt(e.target.id)),
      e.target.glCode
    );
    let chargesMap = this.state.chargesMap;
    let chargeForGlCode = chargesMap.get(parseInt(e.target.id));

    console.log("pre", e.target.value);
    console.log("first", chargeForGlCode);
    chargeForGlCode.reqQuantityUsed = e.target.value;


    this.setState({
      chargesMap: chargesMap,
      [e.target.glCode]: e.target.value,
    });
    console.log("new chargemap :: ", this.state.chargesMap);
  };
  unitPriceChangeHandler=(e)=>{
    e.preventDefault()
    let chargesMap= this.state.chargesMap
    console.log("unitPriceChangeHandler :: unit price chargesMap 1",chargesMap)
    let chargeForGlCode= chargesMap.get(parseInt(e.target.id))
    console.log("unitPriceChangeHandler :: unit price",chargeForGlCode, e.target.value)
    chargeForGlCode.unitPrice = e.target.value
    chargesMap.set(parseInt(e.target.id), chargeForGlCode)
    console.log("unitPriceChangeHandler :: unit price chargesMap 2",chargesMap)


    this.setState({chargesMap:chargesMap})
  }
  checkboxChangehandler = (e, glCode) => {
    //this.setState({ this.state.checkedCharges[glCode]})
    let checkedCharges = this.state.checkedCharges;
    checkedCharges[glCode] = !checkedCharges[glCode];

    let chargesMap = this.state.chargesMap;
    let chargeForGlCode = chargesMap.get(glCode);
    if (chargeForGlCode && !checkedCharges[glCode]) {
      chargeForGlCode.reqQuantityUsed = "";
      e.target.value = "";
    }

    this.setState({ checkedCharges: checkedCharges, chargesMap: chargesMap });
  };


//   updateHandler=(imo)=>{
//     console.log("updateHandler",imo)
//      let vesselInfo= this.state.vessels.find(vessel=> vessel.carrierIMO ===imo)
//     console.log("VESSELINFO",vesselInfo)
//     let {carrierName, carrierTPId,carrierIMO,carrierFlag,carrierImgMainLoc, carrierMMSI,carrierCallSign,voyageNumber}= vesselInfo
//     // console.log("Timezone : ", timezone)
//     if (!carrierName) {
//         carrierName = ""
//     }
    
    
//     if (!voyageNumber) {
//         voyageNumber = ""
//     }
//     this.setState({updatingVessel:true,carrierMMSI,carrierName, carrierTPId,carrierIMO,carrierFlag,carrierImgMainLoc, carrierCallSign,voyageNumber})
// }


  updateHandler=(e,glCode)=>{
    console.log("updateHandler",glCode)
   e.preventDefault()
   let chargesMap = this.state.chargesMap;
    let chargeForGlCode = chargesMap.get(parseInt(e.target.id)); 
    //let a= this.state.chargesMap.find(chargeForGlCode=>chargeForGlCode.glCode ===glCode)

   


  }

  allCheckboxChangehandler = (e) => {
    let checkedCharges = this.state.checkedCharges;
    let chargesMap = this.state.chargesMap;

    
    for (let key of Object.keys(checkedCharges)) {
      console.log("allCheckboxChangehandler :: ",key,  e.target.checked, chargesMap);
      if (!e.target.checked) {
        let chargeForGlCode = chargesMap.get(parseInt(key));
        console.log("allCheckboxChangehandler :: chargeForGlCode", chargeForGlCode);
        if (chargeForGlCode) {
          console.log("allCheckboxChangehandler :: set to 0 ");
          chargeForGlCode.reqQuantityUsed = "";
          e.target.value = "";
        }
      }
      checkedCharges[key] = e.target.checked;
    }
    this.setState({ checkedCharges: checkedCharges, chargesMap: chargesMap });
  };

  render() {
    let grandTotal = 0; //totalAdditionalCharge(this.state.additionalCharges);
    grandTotal = grandTotal;
    // for (let i = 0; i < this.state.additionalCharges.length; i++) {
    //   let total = 0;
    //   let charge = this.state.additionalCharges[i];

    //   console.log("grandTotal charge :", charge);
    //   if (charge.reqQuantityUsed) {
    //     total = parseInt(charge.unitPrice) * parseInt(charge.reqQuantityUsed);
    //     grandTotal += total;
    //   }
    // }

    console.log(
      "charges :",
      this.state.additionalCharges,
      this.state.chargesMap
    ); //array of obj
    // console.log(" charges here",glCodesKeys)
    /*
    document.getElementById('yourBox').onchange = function() {
    document.getElementById('yourText').disabled = !this.checked;
};
<input type="text" id="yourText" disabled />
<input type="checkbox" id="yourBox" />


    */
    /*
     * Get entered additional charges so far
     */

    let additionalCharges = this.props.additionalCharges;
    console.log("additionalCharges", this.state.additionalCharges);
    if (!additionalCharges || additionalCharges.length === 0) {
      additionalCharges = this.props.standardPartnerAdditionalCharges;
    }
    // if (!this.props.fromLaneBidCard) {
    //     let thisPortData = this.props.opportunityPortsData.get(this.sourcePort)
    //     additionalCharges = get(thisPortData, "portAdditionalCharges", additionalCharges)
    // }

    // if (!additionalCharges) {
    //   additionalCharges = []
    // }
    // let m= document.getElementById("box").onchange=function(){
    //   document.getElementById('reqQuantity').disabled = !this.checked;
    // // }

    console.log("LaneAdditionalCharges2 :: ", this.props, this.state);

    let allChecked = true;
    for (let checked of Object.values(this.state.checkedCharges)) {
      if (!checked) {
        allChecked = false;
        break;
      }
    }

    return (
      <div>
        {/* <ReactModal
          isOpen={this.props.isOpen}
          contentLabel="onRequestClose Example"
          // onRequestClose={this.props.handleCloseModal}
          className="partner-modal-first !important"
          overlayClassName="Overlay"
        > */}

        <div style={{ marginLeft: "30px" }} className="bidcard-wrapper">
          <div className="bidcard-header">
            <div style={{ marginLeft: "10px", marginTop: "30px" }}>
              <img
                style={{ marginLeft: "1px" }}
                className="anchor-img"
                src="images/files/anchor.svg"
              />
            </div>
            <div>
              {this.props.fromLaneBidCard && (
                <div
                  style={{ marginTop: "10px", paddingLeft: "10px" }}
                  className="small-text  "
                >
                  FROM
                </div>
              )}

              <div
                style={
                  this.props.fromLaneBidCard
                    ? { paddingLeft: "10px" }
                    : { marginRight: "570px", marginTop: "27px" }
                }
                className="party-name-bid "
              >
                {this.props.sourcePortName &&
                  splitForTooltip(this.props.sourcePortName.toUpperCase())}
              </div>
            </div>
            {this.props.fromLaneBidCard && (
              <div className="general-row">
                <div className="line-drayage"></div>
                <div>
                  <img
                    style={{ marginTop: "38px", width: "20px " }}
                    className="warehouse-img"
                    src="images/files/warehouse.svg"
                  />
                </div>
              </div>
            )}
            {this.props.fromLaneBidCard && (
              <div className="general-col">
                <div style={{ marginTop: "10px" }} className="small-text  ">
                  TO
                </div>
                <div style={{ marginTop: "2.5px" }} className="party-name-bid">
                  {/* {!this.props.isPort ? this.props.selectedDestination : null} */}
                  {splitForTooltip(this.props.selectedAddress)}
                </div>
              </div>
            )}
          </div>

          <div className=" add-head-text">
            {" "}
            {this.props.fromLaneBidCard && "Potential Additional Charges"}
            {!this.props.fromLaneBidCard && (
              <div> Potential Additional Charges </div>
            )}
            {/* {!this.props.fromLaneBidCard && (
              <div>
                {splitForTooltip(this.props.sourcePortName.toUpperCase())}
              </div>
            )} */}
          </div>
          <div className="line-add"></div>

          <div>
            <div className="add-header">
              <div className="title-one">
                <label className="container-drayage">
                  <input
                    className="checker"
                    type="checkbox"
                    id="selectAllBoxes"
                    name="selectAll"
                    value="SelectAll"
                    onChange={(e) => {
                      this.allCheckboxChangehandler(e);
                    }}
                    checked={allChecked}
                  />
                  <span className="checkmark-drayage"> </span>
                </label>
                <label className="select" for="select">
                  Select
                </label>
              </div>
              <div className="title-two">Price Per Unit</div>
              <div className="title-three">Req. Per Unit</div>
              <div className="title-four">Total</div>
            </div>
            <div style={{ marginTop: "-10px" }} className="line-add"></div>
            {additionalCharges && additionalCharges.map((charge) => {
              let chargeName = charge.chargeName;
              console.log("chargeName :", chargeName);

              let unitPrice = "$" + charge.unitPrice;
              console.log("unitPrice :", unitPrice);
            })}

            {additionalCharges && additionalCharges.map((charge) => {
              let chargeName = charge.chargeName;
              console.log("charge details :: ", charge.chargeName, charge);
              let unitPrice = "$" + charge.unitPrice;
              let total = 0;
              let currentChargeForGlCode = this.state.chargesMap.get(
                charge.glCode
              );
              if (
                currentChargeForGlCode &&
                currentChargeForGlCode.reqQuantityUsed
              ) {
                total =
                  parseInt(currentChargeForGlCode.unitPrice) *
                  parseInt(currentChargeForGlCode.reqQuantityUsed);
                grandTotal += parseInt(total);
              }
              console.log(
                "charge details ::",
                charge.unitPrice,
                total,
                currentChargeForGlCode
              );
              return (
                <div>
                  <div className="add-header-wrapper">
                    <div className="add-header-row">
                      <div className="first-box">
                        <label className="container-drayage">
                          <input
                            style={{ border: "1px solid teal" }}
                            // className="checker"
                            type="checkbox"
                            id={"box"}
                            onChange={(e) => {
                              this.checkboxChangehandler(e, charge.glCode);
                            }}
                            checked={this.state.checkedCharges[charge.glCode]}
                          />
                          <span className="checkmark-drayage"> </span>
                        </label>

                        <label className="charges-text" for="chasis">
                          <div>{chargeName}</div>
                        </label>
                      </div>
                      <div className="general-row second">
                        <input
                          className="input-box-small"
                          type="number"
                          id={charge.glCode}  
                          value={currentChargeForGlCode.unitPrice}
                          name="unitPrice"
                          onChange={this.unitPriceChangeHandler}
                        />
                        <div
                          style={{ marginLeft: "10px" }}
                          className="per-day-box"
                        >
                          {charge.unitMeasurement}
                        </div>
                      </div>
                      <div>
                        <input
                          stle={
                            !this.state.checkedCharges[charge.glCode]
                              ? { border: "none" }
                              : { border: "1px  solid #008B8F" }
                          }
                          className="  input-box-small third "
                          id={charge.glCode}
                          type="number"
                          value={parseInt(currentChargeForGlCode.reqQuantityUsed)}
                          onChange={this.onChange}
                          min="1"
                          step="1"
                        

                          disabled={!this.state.checkedCharges[charge.glCode]}
                        />
                      </div>
                      <div className="per-day-box fourth">{total}</div>
                    </div>
                  </div>

                  <div className="line-add"></div>
                </div>
              );
            })}

            {/* <div className="line-add"></div> */}
          </div>
          <div
            style={{ border: "none", marginTop: "-10px" }}
            className="line-two"
          ></div>
          {/* <div className="add-additional">ADD ADDITIONAL </div> */}
          <section className="best-cont">
            <div  className="best-box-add">
              TOTAL ADDITIONAL CHARGES
            </div>
            {/* <div>This will add to your total bid</div> */}
            <div className="cont-bid-box">
              <div className="total-per-bid">${(grandTotal)}</div>
              <div
                style={{ fontSize: "8px", fonttWeight: "bold" }}
                className="per-cont"
              >
                PER CONT.{" "}
              </div>
            </div>
          </section>
        </div>

        <div>
          <button
            style={{ marginTop: "10px" }}
            className="partners-btn-done"
            onClick={(e) => {
              // this.props.bidAdditionalChargeHandler();
              this.props.additionalChargeDoneHandler(
                this.props.fromLaneBidCard
              );
              this.props.setAdditionalChargesInStore(
                this.props.fromLaneBidCard
                  ? "LANE_ADDITIONAL_CHARGE"
                  : "PORT_ADDITIONAL_CHARGE",
                this.props.opportunityId,
                this.props.sourcePort,
                this.props.laneId,
                this.state.chargesMap
              ); //(source, opportunuityId, portId, destinationId, charges)
            }}
          >
            DONE
          </button>

          <button
            style={{ marginTop: "10px" }}
            className="cancel-btn"
            onClick={(e) => {
              this.props.additionalChargeCancelHandler(
                this.props.fromLaneBidCard
              );
            }}
          >
            CANCEL
          </button>
        </div>
        {/* </ReactModal> */}
      </div>
    );
  }
}

export default LaneAdditionalCharges2;

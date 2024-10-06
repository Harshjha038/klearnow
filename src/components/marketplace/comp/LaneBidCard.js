import React, { Component } from "react";
import { OPPORTUNITY_MODAL_VIEW, totalBidAmountForLane } from "../util/index";
import { Icon, Popup } from "semantic-ui-react";
import { get } from "lodash";
import moment from "moment";
import "moment-timezone";
import "./styles.scss";

export default class LaneBidCard extends Component {
  constructor(props) {
    super(props);

    let laneData = get(this.props, "selectedDestinationLaneData", null);
    let destinationBidData = get(laneData, "destinationBidData", null);

    if (!destinationBidData) {
      destinationBidData = {};
    }

    let baseFee = (destinationBidData.baseFees);
    let chasisRentalperday = destinationBidData.chasisRentalperday;
    let fuelCharges = destinationBidData.fuelCharges;
    let minReqDays = destinationBidData.chasisRentalperday;
    let bidBaseTotal = destinationBidData.bidBaseTotal;
    let yesRadioButton = destinationBidData.yesRadioButton
    let notes = destinationBidData.notes
    let capacityPerMonth= destinationBidData.capacityPerMonth
    let rateValidUntilDate= destinationBidData.rateValidUntilDate

    let basefeesGlCode="";
    let fuelChargeGlCode="";

    //  if (this.props.standardPartnerAdditionalCharges) {
    //     for(let charge of this.props.standardPartnerAdditionalCharges){
    //       if (charge.chargeName ==="BASE CHARGE"){
    //             basefeesGlCode =charge.glCode
            
    //       }
    //       if(charge.chargeName == "FUEL CHARGE"){
    //         fuelChargeGlCode =charge.glCod
    //       }
    //     }
    // }

    console.log("LaneBidCard :  props : constructor called", this.props, rateValidUntilDate);
    if (!rateValidUntilDate) {
      // let currentDate = new Date()
      // currentDate.setDate(currentDate.getDate() + 14)
      rateValidUntilDate = this.getNextExpiryDate(1)
    }

    this.state = {
      isAdditionalCharge: false,
      additionalchargesForLane: this.props.additionalCharges ? this.props.additionalCharges : new Map(),
      baseFees: baseFee,
      fuelCharges: fuelCharges && fuelCharges > 0 ? fuelCharges : "",
      chasisRentalperday: chasisRentalperday,
      minReqDays: minReqDays,
      bidBaseTotal: bidBaseTotal,
      // yesRadioButton: fuelCharges && fuelCharges.length > 0 ? true : false,
      yesRadioButton : yesRadioButton,
      basefeesGlCode : basefeesGlCode,
      fuelChargeGlCode : fuelChargeGlCode,
      notes:notes,
      capacityPerMonth:capacityPerMonth,
      opportunityStartDate: "",
      rateValidUntilDate:rateValidUntilDate,
      opportunityStartDateObj: {},
      formError:{
        fuelChargesError:''
      }
    };
  }

  getNextExpiryDate = (extraDay) => {
    let currentDate = new Date()
    currentDate.setDate(currentDate.getDate() + 13 + extraDay)
    return currentDate
  }

  additionalChargeDoneHandler = (chargeForGlCode) => {
    console.log("chargeForGlCode : ", chargeForGlCode);
    this.setState({
      isAdditionalCharge: false,
      additionalchargesForLane: chargeForGlCode,
    });
  };
  changeHandler = (e) => {
    console.log("changeHandler :: e", e);
    this.setState({ [e.target.name]: e.target.value });
  };

  baseFeesUpdate = (e) => {

    this.props.setLaneBidChargesInStore(
      this.props.opportunityId,
      this.props.sourcePortCode,
      this.props.laneId,
      {
        baseFees: e.target.value,
        basefeesGlCode:this.state.basefeesGlCode,
        fuelChargeGlCode:this.state.fuelChargeGlCode,
        fuelCharges: this.state.fuelCharges,
        chasisRentalperday: this.state.chasisRentalperday,
        minReqDays: this.state.minReqDays,
        bidBaseTotal: totalBidAmountForLane(this.state),
        notes:this.state.notes,
        capacityPerMonth:this.state.capacityPerMonth,
        rateValidUntilDate:this.state.rateValidUntilDate

      }
    );
  }

  fuelChargeHandler = (e) => {
    
    
    let x = Number(e.target.value)
    

    console.log("fuelChargeHandler :: e", e.target, x, typeof(x),  Number.isInteger(x));

    if (!Number.isInteger(x)) {
      x = parseFloat(x.toFixed(2))
    }
    
    console.log("fuelChargeHandler :: save as ", x);
    if (x === 0 ){
      x = ""
    }
    this.setState({ [e.target.name]: x });
    this.validateForm({value: x, name: e.target.name})
  }
  
  handelFormErrorChange = ({name, value}) => {
    this.setState((preState) => ({ formError : {...preState.formError, [`${name}Error`]: value} }))
  }

  validateForm = ({value, name}) => {
    const { fuelCharges } = this.state
    const { knStandardFuelPercent } = this.props
    switch (name) {
      case 'fuelCharges': // call on specfic input change
        if (value > knStandardFuelPercent) {
          this.handelFormErrorChange({name, value: `This cannot be more than KN Standard Fuel Surcharge which is ${knStandardFuelPercent}% for today.`})
        }else{
          this.handelFormErrorChange({name, value: ''})
        }
        break
      default: // call on submit form
        if (fuelCharges > knStandardFuelPercent) {
          this.handelFormErrorChange({name : 'fuelCharges', value: `This cannot be more than KN Standard Fuel Surcharge which is ${knStandardFuelPercent}% for today.`})
          return
        }
    }
  }

  oneLaneBidSubmitted = () => {};

  deleteHandler = (glCodeToDelete) => {
    //value is an object, key is the glcode
    console.log("deleteHandler chargeForGlCode:", glCodeToDelete);
    let additionalchargesForLane = this.state.additionalchargesForLane;
    for (let [key, value] of additionalchargesForLane) {
      if (key === glCodeToDelete) {
        value.reqQuantityUsed = 0;
      }
    }

    this.setState({ additionalchargesForLane: additionalchargesForLane });
  };
  additionalChargeCancelHandler = () => {
    this.setState({ isAdditionalCharge: false });
  };
  radioButtonChangeHandler = (e) => {
    console.log("target",e.target)
    //this.setState({ radioButton: e.target.id  === "yes"});
    if(e.target.value==="yes"){
      this.setState({yesRadioButton: true})
    } else {
      this.setState({yesRadioButton: false, fuelCharges : 0})
    }
  };

  render() {
    //const {rateValidUntilDate}=this.state
    console.log("LaneBidCard :  props", this.props);
    console.log("LaneBidCard :: this.state", this.state);
    let chasisTotal = this.state.chasisRentalperday * this.state.minReqDays;
    console.log(" chasisTotal", chasisTotal);
    let fuel = (this.state.baseFees * (this.state.fuelCharges / 100));
    console.log("fuel ", fuel);

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

    let totalFee =  Math.round(totalBidAmountForLane(this.state));

    let basefeesGlCode="";
    let fuelChargeGlCode="";
    if (this.props.standardPartnerAdditionalCharges) {
      for (let charge of this.props.standardPartnerAdditionalCharges) {
        if (charge.chargeName === "BASE CHARGE") {
          basefeesGlCode = charge.glCode;
        }
        if (charge.chargeName == "FUEL CHARGE") {
          fuelChargeGlCode = charge.glCode;
        }
      }
    }
    console.log("basefeesGlCode :",basefeesGlCode,fuelChargeGlCode, this.state.rateValidUntilDate)


    let handleExpiryDateChange = (value) => {
      console.log('handleExpiryDateChange :: ', value)
      let isoDate = value?value.getFullYear()+'-' + (value.getMonth()+1) + '-'+value.getDate():"";
      this.setState({rateValidUntilDate: value,})
    }

    let options = {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
      timeZone: "UTC",
    };
    let expirationDate = new Date(parseInt(this.props.expirationDate))
    expirationDate = expirationDate.toLocaleDateString("en-US", options).toUpperCase();
    let expPickUpDate = this.props.opp_key  && this.props.opp_key === "containerOpportunities" &&  this.props.selectedDestinationLaneData.eta && parseInt(this.props.selectedDestinationLaneData.eta);
    expPickUpDate = expPickUpDate &&  moment.utc(moment(expPickUpDate).utc()).toDate()
    expPickUpDate = expPickUpDate &&  expPickUpDate.toLocaleDateString("en-US", options).toUpperCase();
    console.log("lanebidcardfuelCharges",this.state.fuelCharges,)
    const { formError } = this.state
    return (
      <div>
        <div>
          <div className="bidcard-wrapper-bid-card">
            <div className="bidcard-header">
              <div style={{ marginLeft: "10px", marginTop: "30px" }}>
                <img
                  style={{ marginLeft: "10px", marginTop: "5px" }}
                  className="anchor-img"
                  src="images/files/anchor.svg"
                />
              </div>
              <div>
                <div
                  style={{ marginTop: "10px", marginLeft: "10px" }}
                  className="small-text "
                >
                  FROM
                </div>
                <div style={{ marginLeft: "10px" }} className="party-name-bid ">
                  {splitForTooltip(this.props.sourcePortName.toUpperCase())}
                </div>
              </div>
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
              <div className="general-col">
                <div style={{ marginTop: "11px" }} className="small-text  ">
                  TO
                </div>
                <div
                  style={{ marginRight: "30px", marginTop: "3px" }}
                  className="party-name-bid "
                >
                  {splitForTooltip(
                    this.props.selectedAddress
                      ? this.props.selectedAddress.toUpperCase()
                      : ""
                  )}
                </div>
              </div>
            </div>
            <div className="internal">
              <section className="internal-box">
                <div>
                  <div className="lfc">
                    <div className="lfc-holder">
                      <div className="name-text">LCL/FCl : </div>
                      <div className="lcl-text">
                        {
                          this.props.selectedDestinationLaneData
                            .containerLoadType
                        }
                      </div>
                    </div>
                    <div className="drop-holder">
                      <div className="name-text">DROP AND PULL : </div>
                      <div className="drop-pull-text">
                        {
                          this.props.selectedDestinationLaneData
                            .dropAndPullTransport
                        }
                      </div>
                    </div>
                    <div className="warehouse-holder">
                      <div className="name-text">
                        WAREHOUSE APPT. MANDATORY :
                      </div>
                      <div className="warehouse-text">
                        {
                          this.props.selectedDestinationLaneData
                            .warehouseAppointment
                        }
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <div style={{ paddingTop: "5px" }} className="lfc">
                    <div className="lfc-holder">
                      <div className="name-text">HAZMAT: </div>
                      <div className="lcl-text">
                        {this.props.selectedDestinationLaneData.hazmat}
                      </div>
                    </div>
                    <div className="drop-holder">
                      <div className="name-text">OVERWEIGHT: </div>
                      <div className="drop-pull-text">
                        {this.props.selectedDestinationLaneData.overweight}
                      </div>
                    </div>
                    <div className="warehouse-holder">
                      <div className="name-text">CONTAINER TYPE :</div>
                      <div className="warehouse-text">
                        {this.props.selectedDestinationLaneData.containerType}
                      </div>
                    </div>
                  </div>
                </div>

                <form>
                  <div className="fees-fuel">
                    <div className="general-col">
                      <div className="base-fees">
                        <div className="faded-text">BASE FEES /LINE HAUL</div>
                        <input
                          className="input-box"
                          type="number"
                          name="baseFees"
                          value={
                            this.state.baseFees &&
                            this.state.baseFees > 0
                              ? parseInt(this.state.baseFees)
                              : ""
                          }
                          onChange={this.changeHandler}
                        />
                      </div>
                    </div>
                    <div className="fuel-inclusion">
                      <div className="faded-text">
                        ADDITIONAL FUEL CHARGES REQUIRED ? 
                        <Popup 
                          content=" FSC will be based on the United States Department of Energy, 
                          Energy Information Administration (EIA) average price for a gallon of 
                          diesel fuel issued each Monday, and will become applicable on each Monday 
                          following the posting on the Department of Energy website."
                          trigger={<Icon
                            name="warning circle "
                            color="blue"
                            size="large"
                          />}
                        />
                      </div>
                      <form>
                        <div className="yes-no-row">
                          <div>
                          <input
                            style={{ marginLeft: "17px" }}
                            className="radio"
                            id="yes"
                            type="radio"
                            name="yes-no-row"
                            value="yes"
                            checked={this.state.yesRadioButton}
                            onClick={this.radioButtonChangeHandler}
                          />
                          <label className="yes-no" for="yes">
                            YES
                          </label>
                          </div>
                          <br></br>
                          <div style={{ marginLeft: "15px" }}>
                          <input
                            className="radio"
                            type="radio"
                            name="yes-no-row"
                            value="no"
                            id="no"
                            checked={!this.state.yesRadioButton}
                            onClick={this.radioButtonChangeHandler}
                          />
                          <label className="yes-no" for="no">
                            NO
                          </label>
                          </div>
                          <br></br>
                        </div>
                      </form>
                    </div>
                  </div>
                  <div className="fuel-charges ">
                    <div className="faded-text">FUEL CHARGES</div>
                    <div className="percent-fuel">
                      <div className="percent">
                        <input
                          style={{
                            marginLeft: "-1px",
                            paddingTop: "-10px",
                            marginRight: "10px",
                            marginTop: "-2px",
                            border: formError.fuelChargesError ? '1px solid red' : 'none'
                          }}
                          onKeyDown={(e) => ["-", "+"].includes(e.key) && e.preventDefault()}
                          className="input-box"
                          type="number"
                          name="fuelCharges"
                          value={this.state.fuelCharges}
                          onChange={this.fuelChargeHandler}
                          disabled={!this.state.yesRadioButton}
                        />
                        {formError.fuelChargesError && (
                        <span className="inputInsideRightIcon">
                          <Popup
                            style={{ color: "red" }}
                            trigger={
                              <Icon
                                className="exclamation triangle icon"
                                style={{ color: "red" }}
                              />
                            }
                            size="mini"
                            position="top center"
                          >
                            {formError.fuelChargesError}
                          </Popup>                  
                        </span>)}
                      </div>
                      <div> % OF BASE PRICE</div>
                    </div>
                  </div>
                  <div className="fuel-charges general-row ">
                    <div style={{ display: "flex", flexDirection: "column" }}>
                      <div
                        style={{ paddingRight: "30px" }}
                        className="faded-text"
                      >
                        {
                          this.props.opp_key && this.props.opp_key === "containerOpportunities"?
                          "Capacity"
                          :
                          "CAPACITY/MONTH"
                        }
                        
                      </div>
                      <div className="percent-fuel">
                        <input
                          style={{
                            marginLeft: "-1px",
                            paddingTop: "-10px",
                            marginRight: "10px",
                            marginTop: "-2px",
                            height:"20px"
                          }}
                          className="input-box"
                          type="number"
                          name="capacityPerMonth"
                          value={this.state.capacityPerMonth}
                          onChange={this.changeHandler}
                        />
                      </div>
                    </div>
                    <div  style={{paddingLeft:"100px"}}className="genreral-col">
                    <div
                      style={{ paddingRight: "20px", }}
                      className="faded-text general-col"
                    >
                      {this.props.opp_key && this.props.opp_key === "containerOpportunities"? 'ESTIMATED TIME OF ARRIVAL' : 'EXPIRATION DATE'}
                    </div>
                    <div
                      style={{ paddingLeft: "20px", }}
                      
                    >
                    {this.props.opp_key && this.props.opp_key === "containerOpportunities"? expPickUpDate : expirationDate}
                    </div>
                    </div>
                  </div>

                  <textarea
                    placeholder="QUESTIONS ABOUT THE BID"
                    name="notes"
                    rows="2"
                    cols="70"
                    onChange={this.changeHandler}
                    className="fuel-charges bid-textarea"
                    value={this.state.notes}
                  ></textarea>
                </form>
              </section>
              <div className="additional">Potential Additional Charges</div>
              {Array.from(this.state.additionalchargesForLane.keys()).map(
                (key) => {
                  console.log("chargeForGlCode :", key);
                  let charge = this.state.additionalchargesForLane.get(key);
                  let total =
                    charge.unitPrice * parseInt(charge.reqQuantityUsed);

                  if (!charge.reqQuantityUsed) {
                    return null;
                  }

                  return (
                    <div className="pot-add-box">
                      <div className="pot-row">
                        <div className="general-col">
                          <div className="first-head">{charge.chargeName}</div>
                          <div className="text-charge">
                          $ {charge.unitPrice}
                          </div>
                        </div>

                        <div className="general-col">
                          <div className="sec-head">QUANTITY</div>
                          <div className="text-charge">
                            {parseInt(charge.reqQuantityUsed)}
                          </div>
                        </div>

                        <div className="general-col">
                          <div className="third-head">TOTAL</div>
                          <div className="text-charge">${total}</div>
                        </div>

                        <div>
                          <img
                            onClick={(e) => {
                              this.deleteHandler(charge.glCode);
                            }}
                            style={{ marginTop: "13px" }}
                            src="images/files/delete.svg"
                          />
                        </div>
                      </div>
                    </div>
                  );
                }
              )}
              <button
                className="btn-add-bid"
                onClick={(e) => {
                  this.props.setLaneBidChargesInStore(
                    this.props.opportunityId,
                    this.props.sourcePortCode,
                    this.props.laneId,
                    {
                      baseFees: this.state.baseFees,
                      basefeesGlCode: this.state.basefeesGlCode,
                      fuelChargeGlCode: this.state.fuelChargeGlCode,
                      fuelCharges: this.state.fuelCharges,
                      chasisRentalperday: this.state.chasisRentalperday,
                      minReqDays: this.state.minReqDays,
                      bidBaseTotal: totalBidAmountForLane(this.state),
                      yesRadioButton: this.state.yesRadioButton,
                      notes: this.state.notes,
                      capacityPerMonth: this.state.capacityPerMonth,
                      rateValidUntilDate: this.state.rateValidUntilDate,
                    }
                  );

                  this.props.additionalChargeClickHandler(
                    this.props.sourcePortCode,
                    OPPORTUNITY_MODAL_VIEW.AdditionalCharges
                  );
                }}
              >
                ADD
              </button>
            </div>
            <section id="my-best-bid" className="best-cont">
              <div className="best-box">MY BEST BID</div>
              <div className="cont-bid-box">
                <div className="total-per-bid">${totalFee}</div>
                <div className="per-cont">PER CONTAINER APPROX </div>
              </div>
            </section>
          </div>
          <div>
            <button
              className="partners-btn-done"
              style={
                this.state.baseFees > 0 && this.state.capacityPerMonth > 0 && !formError.fuelChargesError
                  ? { backgroundColor: "#008B8F" }
                  : {
                      backgroundColor: "#008B8F",
                      opacity: "50%",
                    }
              }
              disabled={
                !(this.state.baseFees > 0 && this.state.capacityPerMonth > 0 && !formError.fuelChargesError)
              }
              onClick={(e) => {
                this.props.individualBidDoneHandler();
                this.props.setLaneBidChargesInStore(
                  this.props.opportunityId,
                  this.props.sourcePortCode,
                  this.props.laneId,
                  {
                    baseFees: this.state.baseFees,
                    basefeesGlCode: basefeesGlCode,
                    fuelChargeGlCode: fuelChargeGlCode,
                    fuelCharges: this.state.fuelCharges,
                    chasisRentalperday: this.state.chasisRentalperday,
                    minReqDays: this.state.minReqDays,
                    bidBaseTotal: totalFee,
                    yesRadioButton: this.state.yesRadioButton,
                    laneAmount: totalFee,
                    notes: this.state.notes,
                    capacityPerMonth: this.state.capacityPerMonth,
                    rateValidUntilDate: this.state.rateValidUntilDate,
                  }
                );
              }}
            >
              DONE
            </button>
            <button
              className="cancel-btn"
              onClick={this.props.individualBidCancelHandler}
            >
              CANCEL
            </button>
          </div>
        </div>
      </div>
    );
  }
}

import React, { Component } from 'react';
import { get } from "lodash";
import { amountToShortString } from "KN-Drayage-UI";
import { isReturnStatement } from 'babel-types';

class ModalConfirm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            feesDetails: []

        }
    }
    priceDetails = (destinations) => {
        let updatedFeesDetails = {}
        for (let destination of destinations) {
            let desinationBidData = destination.destinationBidData
            console.log("confirm desinationBidData", desinationBidData)


            let eachFeesDetails = {
                "BaseFees": desinationBidData.baseFees,
                "fuelCharges": desinationBidData.fuelCharges,
                "capacityPerMonth": desinationBidData.capacityPerMonth,
                "AddressName": get(destination, "destinationAddress.addressName", "Unkown")

            }
            console.log("updatedFeesDetails", eachFeesDetails)
            updatedFeesDetails[destination.laneId] = eachFeesDetails
        }

        return updatedFeesDetails
        //this.setState({ feesDetails: updatedFeesDetails })
        // return this.state.feesDetails
    }
    additionalCharges = (destinations) => {
        //console.log("additionalCharges destinations", destinations)
        let additionalChargeList = {}
        let chargeObject = {}

        for (let destination of destinations) {
            //console.log("destination",destination)


            let destinationAdditionalCharges = get(destination, "destinationAdditionalCharges", null)
            if (!destinationAdditionalCharges) {
                continue
            }
            //console.log("destinationAdditionalCharges", destinationAdditionalCharges)
            additionalChargeList[destination.laneId] = []
            for (let [glcode, charge] of destinationAdditionalCharges) {
                //console.log("key,value",key,value)
                //let oneObj= charge["charge.glCode"]
                //console.log(" additionalCharges charge", glcode, charge)
                let reqQuantityUsed = get(charge, "reqQuantityUsed", null)
                if (reqQuantityUsed && reqQuantityUsed > 0) {
                    chargeObject = {
                        "ChargeName": charge["chargeName"],
                        "UnitMeasurement": charge["unitMeasurement"],
                        "UnitPrice": charge["unitPrice"],
                        "RequiredQuantity": charge["reqQuantityUsed"]

                    }
                    additionalChargeList[destination.laneId].push(chargeObject)

                }

            }

        }

        return additionalChargeList
    }

    getPortAdditionalCharges = (portCode) => {
        //console.log("getPortAdditionalCharges >>> portCode", portCode)
        let indivData = this.props.opportunityData.get(this.props.opportunityId)
        //console.log("getPortAdditionalCharges >>> indivData", indivData)


        if (indivData) {
            let portData = indivData.portData
            let indivPortData = portData.get(portCode)
            let portAdditionalCharges = indivPortData.portAdditionalCharges
            if (!portAdditionalCharges) {
                return []
            }

            //console.log("portAdditionalCharges >>> ", portAdditionalCharges)
            let portPriceList = [];
            let portChargeObject = {}
            for (let [glcode, charge] of portAdditionalCharges) {
                let reqQuantityUsed = get(charge, "reqQuantityUsed", null)
                if (reqQuantityUsed && reqQuantityUsed > 0) {
                    portChargeObject = {
                        "ChargeName": charge["chargeName"],
                        "UnitMeasurement": charge["unitMeasurement"],
                        "UnitPrice": charge["unitPrice"],
                        "RequiredQuantity": charge["reqQuantityUsed"]

                    }
                    portPriceList.push(portChargeObject)


                }
            }
            //console.log("portPriceList", portPriceList)
            return { portPriceList, "PortName": indivPortData.sourcePort }
        }
        return []
    }

    render() {
        //console.log("confirm props :: ", this.props)
        let opportunityId = this.props.opportunityId
        let opportunityData = this.props.opportunityData
        let indivData = opportunityData.get(opportunityId)
        let opportunityName = indivData && (indivData.opportunityName).toUpperCase()
        //console.log("indivData",indivData )

        //console.log("confirm props :: ", this.props, "opportunity details :: ", opportunityData.get(opportunityId))

        let standardPartnerAdditionalCharges = this.props.standardAdditionalCharges ? this.props.standardAdditionalCharges : []
        //console.log("confirm standardPartnerAdditionalCharges ", standardPartnerAdditionalCharges)
        let priceList = []
        // let destinationAdditionalPriceList = []
        // let portAdditionalCharges=[]

        // < div > 
        let destinationAdditonalChargeMap = {}
        let portAdditonalChargeMap = {}
        let priceListMap = {}
        let portNameMap = {}
        if (indivData) {
            // let indivData = opportunityData.get(this.props.opportunityId)
            let portData = indivData.portData
            let portIndivTotal;
            for (let [portCode, portDetails] of portData) {
                //console.log("confirm portData", portData)
                let indivPortData = portData.get(portCode)
                console.log("confirm indivPortData", indivPortData)
                let destinations = indivPortData.destinations
                //console.log("confirm destinations", destinations)
                priceList = this.priceDetails(destinations)
                priceListMap[portCode] = priceList
                portNameMap[portCode] = indivPortData.sourcePort

                destinationAdditonalChargeMap[portCode] = this.additionalCharges(destinations)
                // let totalList = this.indivTotal(destinations)
                // console.log("confirm indivTotal >> ", totalList)
                let portAdditionalCharges = this.getPortAdditionalCharges(portCode)
                //console.log("portAdditionalCharges", portAdditionalCharges)


                portAdditonalChargeMap[portCode] = portAdditionalCharges
            }

        }
        //console.log("Confirm priceListMap :: ", priceListMap)
        // console.log("Confirm destinationAdditionalPriceList:: ", destinationAdditionalPriceList)


        let grandTotalPotentialaddcharges = 0;
        let grandTotalPortaddcharges = 0;
        let totalpot;
        let finalGrandtotal = (amountToShortString(this.props.totalEnteredBidAmount, true))
        return (
            <div>
                <div>

                    <div className="partner-modal-first-confirmation-contents">

                        <img style={{ marginLeft: "225px", marginTop: "-20px" }} src="/images/files/confirm.svg" />
                        <div style={{ marginLeft: "150px", fontSize: "24px" }} className="text-confirm">
                            {this.props.isFromEdit ? this.props.bidOperationType === "SAVE" ? "CONFIRM EDITS SUBMISSION" : this.props.bidOperationType === "UPDATE_BID" ? "CONFIRM RE-SUBMISSION" : this.props.bidOperationType === "DISCARD" ? "CONFIRM EDITED DISCARD " : "" : "CONFIRM SUBMISSION"}
                        </div>
                        <div className='summaryDiv'>
                            <div style={{ marginTop: "20px", width: "450px" }} className="general-row-cont">
                                <div style={{ fontSize: "16px", }} className='basebreakup'> OPPORTUNITY:</div>
                                <div style={{ fontSize: "16px", marginTop: "20px", width: "350px", marginLeft: "-200px", fontWeight: "bold" }} >  {(opportunityName).toUpperCase()} </div>
                            </div>
                            {/* <div className='general-row'>
                                <div style={{ marginTop: "20px", marginLeft: "20px" }} className='nameport'>PORT: {(this.props.selectedSourcePortName).toUpperCase()}</div>
                                <div style={{ marginTop: "20px", marginLeft: "20px", fontSize: "16px" }} className='namedest'>DESTINATION: {this.props.destinationName}</div>
                            </div> */}

                            {
                                Object.keys(priceListMap).map(
                                    (portCode) => {
                                        let priceList = priceListMap[portCode]

                                        let destinationAdditionalPriceList = destinationAdditonalChargeMap[portCode]
                                        //console.log("destinationAdditionalPriceList",destinationAdditionalPriceList)
                                        let portDetails = portAdditonalChargeMap[portCode]
                                        let portAdditionalCharges = get(portDetails, "portPriceList", [])
                                        let portName = portDetails["PortName"]
                                        //console.log("priceList >>> portAdditionalCharges", portAdditionalCharges)
                                        let laneIds = Object.keys(priceList)
                                        //console.log("laneIds",laneIds)
                                        let laneTotalpotential = {}
                                        return <div>
                                            <div style={{ fontWeight: "bold", fontSize: "16px", marginTop: "0px", marginBottom: "-10px" }} className='basebreakup'> PORT: {(portNameMap[portCode]).toUpperCase()} </div>
                                            <div>{laneIds.map((laneId) => {
                                                //console.log("laneId",laneId)
                                                let price = priceList[laneId]
                                                //console.log("priceList >>> price", price)
                                                return <div >
                                                    <div style={{ fontSize: "16px", marginBottom: "15px" }} className='basebreakup'> DESTINATION:  {(get(price, "AddressName.value", "").toUpperCase())}</div>
                                                    <div style={{ fontWeight: "bold", fontSize: "16px", display: 'flex', flexDirection: "row", }}>
                                                        {/* <div className='nameport'>PORT: {get(price, "AddressName.value", "")}</div> */}
                                                        <div style={{ marginLeft: "30px" }} className='pot-add-box general-row'>
                                                            <div style={{ marginLeft: "10px" }} className='basebreakup'>BASE FEES: ${price["BaseFees"]} </div>
                                                            {price["fuelCharges"] && price["fuelCharges"] > 0 ? <div className='basebreakup'>FUEL: {price["fuelCharges"]}% (Base) </div> : ""}
                                                            <div style={{ marginLeft: "20px" }} className='basebreakup'> CAPACITY/MONTH: {price["capacityPerMonth"]}</div>
                                                        </div>
                                                        {/* <div className='basebreakup'> Fuel Charges Required : {price["fuelSurcharge"]=""?No :Yes}</div> */}

                                                    </div>
                                                    {destinationAdditionalPriceList[laneId].length > 0 && <div style={{ marginLeft: "32px", fontWeight: "bold", marginTop: "15px", marginBottom: "-5px" }} className='port-head-text'>POTENTIAL ADDITIONAL CHARGES:</div>}




                                                    <div>

                                                        {
                                                            destinationAdditionalPriceList[laneId].map(charge => {
                                                                //console.log("destinationAdditionalPriceList[laneId]",destinationAdditionalPriceList[laneId])
                                                                let qty = parseInt(charge["RequiredQuantity"])
                                                                //console.log("charge here",charge)
                                                                //console.log("qty here",qty)
                                                                let unitPrice = parseInt(charge["UnitPrice"])
                                                                // console.log("Destination Additional charges : ", qty, unitPrice)
                                                                // let laneTotalpotential=0
                                                                if (!(laneId in laneTotalpotential)) {
                                                                    laneTotalpotential[laneId] = 0
                                                                }
                                                                totalpot = laneTotalpotential[laneId] += qty * unitPrice


                                                                grandTotalPotentialaddcharges += qty * unitPrice
                                                                //console.log("grandTotalPotentialaddcharges 1",grandTotalPotentialaddcharges)

                                                                return <div >
                                                                    {/* (charge["reqQuantityUsed"]&& charge["reqQuantityUsed"] > 0 ? ) */}
                                                                    {/* {qty>0 &&<div style={{ marginLeft: "12px", fontWeight: "bold",marginTop:"15px",marginBottom:"-5px" }} className='port-head-text'>POTENTIAL ADDITIONAL CHARGES</div>} */}


                                                                    <div style={{ marginLeft: "30px", marginTop: "5px", marginBottom: "10px" }} className="pot-add-box ">
                                                                        <div className="pot-row">
                                                                            <div className="general-col">
                                                                                <div className="first-head">{charge["ChargeName"]}</div>
                                                                                <div className="text-charge general-row " >
                                                                                    <div>$ {charge["UnitPrice"]}</div>
                                                                                    <div style={{ fontSize: "12px", paddingLeft: "10px" }} >   {charge["UnitMeasurement"]}</div>
                                                                                </div>
                                                                            </div>

                                                                            <div className="general-col">
                                                                                <div className="sec-head">QUANTITY</div>
                                                                                <div className="text-charge">
                                                                                    {parseInt(charge["RequiredQuantity"])}
                                                                                </div>
                                                                            </div>

                                                                            <div className="general-col">
                                                                                <div className="third-head">TOTAL</div>
                                                                                <div className="text-charge">{parseInt(charge["RequiredQuantity"]) && parseInt(charge["RequiredQuantity"]) > 0 ? "$" + ((charge["UnitPrice"]) * (parseInt(charge["RequiredQuantity"]))) : ""}</div>
                                                                            </div>

                                                                            <div>

                                                                            </div>
                                                                        </div>
                                                                    </div>

                                                                </div>
                                                            })
                                                        }
                                                        {grandTotalPotentialaddcharges > 0 && <div style={{ marginLeft: "30px", fontWeight: "bold", marginBottom: "20px", }}>TOTAL  POTENTIAL ADDITIONAL CHARGES :    {"$" + totalpot}</div>}
                                                    </div>
                                                </div>
                                            }
                                            )}
                                            </div>


                                            <div>

                                                {portAdditionalCharges.length > 0 && <div style={{ marginLeft: "30px", fontWeight: "bold" }} className='port-head-text'>PORT ADDITIONAL CHARGES:</div>}
                                                {portAdditionalCharges.map(charge => {
                                                    let qty = parseInt(charge["RequiredQuantity"])
                                                    let unitPrice = parseInt(charge["UnitPrice"])
                                                    console.log("Destination Additional charges : ", qty, unitPrice)


                                                    grandTotalPortaddcharges += qty * unitPrice
                                                    return (<div>


                                                        <div style={{ marginLeft: "30px", marginTop: "5px", marginBottom: "10px" }} className="pot-add-box">
                                                            <div className="pot-row">
                                                                <div className="general-col">
                                                                    <div className="first-head">{charge["ChargeName"]}</div>
                                                                    <div className="text-charge general-row " >
                                                                        <div>$ {charge["UnitPrice"]}</div>
                                                                        <div style={{ fontSize: "12px", paddingLeft: "10px" }} >   {charge["UnitMeasurement"]}</div>
                                                                    </div>
                                                                </div>

                                                                <div className="general-col">
                                                                    <div className="sec-head">QUANTITY</div>
                                                                    <div className="text-charge">
                                                                        {parseInt(charge["RequiredQuantity"])}
                                                                    </div>
                                                                </div>

                                                                <div className="general-col">
                                                                    <div className="third-head">TOTAL</div>
                                                                    <div className="text-charge">{parseInt(charge["RequiredQuantity"]) && parseInt(charge["RequiredQuantity"]) > 0 ? "$" + ((charge["UnitPrice"]) * (parseInt(charge["RequiredQuantity"]))) : ""}</div>
                                                                </div>

                                                                <div>

                                                                </div>

                                                            </div>

                                                        </div>
                                                    </div>)
                                                })}
                                            </div>
                                            {grandTotalPortaddcharges > 0 && <div style={{ marginLeft: "32px", fontWeight: "bold", marginBottom: "20px" }}>TOTAL POTENTIAL PORT CHARGES:  {"$" + grandTotalPortaddcharges}</div>}
                                        </div>
                                    }
                                )
                            }
                            <div style={{ fontWeight: "bold", fontSize: "16px", marginLeft: "30px" }} className="basebreakup">TOTAL PROPOSED VOLUME: {this.props.totalProposedVolume}</div>
                            {/* <div className="basebreakup">Total Entered Bid Amount:{amountToShortString(this.props.totalEnteredBidAmount,true)}</div>
                     */}
                            {/* <div style={{ padding: "15px", marginLeft: "30px", fontWeight: "bold", fontSize: "26px", color: "white", backgroundColor: "#717171", width: "350px", height: "50px", marginBottom: "10px" }} >GRAND TOTAL: {finalGrandtotal}</div> */}


                            {/* <div className="email-text">
                        We 'll send you a confirmation email shortly.
                      </div> */}
                        </div>


                        <div>
                            <button style={{ marginLeft: "120px" }}
                                onClick={(e) => {
                                    this.props.bidSubmissionConfirmed();
                                }}
                                className="btn-done"
                            >
                                YES
                            </button>
                            <button
                                onClick={(e) => {
                                    this.props.bidSubmissionCanceled();
                                }}
                                className="cancel-btn"
                            >
                                NO
                            </button>
                        </div>
                    </div>
                    {/* </ReactModal> */}


                </div>

            </div>
        );
    }
}

export default ModalConfirm;

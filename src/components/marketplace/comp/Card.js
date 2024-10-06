import React from "react";
// import "./partner-styles.scss";
import { Header, Icon } from "semantic-ui-react";
import exporter from "../images/exporter";
import ReactModal from "react-modal";
import Bid from "./LaneAdditionalCharges";
import Additional from "./LaneAdditionalCharges";

class Card extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      showCard: false,
      showBidCard: false,
      showAddCard: false,
      grandTotalContainers: "10000",
      grandTotalPrice: "$20000",
      selectedPortId: "",
      selectedWarehouseId: "",
      selectedPortName: "",
      selectedDestination: "",
      total: "800",
      baseFees: "",
      chasisAmount: "",
      requiredDays: "",
      isPort: false,

      header: {
        portId: "1",
        portName: "NEW YORK PORT,NY",
        numberofDestinations: "6",
        suggestedBid: "SUGGESTED BID",
        totalPorts: 2,
        totalContainers: 6000,
        totalPrice: "7000",
      },
      data: [
        {
          portId: "1",
          portName: "NEW YORK PORT,NY",
          wareHouseId: "20",
          destination: "GLASSBORO,NJ(08928)",
          approxValue: "500",
          price: "350",
        },
        {
          portId: "1",
          portName: "NEW YORK PORT,NY",
          wareHouseId: "30",
          destination: "PHILADELPHIA,PA(07928)",
          approxValue: "2000",
          price: "350",
        },
        {
          portId: "1",
          portName: "NEW YORK PORT,NY",
          wareHouseId: "40",
          destination: "WOOD RIDGE,NJ(08927)",
          approxValue: "3500",
          price: "350",
        },
      ],

      header2: {
        portName: "NEW YORK PORT,NY",
        numberofDestinations: "6",
        suggestedBid: "SUGGESTED BID",
        totalPorts: 2,
        totalContainers: 2000,
      },
      data2: [
        {
          wareHouseId: "",
          destination: "GLASSBORO,NJ(08928)",
          approxValue: "500",
          price: "350",
        },
        {
          wareHouseId: "",
          destination: "PHILADELPHIA,PA(07928)",
          approxValue: "2000",
          price: "350",
        },
        {
          wareHouseId: "",
          destination: "WOOD RIDGE,NJ(08927)",
          approxValue: "3500",
          price: "350",
        },
      ],
    };

    // this.bidHandler= this.bidHandler.bind(this)
  }
  handleOpenModal = () => {
    this.setState({ showModal: true });
  };

  handleCloseModal = () => {
    this.setState({ showModal: false });
  };
  onArrowClick = () => {
    console.log("oArrowClick : ", this.state.showCard);
    this.setState({ showCard: !this.state.showCard });
  };
  addClickHandler = () => {
    this.setState({ showAddCard: true });
  };
  bidHandler = (portId, wareHouseId, portName, destination) => {
    this.setState({
      showBidCard: true,
      selectedPortId: portId,
      selectedwareHouseId: wareHouseId,
      selectedPortName: portName,
      selectedDestination: destination,
      isPort: false,
    });
  };

  changeHandler = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };
  portAddClickHandler = (portId, portName) => {
    this.setState({
      selectedPortId: portId,
      selectedPortName: portName,
      isPort: true,
      showBidCard: false,
    });
  };
  render() {
    const { data, header } = this.props;
    console.log("selectedportName", this.state.selectedportName);

    return (
      <React.Fragment>
        <div className="content-open">
          <div className="data-header">
            <div>
              <div className="small-text">FROM</div>
              <div>
                <img className="anchor-img" src={exporter.anchor} />
              </div>

              <div className="party-name">{header.portName}</div>
            </div>
            <div className="oppor-header-sec">
              <div className="sec-col-header-text  ">APPROX VOLUME</div>
              <div className="lower ">Cont.Per Month</div>
            </div>
            <div>
              <div className="sec-col-header-text  ">{header.suggestedBid}</div>
              <div className="lower ">Per Cont.</div>
            </div>

            <div>
              <div className="third-col-header-text">Approx Total Business</div>
            </div>
          </div>

          <div>
            {data.map((item) => {
              let totalPrice = parseInt(item.price) * item.approxValue;

              totalPrice =
                totalPrice > 1000 ? totalPrice / 1000 + "K" : totalPrice;

              console.log("total1", totalPrice);

              return (
                <React.Fragment>
                  <div className="data-wrapper">
                    <div className="first-col">
                      <div className="small-text left">TO:</div>
                      <div>
                        <img
                          className="warehouse-img"
                          src={exporter.warehouse}
                        />
                      </div>
                      <div className="portName-text">{item.destination}</div>
                    </div>
                    <div className="sec-col">
                      <div className="cont-num ">{item.approxValue}</div>
                    </div>

                    <div className="third-col">
                      <div className="price">${item.price}</div>
                    </div>
                    <div className="fourth-col">
                      <div className="price-total">${totalPrice}</div>
                    </div>
                  </div>
                </React.Fragment>
              );
            })}
            {data.length > 2 && (
              <div className="simple-text">SHOW MORE DESTINATIONS</div>
            )}

            <div className="indiv-total-wrapper">
              <div className="indiv-total">Total</div>
              <div className="total-cont">
                {this.state.header.totalContainers}
              </div>
              {/* <div className="total-price">{this.state.header.totalPrice}</div> */}
              <div className="total-indiv-sum">{}</div>
            </div>

            <div className="grand-action">
              <div className="grand-total-wrapper">
                <div className="grand-total"> Grand Total</div>
                <div className="grand-cont">
                  {this.state.grandTotalContainers}
                </div>
                <div className="grand-price">{this.state.grandTotalPrice}</div>
                <div className="grand-total2">GGG</div>
              </div>
              <div className="action-btn">
                <div>
                  <button className="bid-btn" onClick={this.handleOpenModal}>
                    BID
                  </button>
                  {this.state.showModal && !this.state.isPort ? (
                    <ReactModal
                      isOpen={this.state.showModal}
                      contentLabel="onRequestClose Example"
                      onRequestClose={this.handleCloseModal}
                      className={
                        this.state.showBidCard ? "Modal" : "modal-first"
                      }
                      overlayClassName="Overlay"
                    >
                      {this.state.isPort ? (
                        <Additional />
                      ) : !this.state.showBidCard ? (
                        <React.Fragment>
                          <div className="bid-header">
                            <div className="icon-text">
                              <div
                                style={{ marginLeft: "480px" }}
                                className="img-bidIcon"
                              >
                                <img src={exporter.bidIcon} />
                              </div>
                              <div
                                style={{ marginLeft: "420px" }}
                                className="bid-text"
                              >
                                SUBMIT YOUR BEST BID
                              </div>
                            </div>
                            <img
                              style={{ marginLeft: "320px" }}
                              className="img-close"
                              src={exporter.close}
                              onClick={this.handleCloseModal}
                            />
                          </div>

                          <div className="yout">
                            <div className="bid-data-header">
                              {/* <div style={{paddingTop:"20px",backgroundColor:"white"}}> */}
                              <div className="bid-left-header">
                                <div
                                  style={{
                                    marginTop: "10px",
                                    marginLeft: "10px",
                                  }}
                                  className="small-text "
                                >
                                  FROM
                                </div>

                                <div className="bid-port-header">
                                  <div style={{ marginLeft: "10px" }}>
                                    <img
                                      className="anchor-img"
                                      src={exporter.anchor}
                                    />
                                  </div>
                                  <div className="party-name-bid">
                                    {header.portName}
                                  </div>
                                </div>
                              </div>
                              <div
                                style={{
                                  marginLeft: "640px",
                                  paddingTop: "10px",
                                }}
                                className="collapsible"
                                onClick={this.onArrowClick}
                              >
                                {this.state.showCard ? (
                                  <img
                                    className="arrow-img"
                                    src={exporter.downArrow}
                                  />
                                ) : (
                                  <img
                                    className="arrow-img"
                                    src={exporter.sideArrow}
                                  />
                                )}
                              </div>
                            </div>
                            {/* this.state.showCard &&  */}
                            <div className="bid-body-header">
                              <div className="bid-dest">Destinations</div>
                              {/* <div className="bid-oppor ">Opportunity/month</div>
                                                            <div className= "bid-suggest">Suggested Bid</div> */}
                              <div className="approx-bid">
                                <div className="sec-col-header-bid-text  ">
                                  Approx Volume
                                </div>
                                <div className="lower ">Cont.Per Month</div>
                              </div>
                              <div className="approx-bid-two">
                                <div className="sec-col-header-text-bid  ">
                                  Suggested Bid
                                </div>
                                <div className="lower ">Per Cont.</div>
                              </div>
                              <div className=" approx-bid-three">
                                Approx Total Business
                              </div>
                              <div className="approx-bid-five">
                                <div className=" bid-best">Your Best Bid</div>
                                <div
                                  style={{ marginLeft: "30px" }}
                                  className="lower "
                                >
                                  Per Cont.
                                </div>
                              </div>
                              <div className=" bid-best-your">
                                Your Best Bid Total
                              </div>
                            </div>

                            <div>
                              {data.map((item) => {
                                let totalMoney = parseInt(
                                  item.price * item.approxValue
                                );
                                totalMoney =
                                  totalMoney > 1000
                                    ? totalMoney / 1000 + "K"
                                    : totalMoney;
                                return (
                                  <React.Fragment>
                                    <div className="data-wrapper-bid">
                                      <div className="bid-col one">
                                        <div className="small-text left">
                                          TO:
                                        </div>
                                        <div style={{ marginLeft: "5px" }}>
                                          <img
                                            className="warehouse-img"
                                            src={exporter.warehouse}
                                          />
                                        </div>
                                        <div className="portName-text-bid  ">
                                          {item.destination}
                                        </div>
                                      </div>
                                      <div className="bid-col-two">
                                        {/* <div className="small-text ">APPROX.OPPORTUNITY</div> */}
                                        <div className="bid-cont-num">
                                          {item.approxValue}
                                        </div>
                                        {/* <div className="small-text  ">CONT./MONTH</div> */}
                                      </div>

                                      <div className="bid-col-third">
                                        <div className="bid-item-price ">
                                          ${item["price"]}
                                        </div>
                                        {/* <div style={{marginLeft:"2px"}} className="small-text ">PER CONT.</div> */}
                                      </div>
                                      <div className="price-total">
                                        {totalMoney}
                                      </div>
                                      <div className="bid-price-holder">
                                        <button
                                          onClick={() => {
                                            this.bidHandler(
                                              item.portId,
                                              item.wareHouseId,
                                              item.portName,
                                              item.destination
                                            );
                                          }}
                                          className="bid-price"
                                        >
                                          BID
                                        </button>
                                        {/* <button onClick={this.bidHandler(item.portId,item.wareHouseId,item.portName,item.destination)} className="bid-price">BID</button>                                      */}
                                      </div>
                                      <div className="total-holder">$900K</div>
                                    </div>
                                  </React.Fragment>
                                );
                              })}
                            </div>
                            <div className="indiv-total-wrapper-bid">
                              <div className="indiv-total">Total</div>
                              <div className="total-cont">
                                {this.state.header.totalContainers}
                              </div>
                              {/* <div className="total-price">{this.state.header.totalPrice}</div> */}
                              <div className="total-indiv-sum">{}</div>
                            </div>
                            <div className="pot-add">
                              <div className="pot-text">
                                Potential Additional Charges
                              </div>
                              <div
                                className="bid-price add"
                                onClick={() => {
                                  this.portAddClickHandler(
                                    header.portId,
                                    header.portName
                                  );
                                }}
                              >
                                {" "}
                                ADD
                              </div>
                            </div>
                          </div>

                          <div className="grand-total-bid-holder">
                            <div className="grand-total-bid">GrandTotal</div>
                            <div className="number-one">5000</div>
                            <div className="number-two">6000</div>
                            <div className="number-three">9000</div>
                          </div>

                          <section>
                            <button className="bid-submit">SUBMIT</button>
                            <button className="bid-cancel">CANCEL</button>
                          </section>
                        </React.Fragment>
                      ) : (
                        <React.Fragment>
                          <div className="bid-header">
                            <div className="icon-text">
                              <div className="img-bidIcon">
                                <img src={exporter.bidIcon} />
                              </div>
                              {/* <div className="bid-text">SUBMIT YOUR BEST BID</div> */}
                            </div>
                            <img
                              className="img-close"
                              src={exporter.close}
                              onClick={this.handleCloseModal}
                            />
                          </div>
                          {!this.state.showAddCard ? (
                            <div className="bidcard-wrapper">
                              <div className="bidcard-header">
                                <div
                                  style={{
                                    marginLeft: "50px",
                                    marginTop: "25px",
                                  }}
                                >
                                  <img
                                    className="anchor-img"
                                    src={exporter.anchor}
                                  />
                                </div>
                                <div>
                                  <div
                                    style={{ marginTop: "10px" }}
                                    className="small-text right "
                                  >
                                    FROM
                                  </div>
                                  <div className="party-name right">
                                    {header.portName}
                                  </div>
                                </div>
                                <div className="general-row">
                                  <div className="line"></div>
                                  <div>
                                    <img
                                      style={{ marginTop: "35px" }}
                                      className="warehouse-img"
                                      src={exporter.warehouse}
                                    />
                                  </div>
                                </div>
                                <div className="general-col">
                                  <div
                                    style={{
                                      marginTop: "10px",
                                      marginRight: "20px",
                                    }}
                                    className="small-text  "
                                  >
                                    TO
                                  </div>
                                  <div
                                    style={{ marginRight: "30px" }}
                                    className="party-name "
                                  >
                                    {this.state.selectedDestination}
                                  </div>
                                </div>
                              </div>

                              <section className="internal-box">
                                <form>
                                  <div className="fees-fuel">
                                    <div className="general-col">
                                      <div className="base-fees">
                                        <div className="faded-text">
                                          BASE FEES /LINE HAUL
                                        </div>
                                        <input
                                          className="input-box"
                                          type="text"
                                          name="baseFees"
                                          value={this.state.baseFees}
                                          onChange={this.changeHandler}
                                        />
                                      </div>
                                    </div>
                                    <div className="fuel-inclusion">
                                      <div className="faded-text">
                                        FUEL CHARGES INCUDED
                                      </div>
                                      <div className="yes-no-row">
                                        <input
                                          style={{ marginLeft: "17px" }}
                                          className="radio"
                                          type="radio"
                                          name="yes"
                                          value="YES"
                                        />
                                        <label className="yes-no" for="yes">
                                          YES
                                        </label>
                                        <br></br>

                                        <input
                                          className="radio"
                                          type="radio"
                                          name="no"
                                          value="NO"
                                        />
                                        <label className="yes-no" for="no">
                                          NO
                                        </label>
                                        <br></br>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="fuel-charges ">
                                    <div className="faded-text">
                                      FUEL CHARGES
                                    </div>
                                    <div className="percent-fuel">
                                      <input
                                        style={{
                                          marginLeft: "-1px",
                                          paddingTop: "-10px",
                                          marginRight: "10px",
                                        }}
                                        className="input-box"
                                        type="text"
                                        name="baseFees"
                                        value={this.state.baseFees}
                                        onChange={this.changeHandler}
                                      />
                                      <div>% OF BASE PRICE</div>
                                    </div>
                                  </div>
                                  <div className="fuel-charges">
                                    <div className=" chasis">
                                      <div className="chasis-rental">
                                        <div
                                          style={{ marginLeft: "-1px" }}
                                          className="faded-text "
                                        >
                                          CHASIS RENTAL PER DAY
                                        </div>
                                        <input
                                          style={{ marginLeft: "-1px" }}
                                          className="input-box"
                                          type="text"
                                          name="amount"
                                          value={this.state.chasisAmount}
                                          onChange={this.changeHandler}
                                        />
                                      </div>
                                      <div>
                                        <div className="faded-text">
                                          MINIMUM REQUIRED DAYS
                                        </div>
                                        <input
                                          className="input-box"
                                          type="text"
                                          name="requiredDays"
                                          value={this.state.requiredDays}
                                          onChange={this.changeHandler}
                                        />
                                      </div>
                                    </div>
                                  </div>

                                  <div className="fuel-charges">
                                    <div className="faded-text">Note</div>
                                    <div className="note-text">
                                      PER STATE EXCESSIVE OW FEES
                                    </div>
                                  </div>
                                </form>
                              </section>
                              <div className="additional">
                                Potential Additional Charges
                              </div>
                              <button
                                className="btn-add-bid"
                                onClick={this.addClickHandler}
                              >
                                ADD
                              </button>
                              <section className="best-cont">
                                <div className="best-box">MY BEST BID</div>
                                <div className="cont-bid-box">
                                  <div className="total-per-bid">
                                    ${this.state.total}
                                  </div>
                                  <div className="per-cont">PER CONTAINER </div>
                                </div>
                              </section>
                            </div>
                          ) : (
                            <Additional
                              portName={header.portName}
                              portId={header.portId}
                              selectedDestination={
                                this.state.selectedDestination
                              }
                              isPort={this.state.isPort}
                            />
                          )}

                          <div>
                            <button className="btn-done">DONE</button>
                            <button className="cancel-btn">CANCEL</button>
                          </div>
                        </React.Fragment>
                      )}
                    </ReactModal>
                  ) : null}
                </div>

                <button className="decline-btn">DECLINE</button>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Card;

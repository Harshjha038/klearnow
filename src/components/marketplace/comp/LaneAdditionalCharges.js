import React from "react";
// import "./partner-styles.scss";


class LaneAdditionalCharges extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: this.props.showBidCard,
      chasisAmount: 60,
    };
  }
  handleOpenModal = () => {
    this.setState({ showModal: true });
  };

  handleCloseModal = () => {
    this.setState({ showModal: false });
  };

  render() {
    //  const{portId,wareHouseId}=this.state
    return (
      <div>

        <div>

        <div className="bid-header">
            <div className="icon-text">
                <div className="img-bidIcon"><img src="images/files/bid-icon.svg" /></div>
                <div  className="bid-text-modal">SUBMIT YOUR BEST BID</div>
            </div>
            <img style={{ marginLeft: "90px" }} className="img-close" src="images/files/close.svg" onClick={this.handleCloseModal} />
        </div>

        </div>
        <div className="bidcard-wrapper">
          <div className="bidcard-header">
            <div style={{ marginLeft: "50px", marginTop: "25px" }}>
              <img className="anchor-img" src="images/files/anchor.svg" />
            </div>
            <div>
              <div style={{ marginTop: "10px" }} className="small-text right ">
                FROM
              </div>
              <div className="party-name right">portName</div>
            </div>
            <div className="general-row">
              <div className="line"></div>
              <div>
                <img
                  style={{ marginTop: "35px" }}
                  className="warehouse-img"
                  src="images/files/warehouse.svg"
                />
              </div>
            </div>
            <div className="general-col">
              <div
                style={{ marginTop: "10px", marginRight: "20px" }}
                className="small-text  "
              >
                TO
              </div>
              <div style={{ marginRight: "30px" }} className="party-name ">
                {!this.props.isPort ? this.props.selectedDestination : null}
              </div>
            </div>
          </div>

          <div className=" add-head-text">Potential additional charges</div>
          <div className="line-add"></div>

          <div>
            <div className="add-header">
              <div className="title-one">
                <input
                  type="checkbox"
                  id="select"
                  name="selectAll"
                  value="SelectAll"
                />
                <label className="select" for="select">
                  Select
                </label>
              </div>
              <div className="title-two">Price Per Unit</div>
              <div className="title-three">Req. Per Unit</div>
              <div className="title-four">Total</div>
            </div>
            <div style={{ marginTop: "-10px" }} className="line-add"></div>
            <div className="add-header-row">
              <div className="first-box">
                <input
                  className="check"
                  type="checkbox"
                  id="chasis"
                  name="chasis"
                  value="chasis"
                />
                <label className="charges-text" for="chasis">
                  Chasis Rental
                </label>
              </div>
              <div className="general-row second">
                <input
                  className="input-box-small"
                  type="text"
                  name="amount"
                  value={this.state.chasisAmount}
                  onChange={this.changeHandler}
                />
                <div style={{ marginLeft: "10px" }} className="per-day-box">
                  Per Day
                </div>
              </div>
              <input
                className="  input-box-small third "
                type="text"
                name="amount"
                value={this.state.chasisAmount}
                onChange={this.changeHandler}
              />

              <div className="per-day-box fourth"></div>
            </div>
            <div className="line-add"></div>
            <div className="add-header-row">
              <div className="first-box">
                <input
                  type="checkbox"
                  id="chasis"
                  name="chasis"
                  value="chasis"
                />
                <label className="charges-text" for="chasis">
                  Container Storage
                </label>
              </div>
              <div className="general-row second">
                <input
                  className="input-box-small"
                  type="text"
                  name="amount"
                  value={this.state.chasisAmount}
                  onChange={this.changeHandler}
                />
                <div style={{ marginLeft: "10px" }} className="per-day-box">
                  Per Day
                </div>
              </div>
              <input
                className="  input-box-small third "
                type="text"
                name="amount"
                value={this.state.chasisAmount}
                onChange={this.changeHandler}
              />

              <div className="per-day-box fourth"></div>
            </div>
            <div className="line-add"></div>
            <div className="add-header-row">
              <div className="first-box">
                <input
                  type="checkbox"
                  id="chasis"
                  name="chasis"
                  value="Schasis"
                />
                <label className="charges-text" for="chasis">
                  Drayage Detention
                </label>
              </div>
              <div className="general-row second">
                <input
                  className="input-box-small"
                  type="text"
                  name="amount"
                  value={this.state.chasisAmount}
                  onChange={this.changeHandler}
                />
                <div style={{ marginLeft: "10px" }} className="per-day-box">
                  Per Day
                </div>
              </div>
              <input
                className="  input-box-small third "
                type="text"
                name="amount"
                value={this.state.chasisAmount}
                onChange={this.changeHandler}
              />

              <div className="per-day-box fourth"></div>
            </div>
            <div className="line-add"></div>
          </div>
          <div className="line-two"></div>
          <div className="add-additional">ADD  ADDITIONAL </div>
          <section   className="best-cont">
            <div className="best-box-add">TOTAL ADDITIONAL CHARGES</div>
            {/* <div>This will add to your total bid</div> */}
            <div style={{ marginLeft: "-48px",marginTop:"40px" }} className="cont-bid-box">
              <div className="total-per-bid">$150</div>
              <div style={{marginTop:"40px"}} className="per-cont">PER CONT. </div>
            </div>
          </section>
        </div>
       
        <div>
            <button className="btn-done" onClick={this.props.bidAdditionalChargeHandler} >DONE</button>
                                                                
            <button className="cancel-btn">CANCEL</button>
       </div>
       </div>
     
    );
  }
}

export default LaneAdditionalCharges;
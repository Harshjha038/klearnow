import React from "react";
import _ from "lodash";
import { DrayageInvoices } from "KN-Drayage-UI";
import 'semantic-ui-css/semantic.min.css'


class DrayageInvoice extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      progressStatus: 0,
    };
  }

  setProgressStatus = (value) => {
    this.state({progressStatus: value});
  }

  


  renderDrayageInvoices = () => {
    return (
      // Need to add api for undo
      <DrayageInvoices
        progressStatus = {this.state.progressStatus}
        userType= {"DRAY_PARTNER"}
        invoiceContainerNumber = {this.props.invoiceContainerNumber}
        invoiceContainer = {this.props.invoiceContainer}
      />
    );
  };

  render() {
    const { state: { isLoading }  } = this;
    return (
      <div>
        {isLoading && <div className='loading' style={{position: "absolute",top: "65px",zIndex: 1,left: "25px", background: "#fff", padding: "3px 10px"}}> Loading... </div> }
        {this.renderDrayageInvoices()}
      </div>
    );
  }
}


export default DrayageInvoice;
import React from "react";
import { getContainerList } from "../container/api";
import _ from "lodash";
import { ContainerTrackingApp } from "KN-Drayage-UI";
import 'semantic-ui-css/semantic.min.css'
import { uploadImageFileData, updateDrayagePartnerGateInFileData } from "../../actions/Container";
import { getEntityTime, getVesselsPortsLvl1, getPortsLvl2,getVesselsLvl2, undoEntityEvent, exportContainers, getCommentPerContainer} from '../container/api';

class ContainerApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      progressStatus: 0,
      errorInFileUpload: false,
    };
  }

  setProgressStatus = (value) => {
    this.setState({progressStatus: value});
  }

  uploadFile = async (image) => {
    if (image) {
      try {
        let filename = `${Date.now()}_${image.name}`;
        let bodyFormData = new FormData();
        bodyFormData.append("files", image, filename);
  
        let response = await uploadImageFileData(bodyFormData, window._env_.DRAYAGE_PARTNER_DOC_BUCKET, this.setProgressStatus);
        let str = response.data.msg;
        let firstIndex = str.indexOf("[");
        let lastIndex = str.indexOf("]");
        const finalString = str.substring(firstIndex + 1, lastIndex);
        console.log("checking finalString", finalString);
        return finalString;

      } catch (error) {
        this.setState({errorInFileUpload: true});
      }
    }
};


  renderContainerList = () => {
    return (
      // Need to add api for undo
      <ContainerTrackingApp
        getContainerList={getContainerList}
        getEntityTime={getEntityTime}
        getVesselsPortsLvl1={getVesselsPortsLvl1}
        getVesselsLvl2={getVesselsLvl2}
        getPortsLvl2={getPortsLvl2}
        undoEntityEvent={undoEntityEvent}
        uploadFile={this.uploadFile}
        progressStatus = {this.state.progressStatus}
        getCommentPerContainer={getCommentPerContainer}
        errorInFileUpload = {this.state.errorInFileUpload}
        getCommentPerContainer={getCommentPerContainer}
        userType= {"DRAY_PARTNER"}
        updateDrayagePartnerGateInFileData = {updateDrayagePartnerGateInFileData}
        exportContainers={exportContainers}
        handlePortal = {this.props.handlePortal}
      />
    );
  };

  renderSelectedContainers = (params)=>{
   return params.map((item)=>{
      return <p>{item}</p>
    })
  };

  resetContainer = ()=>{
    var ele=document.getElementsByTagName('input');  
    for(var i=0; i<ele.length; i++){  
        if(ele[i].type=='checkbox')  
            ele[i].checked=false;
    }
  };

  render() {
    const { state: { isLoading }  } = this;
    return (
      <div className="container-app">
        {/* <div> */}

        {/* <div  className="selected-number" > Number of selected container(s) : <span> {entityIdData.length} </span> 
            <div className="selected-list">
               {this.renderSelectedContainers(entityIdData)}
            </div>
         </div> */}
         {/* <button className={"ui primary button selected-reset-button"} onClick={this.resetContainer} disabled={entityIdData.length ===0}>Reset container(s) </button> */}
        {isLoading && <div className='loading' style={{position: "absolute",top: "65px",zIndex: 1,left: "25px", background: "#fff", padding: "3px 10px"}}> Loading... </div> }
        {this.renderContainerList()}
        {/* {containerData.length>0 && isCount && <div className='loading' style={{position: "absolute",top: "36px",zIndex: 999,left: "25px", background: "#fff", padding: "3px 10px"}}> Showing {pageNumber*containerData.length} of {totalListEl}</div>} */}
      </div>
    );
  }
}


export default ContainerApp;

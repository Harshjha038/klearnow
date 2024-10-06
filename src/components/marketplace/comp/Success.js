import React from 'react'
import ReactModal   from 'react-modal'
//import images from "../images"


export default function Success(props) {
    return (
        <div>

            
            <div className="contents">
            <img style={{marginLeft:"150px",marginTop:"-70px" }}    src="images/files/success.svg"  />
             <div className="text-success-bid" style={props.bidOperationType === "UPDATE_BID"? {marginLeft: "0px"} : null} >
             {props.isFromEdit ? props.bidOperationType === "SAVE"? "Your Edits Have Been Saved Successfully.":props.bidOperationType === "UPDATE_BID"?"Bid Re-Submitted Successfully.":props.bidOperationType === "DISCARD"?"Your Edits Have Been Discarded Successfully." :"": "Bid Submitted Successfully."}
             </div>
             <div style={{marginLeft:"-150px"}} className="email-success">
             {props.bidOperationType === "SAVE"? "Please remember to RE-SUBMIT your bid in order to send the updated bid for approval":props.bidOperationType === "UPDATE_BID"?"Hold tight. We are reviewing your bid. You can view your submitted Bid in the SUBMITTED Tab.":props.bidOperationType === "DISCARD"?"" : "Hold tight. We are reviewing your bid. You can view your submitted Bid in the SUBMITTED Tab."}
                </div>
             <div>
             <button style={{marginLeft:"120px"}} onClick={()=>{props.bidAfterSubmitDoneHandler()}}  className="btn-done">Done</button>
           
             </div>
             </div>


              


            
        </div>
    )
}

import React from 'react'
import ReactModal   from 'react-modal'
//import images from "../images"


export default function Failure(props) {
    return (
        <div>

             <ReactModal
                isOpen={true}
                contentLabel="onRequestClose Example"
               // onRequestClose={this.props.handleCloseModal}
                className= "modal-first"
                overlayClassName="Overlay"
             >

               <div className="bid-header">
                <div className="icon-text">
                  <div style={{ marginLeft: "460px",marginTop:"1px" }} className="img-bidIcon">
                    <img src="images/files/bid-icon.svg" />
                  </div>
                  
                </div>
                
              </div>
             <div className="contents">
            <img style={{marginLeft:"160px"}}    src="images/files/success.svg"  />
             <div  style={{marginLeft:"0px"}}className="text-success">Bid Submission Failed</div>
             <div>
             <button style={{marginLeft:"130px"}} onClick={()=>{props.bidAfterSubmitDoneHandler()}}  className="btn-done">Done</button>
           
             </div>
             </div>


              </ReactModal>

            
        </div>
    )
}

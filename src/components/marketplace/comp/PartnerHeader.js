import React from "react"
// import "./partner-styles.scss";
import exportImages from "../images/exporter"

  const PartnerHeader = (props)=>{

    return(
        <div>
            <div className="main-header-holder">
              <div className="left-items-header">
                    <div className="img-burger" ><img src={exportImages.burgerMenu}/></div>
                    <div className="img-logo">LOGO</div>
                    <div className="main-header-text">DRAYAGE PARTNERS PORTAL</div>
              </div> 
                <div className= "kleardray-btn">KLEARDRAY</div>

            </div>

        </div>

    )

}

export default PartnerHeader
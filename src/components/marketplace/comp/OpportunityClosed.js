import React, { Component } from 'react'
import exporter from "../images/exporter"
// import "./partner-styles.scss"


export default class OpportunityClosed extends Component {
    constructor(props){
        super(props)
        this.state={
 
        }
       }
    render() {
        
        console.log("OpprtunitiesClosed page")
        console.log("OpprtunitiesClosed customer:",this.props.customer)
        console.log("OpprtunitiesClosed customer:",this.props.opportunity.opportunityName)
        let opportunityName=this.props.opportunity.opportunityName

        return (
            <div>
                <section>
                    <div className="party-name-wrapper">
                        <div className="partyName-date">
                            <div className="collapsible" onClick={this.props.onButtonClick}>
                                {this.props.isOpen ? (
                                    <img className="arrow-img" src="/images/files/downArrow.svg" />
                                ) : (
                                    <img className="arrow-img" src="/images/files/sideArrow.svg" />
                                )}
                            </div>
                            <div className="oppor-name-text">{opportunityName.toUpperCase()} </div>

                            <div className="expiry-date">VALID TILL:{this.props.opportunity.endDate} </div>
                        </div>

                        {/* <div className="mid-sec">
                            <div className="very-small-text">
                                {"TBD"}, PORTS,{header.numberofDestinations}{" "}
                                DESTINATIONS
                            </div>

                            <div>{header.totalContainers}</div>
                            <div className="small-text">APPROX.CONT./MONTH</div>
                        </div> */}
                    </div>
                </section>
            </div>
        )
    }
}

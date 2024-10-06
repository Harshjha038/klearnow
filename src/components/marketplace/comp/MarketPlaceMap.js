import React, { Component } from 'react'
import MapComponent from "./MapComponent"

export default class MarketPlaceMap extends Component {

    
    render() {
      let googleMap = null
      const GOOGLEMAPKEY = 'AIzaSyCLz2cTUf9oX-8YJySE_DhskzIZgIEADso';
      let center = [48,-150] 

      try {
       googleMap =  <MapComponent
        bootstrapURLKeys={GOOGLEMAPKEY}
        // mapLoaded={this.props.mapLoaded}
        // onChange={this.onChange}
        // onMarkerHover={this.onMarkerHover}
        // onChildClick={this.onChildClick}
        // onDrag={this.onDrag}
        // activeMarker={this.props.activeMarker}
        // selectedShipmentId={this.props.selectedShipmentId}
        center={center}
        // zoom={this.props.zoom}
        // fixed={this.props.fixed}
        // dragging={this.props.dragging}
        // markers={filteredShipments || shipments}
        map={this.props.map}
        maps={this.props.maps}
        // route={this.props.route}
        hoveredRoute={null}
        // markerHover={this.props.markerHover}
        // vesselDetailList={vesselDetailList}
        // portDetailList={portDetailList}
        // updateShipmentFilters={updateShipmentFilters}
        // containerDetailList={containerDetailList}
        // shipmentError={shipmentError}
        // isWhiteLabel ={isWhiteLabel}
        // wlCustomerName={wlCustomerName}
        // flights={flights}
        // addressLocDetails={addressLocDetails}
        // searchTab={this.props.searchTab}
        // airportDetails = {airportDetails}
        // crossBorderDetails = {crossBorderDetails}
        // flightPortDetails = {flightPortDetails}
        // userInitialData={this.props.userInitialData}  

      />
      } catch (error){
        console.log("Google map error", error)
      }
    // );
      
      return googleMap
    }
}


import React, { Component } from 'react'
import GoogleMap from "google-map-react";

export default class MapComponent extends Component {
    _onGoogleApiLoaded = ({ map, maps }) => {
        console.log("_onGoogleApiLoaded :: map/maps ", map, maps, map? map.getCenter() : null)
        this.setState({map: map, maps:maps})
        // this.props.mapLoaded({ map, maps });
        // this.renderPolylines(map, maps)
        // this.apiIsLoaded(map, maps)
    
    };

    googleMapConfigOptions = (maps) => {
        return (
          {
            fullscreenControl: false,
            zoomControl: true,
            zoomControlOptions: {
              position: 3 // top_right
            },
            gestureHandling: 'cooperative',
            mapTypeControl: true,
            mapTypeControlOptions: {
              mapTypeIds: [
                'satellite',
                'roadmap'
              ]
            }
          }
        )
      }

    render() {
        return (
            <React.Fragment>
              {/* <div style={{ height: "20px", color : "red" }}></div> */}
              {/* <div>
                     <div className="A">Element A</div>
                       <br></br>
                     <div className="B">Element B</div>
                    <LineTo from="A" to="B" style={{borderColor:"red"}}/>
              </div> */}
      
              <div style={{ height:"100vh", display:"flex", flexDirection:"row", zIndex:"-10"}}>
                {/* <div style={{height:"7%", width:"1%", backgroundColor:"red"}} >  This is on top </div>   */}
                <GoogleMap
                  bootstrapURLKeys={{ key: this.props.bootstrapURLKeys }}
                  center={this.props.center}
                  defaultZoom={1}
                //   zoom={this.props.zoom}
                  // onChildClick={this._onChildClick}
                  onGoogleApiLoaded={this._onGoogleApiLoaded}
                  yesIWantToUseGoogleMapApiInternals
                  options={this.googleMapConfigOptions()}
                  // defaultZoom={1}
                  // onChange={this.props.onChange}
                  // onChildMouseEnter={this._onChildMouseEnter}
                  // onChildMouseLeave={this._onChildMouseLeave}
                  // onDrag={this.props.onDrag}
                  // onGoogleApiLoaded={({ map, maps }) => this.apiIsLoaded(map, maps)}
                >
                  
                </GoogleMap>  
              </div>
          
              {/* {selectedShipmentId !== -1 && route !== null && <PolyLine map={map} maps={maps} route={route} />}
              {activeMarker !== -1 && hoveredRoute !== null && <PolyLine map={map} maps={maps} route={route} />} */}
            </React.Fragment>
        );
    }
    
}

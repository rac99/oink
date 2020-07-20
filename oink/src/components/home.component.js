import React, { Component} from 'react'

// insert your API key
const GOOGLE_MAP_API_KEY='';

export default class GoogleMap extends Component {
    
    constructor(props) {
        super(props);
        this.state = {};
        this.googleMapRef = React.createRef();
    }

    componentDidMount() {
        const googleMapScript = document.createElement('script');
        googleMapScript.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAP_API_KEY}&libraries=places`;
        window.document.body.appendChild(googleMapScript);
    
        googleMapScript.addEventListener("load", () => {
            this.googleMap = this.createGoogleMap();
            this.marker = this.createMarker();
        });
    }

  createGoogleMap = () =>
    new window.google.maps.Map(this.googleMapRef.current, {
      zoom: 8,
      center: {
        lat: 43.642567,
        lng: -79.387054,
      },
      disableDefaultUI: true,
    })

    // Still need to figure out how to create a marker for each point
    createMarker = () =>
            new window.google.maps.Marker({
            position: { lat: 43.642567, lng: -79.387054 },
            map: this.googleMap,
        })
 

  render() {
    return (
      <div
        id="google-map"
        ref={this.googleMapRef}
        style={{ width: '1100px', height: '700px' }}
      />
    )
  }
}
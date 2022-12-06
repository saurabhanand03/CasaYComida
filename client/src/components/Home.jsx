import React from "react";
import {
    GoogleMap,
    useLoadScript,
    Marker,  
    InfoWindow
} from "@react-google-maps/api";
// import {formatRelative} from "data.fns";
// import "@reach/combobox/styles.css";

import { mapStyles } from '../mapStyles';
import HamburgerMenu from './HamburgerMenu';

const mapContainerStyle = {
  width: '100vw',
  height: 'calc(100vh - 65px)'
}

const center = {
  lat: 29.651979,
  lng: -82.325020
}

const options = {
  styles: mapStyles,
}


const foodBanks = []

export default function Home(props){
  const {isLoaded, loadError} = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY
  })

  const [markers, setMarkers] = React.useState([]);

  if(loadError) return "Error loading Maps";
  if(!isLoaded) return "Loading Maps...";
  
  
  return <div>

    <div className="header">
      <HamburgerMenu/>
      <h1 className="title">Casa Y Comida</h1>
    </div>


    <GoogleMap 
        mapContainerStyle={mapContainerStyle} 
        zoom={12} 
        center={center}
        options={options}
        onClick={(event) =>
            setMarkers(current => [...current, {
              lat: event.latLng.lat(),
              lng: event.latLng.lng(),
              time: new Date()
            }])  
        }
        
    >
      <div>
        <button className="map-button-two">Food Banks</button>
        <button className="map-button">Shelters</button>
        <button className="map-button-three">Daycares</button>
      </div>

      <Marker key={1} position={{lat: 29.660761, lng: -82.328529}}/>
    </GoogleMap>


  </div>;
}
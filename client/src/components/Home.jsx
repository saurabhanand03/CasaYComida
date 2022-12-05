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

export default function Home(props){
  const {isLoaded, loadError} = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY
  })

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
    ></GoogleMap>

  </div>;
}
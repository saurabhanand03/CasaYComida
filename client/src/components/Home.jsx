import React from "react";
import {
    GoogleMap,
    useLoadScript,
    Marker,  
    InfoWindow
} from "@react-google-maps/api";
// import {formatRelative} from "data.fns";
// import "@reach/combobox/styles.css";

const mapContainerStyle = {
  width: '100vw',
  height: '100vh'
}
const center = {
  lat: 29.651979,
  lng: -82.325020
}

export default function Home(props){
  const {isLoaded, loadError} = useLoadScript({
    googleMapsApiKey: "AIzaSyD3QW73Wk9kvkLjqo1RuWiindX6ZW41n9Y"
  })

  if(loadError) return "Error loading Maps";
  if(!isLoaded) return "Loading Maps...";
  
  
  return <div>
    <GoogleMap mapContainerStyle={mapContainerStyle} zoom={12} center={center}></GoogleMap>
  </div>;
}
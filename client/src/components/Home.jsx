import React from "react";
import {
    GoogleMap,
    useLoadScript,
    Marker,  
    InfoWindow,
    MarkerClusterer
} from "@react-google-maps/api";

import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption,
} from "@reach/combobox";
import "@reach/combobox/styles.css";

import { mapStyles } from '../mapStyles';
import { markerLocations } from '../markerLocations';
import HamburgerMenu from './HamburgerMenu';

const libraries = ["places"];
const mapContainerStyle = {
  width: '100vw',
  height: 'calc(100vh - 65px)'
};
const center = {
  lat: 29.651979,
  lng: -82.325020
};
const options = {
  styles: mapStyles,
};

export default function Home(props){
  const {isLoaded, loadError} = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries
  });
  // useState causes react to rerender
  const [markers, setMarkers] = React.useState([]);
  const [selected, setSelected] = React.useState(null);

  const onMapClick = React.useCallback((event) => {
    setMarkers(current => [
      ...current,
      {
        lat: event.latLng.lat(),
        lng: event.latLng.lng(),
      },
    ]);
  }, []);

  // useRef retains state without causing rerenders
  const mapRef = React.useRef();
  const onMapLoad = React.useCallback((map) => {
    mapRef.current = map;
  }, []);

  const panTo = React.useCallback(({lat, lng}) => {
    mapRef.current.panTo({ lat, lng });
    mapRef.current.setZoom(16);
  }, []);

  if(loadError) return "Error loading Maps";
  if(!isLoaded) return "Loading Maps...";
  
  return <div>
    <div className="header">
      <HamburgerMenu/>
      <h1 className="title">Casa Y Comida</h1>
    </div>

    <Search panTo={panTo} />
    <Locate panTo={panTo} />

    <GoogleMap 
        mapContainerStyle={mapContainerStyle} 
        zoom={12} 
        center={center}
        options={options}
        onLoad={onMapLoad}
    >
  
    <div>
      <button className="map-button-two">Food Banks</button>
      <button className="map-button">Shelters</button>
      <button className="map-button-three">Daycares</button>
    </div>
    
      {markerLocations.map((marker) => (
        <Marker
          key={marker.name}
          position={{ lat: marker.lat, lng: marker.lng }}
          onClick={() => {
            setSelected(marker);
          }}
        />
      ))}
      {/* <Marker key={"anm"} position={markerLocations[0].coords} />
      <Marker key={"bo"} position={markerLocations[1].coords} />
      <Marker key={"ce"} position={markerLocations[2].coords} />
      <Marker key={"da"} position={markerLocations[3].coords} />
      <Marker key={"ef"} position={markerLocations[4]} /> */}
      <Marker key={1} position={center} />
      {markers.map((marker) => (
        <Marker
          key={`${marker.lat}-${marker.lng}`}
          position={{ lat: marker.lat, lng: marker.lng }}
          onClick={() => {
            setSelected(marker);
          }}
        />
      ))}

      {selected ? (
        <InfoWindow
          position={{lat: selected.lat, lng: selected.lng}}
          onCloseClick={() => {
            setSelected(null);
          }}
        >
          <div className="info-window-text">
            <h2>Marker</h2>
            <p>marker</p>
          </div>
        </InfoWindow>
      ) : null}
    </GoogleMap>
  </div>;
}

function Locate({ panTo }) {
  return (
    <button
      className="locate-button"
      onClick={() => {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            panTo({
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            });
          },
          () => null
        );
      }}
    >
      <img src="Ic_my_location_48px.svg" alt="compass - locate me" />
    </button>
  )
}

function Search({ panTo }) {
  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    requestOptions: {
      location: {
        lat: () => 29.651979,
        lng: () => -82.325020
      },
      radius: 200 * 1000,
    },
  });

  return (
    <div className="search-box">
      <Combobox
        onSelect={async (address) => {
          setValue(address, false);
          clearSuggestions()

          try {
            const results = await getGeocode({ address });
            const { lat, lng } = await getLatLng(results[0]);
            panTo({ lat, lng });
          } catch(error) {
            console.log("error!")
          }
        }}
      >
        <ComboboxInput
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
          }}
          disabled={!ready}
          placeholder="Enter an address"
        />
        <ComboboxPopover>
          <ComboboxList>
            {status === "OK" &&
              data.map(({ id, description }) => (
                <ComboboxOption key={id} value={description} />
            ))}
          </ComboboxList>
        </ComboboxPopover>
      </Combobox>
    </div>
  )
}
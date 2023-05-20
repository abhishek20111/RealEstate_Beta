import React, {useState, useEffect} from "react";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import mrk from "../../asset/placeholder.png";

export default function GoogleMap1(props) {
  const { isLoaded } = props;

  const containerStyle = {
    width: "auto",
    height: "400px",
    display:"flex",
    margin:"auto"
  };

  const center = {
    lat: parseFloat(props.lat) || 0,
    lng: parseFloat(props.lng) || 0
  };

  const [target, setTarget] = useState(center);

  useEffect(() => {
    setTarget(center);
  }, [props.lat, props.lng]);

  

  return (
    isLoaded && (
      <div className="m-3">
        <GoogleMap mapContainerStyle={containerStyle} center={target} zoom={10}>
          <Marker
            position={target}
            icon={{ 
              url: mrk,
              scaledSize: new window.google.maps.Size(40, 40),
              origin: new window.google.maps.Point(0, 0),
              anchor: new window.google.maps.Point(20, 20)
            }}
          />
        </GoogleMap>
      </div>
    )
  );
}
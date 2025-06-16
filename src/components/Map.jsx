import React from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

const defaultCenter = {
  lat: 29.323102,
  lng: 79.141418,
};

const Map = ({ projectTitle, latitude, longitude }) => {
  const center =
    latitude && longitude ? { lat: latitude, lng: longitude } : defaultCenter;

  /* Mobile: 300 px.  Desktop: let parent dictate (100 %). */
  const mapHeight =
    typeof window !== "undefined" && window.innerWidth < 768 ? "300px" : "100%";

  const containerStyle = {
    width: "100%",
    height: mapHeight,
    borderRadius: "0.5rem",
  };

  return (
    <div className="relative w-full h-full overflow-hidden shadow-md rounded-lg">
      <LoadScript googleMapsApiKey="AIzaSyAFrqjqk0SjeH4kKzLiYoI08div5TuO1TI">
        <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={15}>
          <Marker position={center} />
        </GoogleMap>
      </LoadScript>

      <div className="absolute bottom-4 left-4 bg-white px-3 py-2 rounded shadow text-sm font-medium text-gray-900">
        {projectTitle}
      </div>
    </div>
  );
};

export default Map;

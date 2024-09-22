// components/Map.js
"use client";
import { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;

const Map = () => {
  const mapContainer = useRef(null); // Map container reference
  const map = useRef(null); // Mapbox map instance reference
  const [lng, setLng] = useState(0); // Longitude
  const [lat, setLat] = useState(0); // Latitude
  const [zoom, setZoom] = useState(14); // Zoom level

  // Effect to initialize the map when the component mounts
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        setLat(latitude);
        setLng(longitude);

        // Initialize the map
        if (map.current) return; // If map is already initialized, exit

        map.current = new mapboxgl.Map({
          container: mapContainer.current,
          style: "mapbox://styles/mapbox/streets-v11", // Map style
          center: [longitude, latitude], // Center on user's location
          zoom: zoom, // Initial zoom level
        });

        // Add navigation controls (zoom, rotate, etc.)
        map.current.addControl(new mapboxgl.NavigationControl());
      });
    }
  }, [lat, lng, zoom]);

  return (
    <div className="ml-10 w-3/4">
      {/* Map container div */}
      <div
        ref={mapContainer}
        style={{
          width: "100%",
          height: "100vh",
        }}
      />
    </div>
  );
};

export default Map;

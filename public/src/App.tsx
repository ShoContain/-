import { FormEvent, useCallback, useState } from "react";
import "./App.css";
import "leaflet/dist/leaflet.css";

import "firebase/compat/auth";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import axios from "axios";
import { LatLngExpression } from "leaflet";

function App() {
  const [count, setCount] = useState(0);
  const [searchText, setSearchText] = useState("名古屋城");
  const [center, setCenter] = useState({
    lat: 35.1816051,
    lng: 136.9054953,
  });

  const doSearch = useCallback(async (e: FormEvent) => {
    e.preventDefault()
    const res = await axios.get("https://nominatim.openstreetmap.org/search", {
      params: {
        q: searchText,
        format: "json",
        "accept-language": "ja",
        limit: 1,
      },
    });
    if (res.data.length > 0) {
      const center = res.data[0];

      setCenter({ lat: center.lat, lng: center.lon });
    }
  }, [searchText, setSearchText]);

  const ChangeMapView = ({ center }: { center: LatLngExpression }) => {
    const map = useMap();
    map.setView(center, map.getZoom());
    return null;
  };

  return (
    <div className="container mx-auto">
      <div className="flex my-5">
        <form onSubmit={doSearch}>
          <input
            type="text"
            className="inline-flex items-center p-2.5 text-sm border border-r-2.5  bg-gray-200 text-gray-900"
            value={searchText}
            onChange={(e) => {
              setSearchText(e.target.value);
            }}
          />
          <button
            type="submit"
            className="rounded-none rounded-r-lg p-2.5  bg-gray-50"
          >
            Search
          </button>
        </form>
      </div>
      <MapContainer center={center} zoom={16} scrollWheelZoom={false}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[center.lat, center.lng]}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
        <ChangeMapView center={center} />
      </MapContainer>
    </div>
  );
}

export default App;

import "./map.css";
import { useEffect, useState } from "react";
import { Marker, MapContainer, TileLayer, useMapEvents } from "react-leaflet";
import L from "leaflet";
import "leaflet-gpx";
import "leaflet/dist/leaflet.css";
import GPXLayer from "../gpxMapLayer/gpxMapLayer";
import { v4 as uuidv4 } from "uuid";
import closestPoints from "../../helperFunctions/closestPoint";
import routeCalculation from "../../helperFunctions/routeCalculation";
import DBService from "../../services/DBService";
import { Button } from "@mui/material";
import DetailSummary from "../detailSummary/detailSummary";
import SearchResultScreen from "../searchResultScreen/searchResultScreen";
import Settings from "../settings/settings";
import TripDetailsScreen from "../tripDetailsScreen/tripDetailsScreen";
import { DynamicMarkers, MarkerInterface } from "../../Interfaces/interfaces";

// set icon for placed markers
const defaultIcon = L.icon({
  iconUrl: "/map-pin.svg",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const MapComponent = () => {
  const gpxFile = "/WHW.gpx";
  const [gpxRoute, setGpxRoute] = useState<File>();
  const [markers, setMarkers] = useState<DynamicMarkers>({});
  const [selectedMarker, setSelectedMarker] = useState<MarkerInterface | null>();
  const [detailsClicked, setDetailsClicked] = useState(false);
  const [settingsClicked, setSettingsClicked] = useState<Boolean>(false);
  const [settingsData, setSettingsData] = useState({
    distance: "km",
    speed: 3,
  });

  const setGpxRouteFunc = (route: File) => {
    setGpxRoute(route);
  };

  useEffect(() => {
    DBService.getMarkers("aidan@test.com").then((data) => {
      if (data) {
        const dataOut: any = data.reduce((acc: any, curr: any) => {
          acc[curr._id] = curr;
          return acc;
        }, {});
        setMarkers(dataOut);
        if (dataOut && Object.keys(dataOut).length > 0) {
          const firstMarker = dataOut[Object.keys(dataOut)[0]];
          if (firstMarker.walkingSpeed) {
            setSettingsData((prev) => ({
              ...prev,
              speed: firstMarker.walkingSpeed,
            }));
          }
        }
      }
    });
  }, []);

  // handler from marker being added to map
  const MapClickHandler = () => {
    useMapEvents({
      click: async (e: any) => {
        const { lat, lng } = e.latlng; // get position of click
        if (gpxRoute) {
          const closestPoint = closestPoints([lat, lng]); // snap clicked position to route
          const newMarker: MarkerInterface = {
            _id: uuidv4(),
            user_id: "aidan@test.com",
            position: L.latLng([closestPoint[1], closestPoint[0]]),
            hotel: "",
            prevDist: { dist: 0, time: 0 },
            nextDist: { dist: 0, time: 0 },
            walkingSpeed: settingsData.speed,
            distanceMeasure: settingsData.distance,
          };
          // update markers state and add maker to database
          let updatedMarkers: DynamicMarkers = {
            ...markers,
            [newMarker._id]: newMarker,
          };
          const calculatedMarkers = await routeCalculation(
            Object.values(updatedMarkers),
            settingsData
          );
          setMarkers(calculatedMarkers);
          DBService.addMarker(
            "aidan@test.com",
            calculatedMarkers[newMarker._id],
            calculatedMarkers,
            settingsData
          );
          // timeout to make sure point is added to state.
          setTimeout(() => {
            setSelectedMarker(calculatedMarkers[newMarker._id]);
          }, 100);
        }
      },
    });
    return null;
  };

  // handler for placed marker being clicked
  const MarkerClickHandler = (marker: any): void => {
    if (marker) {
      setSelectedMarker(marker);
    } else {
      console.error("Marker not found in state");
    }
  };

  // handler from tripDetails button being clicked
  const TripDetailsClickHandler = () => {
    setDetailsClicked(true);
  };

  const closeSearchOverlay = () => {
    setSelectedMarker(null); // Hide the overlay
  };

  const closeDetailsOverlay = () => {
    setDetailsClicked(false); // Hide the overlay
  };

  const closeSettingsOverlay = () => {
    setSettingsClicked(false); // Hide the overlay
  };

  return (
    <>
      <div className="mapContainer">
        <MapContainer
          minZoom={9}
          style={{ height: "100vh", width: "100%" }}
          zoomControl={false}
          scrollWheelZoom={!selectedMarker}
          dragging={!selectedMarker}
          touchZoom={!selectedMarker}
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <GPXLayer gpxFile={gpxFile} passRoute={setGpxRouteFunc} />
          {Object.values(markers || {}).map((marker) => {
            const m = marker as MarkerInterface;
            return (
              <Marker
                key={m._id}
                position={[m.position.lat, m.position.lng]}
                icon={defaultIcon}
                eventHandlers={{ click: () => MarkerClickHandler(m) }}
              />
            );
          })}
          <MapClickHandler />
        </MapContainer>
        <img
          className="backpackMapImg"
          src="backpack.png"
          alt="brown backpack open at the front showing a wilderness scene inside"
        />
        {!selectedMarker && !detailsClicked && !settingsClicked && (
          <>
            <Button
              variant="contained"
              className="tripDetails"
              onClick={TripDetailsClickHandler}
            >
              Trip Details
            </Button>
            <img
              className="settings"
              src="settings.webp"
              alt="line render of a settings cog icon"
              onClick={() => setSettingsClicked(true)}
            />
            {Object.keys(markers).length > 0 &&
            <DetailSummary markers={markers ||{}} />
          }
          </>
        )}
      </div>
      {selectedMarker && (
        <div
          className="overlay1"
          style={{
            position: "absolute",
            zIndex: 1000,
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
          }}
        >
          {selectedMarker.position &&
          <SearchResultScreen
            marker={selectedMarker}
            markers={markers}
            setMarkers={setMarkers}
            closeOverlay={closeSearchOverlay}
          />
        }
        </div>
      )}
      {detailsClicked && (
        <div
          className="overlay2"
          style={{
            position: "absolute",
            zIndex: 1000,
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
          }}
        >
          <TripDetailsScreen
            closeOverlay={closeDetailsOverlay}
            markers={markers}
            setSelectedMarker={setSelectedMarker}
          />
        </div>
      )}
      {settingsClicked && (
        <div
          className="overlay3"
          style={{
            position: "absolute",
            zIndex: 1000,
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
          }}
        >
          <Settings
            closeOverlay={closeSettingsOverlay}
            settingsData={settingsData}
            setSettingsData={setSettingsData}
            setSettingsClicked={setSettingsClicked}
            markers={markers}
            setMarkers={setMarkers}
          />
        </div>
      )}
    </>
  );
};

export default MapComponent;

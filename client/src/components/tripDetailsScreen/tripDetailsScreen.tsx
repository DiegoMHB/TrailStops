import "./tripDetailsScreen.css";
import { Button } from "@mui/material";
import { DynamicMarkers, MarkerInterface } from "../../Interfaces/interfaces";

type TripDetailsScreenPropsTypes = {
  setSelectedMarker: (marker: MarkerInterface) => void;
  closeOverlay: () => void;
  markers: DynamicMarkers;
};

function TripDetailsScreen({
  closeOverlay,
  markers = {},
  setSelectedMarker,
}: TripDetailsScreenPropsTypes) {
  const firstMarker = Object.values(markers).find(
    (marker) => marker.order === 1
  ) || {
    prevDist: { dist: 0, time: 0 },
  };

  const sortedMarkers = Object.values(markers).sort(
    (a, b) => (a.order || 0) - (b.order || 0)
  );

  return (
    <div className="tripDetailsScreen">
      <h1>Trip Details</h1>
      <ul className="tripDetailsList" style={{ justifyContent: "flex-start" }}>
        <li>
          Start point
          <br />
          Distance to next stop: {firstMarker.prevDist?.dist ?? 0} km
          <br />
          Time to next stop: {firstMarker.prevDist?.time ?? 0} hrs
        </li>

        {sortedMarkers.map((marker) => (
          <li className="Item" key={marker._id}>
            Stop {marker.order ?? "Unknown"}:{" "}
            {marker.hotel || "No Accommodation Selected"}
            <br />
            Distance to next stop: {marker.nextDist?.dist ?? 0} km
            <br />
            Time to next stop: {marker.nextDist?.time ?? 0} hrs
            <br />
            <Button
              variant="contained"
              onClick={() => {
                setSelectedMarker(marker);
                closeOverlay();
              }}
            >
              Edit
            </Button>
          </li>
        ))}

        <li>End Point</li>
      </ul>

      <Button variant="contained" className="backButton" onClick={closeOverlay}>
        Back
      </Button>
    </div>
  );
}

export default TripDetailsScreen;

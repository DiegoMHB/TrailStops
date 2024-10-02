import './searchResultScreen.css';
import APIService from '../../services/googleAPIService';
import { useState, useEffect } from 'react';
import DBService from '../../services/DBService';
import { Button } from '@mui/material';
import routeCalculation from '../../helperFunctions/routeCalculation';
import { Accomodation, DynamicMarkers, MarkerInterface } from '../../Interfaces/interfaces';

type SearchResultScreenPropsTypes = {
  marker: MarkerInterface;
  closeOverlay: () => void;
   markers: DynamicMarkers; 
   setMarkers: (newDynamcMarkers: DynamicMarkers) => void;
}

function SearchResultScreen({ 
  marker , 
  closeOverlay, 
  markers, 
  setMarkers } : SearchResultScreenPropsTypes) {
 
  const [loading, setLoading] = useState(true);
  // Creating a 'loading' state so it doesn't say 'No accommodation found' when they are still loading.

  const [nearAccommodation, setNearAccommodation] = useState<Accomodation[]>([]);
  const [selectedAccommodation, setSelectedAccommodation] = useState("")

  useEffect(() => {
    if (marker.position) {
      const [lon, lat] = [marker.position.lat, marker.position.lng];
      setLoading(true); // Start loading
      APIService.extractAccommodations(lon, lat)
        .then((data) => {
          if(data){
          setNearAccommodation(data);
      }})
        .catch((error) => {
          console.error("Error fetching accommodations:", error);
          setNearAccommodation([]);
        })
        .finally(() => {
          // Set loading to false when fetch is complete, regardless of success or failure
          setLoading(false);
        });
      }
       if (marker._id) {
        DBService.getAccommodation("aidan@test.com", marker._id)
        .then((hotel) => {
          if (hotel) {
            setSelectedAccommodation(hotel.hotel);
        } else {
          console.error("Markers data is not in the expected format", hotel);
        }
        })
      }
  }, []);

  function updateAccommodation (accommodation:any) {
    console.log(accommodation)
    setSelectedAccommodation(accommodation)
    const updatedMarkers = { ...markers, [marker._id]:{...marker, hotel:accommodation}};
    setMarkers(updatedMarkers);
    DBService.addAccommodation("aidan@test.com", accommodation, marker._id)
  }

  const calculationSettings = {
    distance: 'km',
    speed: 3 
  };

  async function deleteMarker (markerId:any) {
    DBService.removeMarker("aidan@test.com", markerId);
    const updatedMarkers = { ...markers };
    delete updatedMarkers[markerId];
    await routeCalculation(Object.values(updatedMarkers), calculationSettings)
    .then((calculatedMarkers) => {
      setMarkers(calculatedMarkers);
      closeOverlay();
    });
  };

  return (
    <div className='searchResultScreen'>
      {marker.position ? (
        <div className='accommodationOptions'>
        <ul className='accommodationList'>
          {nearAccommodation && nearAccommodation.length > 0 ? (
            nearAccommodation.map((accommodation) => (
              <div key={accommodation.name}>
              <li>{accommodation.name}
                <br />
                {accommodation.vicinity}
              </li>
              <img className='accommodationImage imageLink' onClick={() => updateAccommodation(accommodation.name + " - " + accommodation.vicinity)} src={accommodation.url} alt={accommodation.name} />
              </div>
            ))
              
          ) : loading ? <p>Accommodation loading...</p> : (
            <p>No accommodation found.</p>
          )}
        </ul>
        <p className='wildOption'>Wild Camping</p>
        <Button variant='contained' onClick={() => updateAccommodation("Wild Camping")}>Select</Button>
        </div>
      ) : (
        <p>No closest point data available.</p>
      )}
        <div>
        <h1>Stop {marker.order}</h1>
        <h3 className="stopHeading">&larr; Previous Stop</h3>
        <table className="timeDistanceTable">
          <tr className="tableHeadings">
            <th>Distance</th><th>Time</th>
          </tr>
          <tr>
            <td>{marker.prevDist?.dist ? `${marker.prevDist.dist} km` : 'N/A'}</td>
            <td>{marker.prevDist?.time ? `${marker.prevDist.time} hours` : 'N/A'}</td>
          </tr>
        </table>
        <h3 className="stopHeading">Next Stop &rarr;</h3>
        <table className="timeDistanceTable">
          <tr className="tableHeadings">
            <th>Distance</th><th>Time</th>
          </tr>
          <tr>
            <td>{marker.nextDist?.dist ? ` ${marker.nextDist.dist} km` : ' N/A'}</td>
            <td>{marker.nextDist?.time ? `${marker.nextDist.time} hours` : 'N/A'}</td>
          </tr>
        </table>
        <p><span className="detailHeading">Selected Accommodation:</span>
        <span className="detailText">{selectedAccommodation === "" ? " None" : ` ${selectedAccommodation}`}</span>
      </p>
      <div className="button-container">
        <Button variant='contained' style={{marginRight: "10px"}} onClick={() => closeOverlay()}>Back</Button>
        <Button variant='contained' onClick={() => deleteMarker(marker._id)}>Delete Marker</Button>
      </div>
      </div>
    </div>
  )
}

export default SearchResultScreen;
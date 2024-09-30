import { DynamicMarkers } from '../../Interfaces/interfaces';
import './detailSummary.css';

type DetailSummaryProps = {
  markers: DynamicMarkers
}


function DetailSummary({ markers }: DetailSummaryProps) {

  if (!markers || Object.keys(markers).length === 0) {
    return <div style={{zIndex:"-100", position:"absolute", top:"1px"}}>No markers placed!</div>;
  }
  // Checks if any markers are displayed on the screen.

  const sortedMarkers = Object.values(markers || {}).sort((a:any, b:any) => a.order - b.order);
  

  return (
    <div className="detailSummary">
      <img className="markerIcon" src='marker-icon-2x.png' alt='marker icon' style={{ marginBottom: '10px' }}/>
      <p>Start</p>
      <p className='emoji'>&#128315;</p> 
        {sortedMarkers[0].prevDist ? (
          <>
            <p style={{ marginBottom: '0px' }}>{sortedMarkers[0].prevDist.dist} kms/{sortedMarkers[0].prevDist.time} hrs </p>
            <p className='emoji'>&#128315;</p>
          </>   
        ) : "this div"}
      <div className="summary">
        {sortedMarkers && Object.values(sortedMarkers).length > 0 ? (
          Object.values(markers).map((marker) => (
            <div className="marker" key={marker._id}>
              <img className="markerIcon" src='map-pin.svg' alt='marker icon' />
              <p style={{ marginBottom: '0px' }}>Stop {marker.order}</p>
              <div className="markerInfo">
              <p className='emoji'>&#128315;</p>
                <p style={{ marginBottom: '0px' }}>{marker.nextDist?.dist} kms/{marker.nextDist?.time} hrs</p>
                <p className='emoji'>&#128315;</p>
              </div>
            </div>
          ))
        ) : (
          <div>No markers</div>
        )}
        <img className="markerIcon" src='marker-icon-2x.png' alt='marker icon' />
        <p>End</p>
      </div>
    </div>
  );
}

export default DetailSummary;

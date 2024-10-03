import binarySearch from "./binarySearch";
import routeData from "../routeData";
import placeMarkerBetweenPoints from "./placeMarkerBetweenPoints";

// Function to find the two closest points on the route to the clicked point
function closestPoints(pointCoords: number[]): number[] {

  const coordinates = routeData.coordinates

  if (pointCoords[0] < coordinates[0][1]) {
    alert('Please choose a stop on your trail')
    return coordinates[0]
  }
  if (pointCoords[0] > coordinates[(coordinates.length) - 1][1]) {
    alert('Please choose a stop on your trail')
    return coordinates[(coordinates.length) - 1]
  }

  // Sort the route by longitude
  let sortedRoute: number[][] = routeData.coordinates.slice().sort((a, b) => a[1] - b[1]);

  const [targetLon, targetLat] = pointCoords;
  const [low, high] = binarySearch(sortedRoute, targetLon);

  // After binary search, low and high should be the indices of the closest two points by longitude
  const lowerPoint = sortedRoute[high];
  const higherPoint = sortedRoute[low];

  // find the point the click would be closest to on a line between the two closest points
  const closestLinePoint = placeMarkerBetweenPoints([targetLat, targetLon], lowerPoint, higherPoint);
  const distanceToLower = Math.hypot(lowerPoint[0] - targetLat, lowerPoint[1] - targetLon);
  const distanceToHigher = Math.hypot(higherPoint[0] - targetLat, higherPoint[1] - targetLon);
  const distanceToProjection = Math.hypot(closestLinePoint[0] - targetLat, closestLinePoint[1] - targetLon);

  // Return the closest point: either the closestLinePoint or one of the two points
  if (distanceToProjection < Math.min(distanceToLower, distanceToHigher)) {
    return closestLinePoint;
  } else {
    return distanceToLower < distanceToHigher ? lowerPoint : higherPoint;
  }
}

export default closestPoints;
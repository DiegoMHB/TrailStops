import { PointLngLat } from "../Interfaces/interfaces"

// load GPX track as an array of points
export default async function createGPXArray(url: string): Promise<PointLngLat[] | undefined> {

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`error fetching route status: ${response.status}`);
    }

    const gpxText = await response.text();
    const parser = new DOMParser();
    const gpxDoc = parser.parseFromString(gpxText, "application/xml");

    const trackPoints = gpxDoc.getElementsByTagName("trkpt");
    const latLngArray: PointLngLat[] = [];

    for (let i = 0; i < trackPoints.length; i++) {
      const lat: string|null = trackPoints[i].getAttribute("lat");
      const lon: string|null = trackPoints[i].getAttribute("lon");

      if(lat && lon){
      latLngArray.push({ lat: parseFloat(lat), lng: parseFloat(lon) });
    }}

    return latLngArray;
  } catch (error) {
    console.error("Error loading GPX:", error);

  }
}

// Fetches a GPX (GPS Exchange Format) file from a URL, parses it, and extracts the track points (latitude and longitude) into an array of objects.
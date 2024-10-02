
export interface Marker {
    _id: string;
    user_id: string;
    position: Position;
    hotel?: string;
    prevDist: {dist: number; time: number};
    nextDist: {dist: number; time: number};
    order?: number;
    walkingSpeed: number;
    distanceMeasure: string;
  }

  
  export interface Settings {
    speed: number;
    distance: string;
  }

  export interface Position {
    lat: number;
    lng: number;
  }

  export interface UpdatedMarkers {
    position: Position;
    prevDist: { dist: number, time: number },
    nextDist: { dist: number, time: number },
    order: number;
  };
  
  export interface AddMarkerRequestBody {
    _id: string;
    user_id: string;
    marker: Marker;
    updatedMarkers: Record<string, { prevDist: any; nextDist: any; order: number }>;
    settings: Settings;
  }
  
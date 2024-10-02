//Interfaces are temporary located in the same file.
//I group them in the order i found them in the folders :

import { LatLng } from "leaflet"

//HELPER FUNCTIONS:

export interface PointLngLat {
  lng: number,
  lat: number
}

export interface CalculationSettings {
  distance: string,
  speed: number
}

//COMPONENTS

export interface Distance {
  dist: number,
  time: number
}

export interface MarkerInterface {
  _id: string,
  user_id: string,
  hotel: string,
  prevDist: Distance | null,
  nextDist: Distance | null,
  position: PointLngLat,
  walkingSpeed: number,
  distanceMeasure: string, //settingsData.distance. Should be measure (km or miles)
  name?: string,
  order?:number
};

export interface DynamicMarkers  {
  [_id: string]: MarkerInterface; 
};

//DB SERVICE

export interface User {
  email: string,
  name: string,
  password: string,
  __v: number,
  _id: string
}



//API SERVICE
export interface Accomodation {
  name:string,
  vicinity: string,
  url: string

}
export interface PictureData{
  data:any
}

export interface getNearAccommodationsResponse {
  html_attributions: any[],
  results: Place[],
  status: string
}


export interface Place {
  business_status?: string;
  geometry: {
    location: LatLng;
    viewport: Viewport;
  };
  icon: string;
  icon_background_color?: string;
  icon_mask_base_uri?: string;
  name: string;
  opening_hours?: {
    open_now: boolean;
  };
  photos?: Photo[];
  place_id: string;
  plus_code?: PlusCode;
  rating?: number;
  reference: string;
  scope: string;
  types: string[];
  user_ratings_total?: number;
  vicinity: string;
}



export interface Viewport {
  northeast: LatLng;
  southwest: LatLng;
}

export interface Photo {
  height: number;
  html_attributions: string[];
  photo_reference: string;
  width: number;
}

export interface PlusCode {
  compound_code: string;
  global_code: string;
}


export interface ErrorResponse {
  error: string;
}

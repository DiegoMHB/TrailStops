
export interface NearbySearchResponse {
  html_attributions: string[];
  next_page_token?: string;
  results: Place[];
  status: string;
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



export interface LatLng {
  lat: number;
  lng: number;
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

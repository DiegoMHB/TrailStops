/* eslint-disable testing-library/no-node-access */
import Map from "./map";
import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter as Router } from "react-router-dom";
import DBService from "../../services/DBService";

//MOCKS
//REACT-ROUTER-DOM
const mockedUsedNavigate = jest.fn();

jest.doMock("react-router-dom", () => ({
  ...(jest.requireActual("react-router-dom") as any),
  useNavigate: () => mockedUsedNavigate,
}));

//DETAILSUMMARY COMPONENT
jest.mock("../detailSummary/detailSummary", () => () => (
  <div data-testid="detailSummary">detailSummary</div>
));

//ROUTE COMPONENT
jest.mock("../gpxMapLayer/gpxMapLayer", () => {
  return function MockGPXLayer() {
    return <div data-testid="gpx-layer-mock">GPXLayer</div>;
  };
});

//DBSERVICE FUNCTIONS
jest.mock("../../services/DBService");

// USEMAPEVENTS FROM LEAFLET

jest.mock("react-leaflet", () => ({
  ...jest.requireActual("react-leaflet"),
  useMapEvents: () => jest.fn()
}));

describe("map", () => {
  beforeEach(() => {
    (DBService.getMarkers as jest.Mock).mockResolvedValue([
      { marker1: 1 },
      { marker2: 2 },
    ]);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("Should render map", async () => {
    render(
      <Router>
        <Map />
      </Router>
    );
    const mapComponent = document.querySelector(".leaflet-pane");
    expect(mapComponent).toBeInTheDocument();
  });

  it("Should render trip-details button", async () => {
    render(
      <Router>
        <Map />
      </Router>
    );
    const settings = document.querySelector(".settings");
    expect(settings).toBeInTheDocument();
  });

  it("Should render settings button", async () => {
    render(
      <Router>
        <Map />
      </Router>
    );
    const button = screen.getByRole("button");
    expect(button).toBeInTheDocument();
  });

  it("Should render tripDetailsScreen when the button is clicked", async () => {
    render(
      <Router>
        <Map />
      </Router>
    );
    const button = screen.getByRole("button");
    fireEvent.click(button);
    const tripDetailsScreen = screen.getByText("Trip Details");
    expect(tripDetailsScreen).toBeInTheDocument();
  });

  it("Should render a route", async () => {
    render(
      <Router>
        <Map />
      </Router>
    );
    const route = screen.getByTestId("gpx-layer-mock");
    expect(route).toBeInTheDocument();
  });

  // it("Should create a new marker when clicked on the route", async () => {
  //   const mockMapClick = jest.fn();
  //   require("react-leaflet").useMapEvents.mockImplementation((e: any) => {
  //     e.click({ lat: 55.97, lng: -4.35 });
  //   });
  //   render(
  //     <Router>
  //       <Map />
  //     </Router>
  //   );

  //   const mapContainer = screen.getByTestId("mapContainer");
  //   fireEvent.click(mapContainer);

  //   expect(mockMapClick).toHaveBeenCalledWith({ lat: 55.97, lng: -4.35 });
  // });

});

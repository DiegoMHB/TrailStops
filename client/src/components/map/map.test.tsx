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
  useMapEvents: () => jest.fn(),
}));

const MapCompo = (
  <Router>
    <Map />
  </Router>
);

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
    render(MapCompo);
    const mapComponent = document.querySelector(".leaflet-pane");
    expect(mapComponent).toBeInTheDocument();
  });

  it("Should render trip-details button", async () => {
    render(MapCompo);
    const settings = document.querySelector(".settings");
    expect(settings).toBeInTheDocument();
  });

  it("Should render settings button", async () => {
    render(MapCompo);
    const button = screen.getByRole("button");
    expect(button).toBeInTheDocument();
  });

  it("Should render tripDetailsScreen when the button is clicked", async () => {
    render(MapCompo);
    const button = screen.getByRole("button");
    fireEvent.click(button);
    const tripDetailsScreen = screen.getByText("Trip Details");
    expect(tripDetailsScreen).toBeInTheDocument();
  });

  it("Should render a route", async () => {
    render(MapCompo);
    const route = screen.getByTestId("gpx-layer-mock");
    expect(route).toBeInTheDocument();
  });
});

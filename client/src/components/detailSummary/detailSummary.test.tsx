//DIEGO: In order to make this test would be good to change the type DynamicMarkers to an array?? and make the changes

import DetailSummary from "./detailSummary";
import { render, screen } from "@testing-library/react";

const props = {
  1234: {
    _id: "1234",
    user_id: "aidan@test.com",
    position: {
      lat: 56.386425,
      lng: -4.635337,
    },
    hotel: "",
    prevDist: {
      dist: 5,
      time: 1,
    },
    nextDist: {
      dist: 5,
      time: 1,
    },
    order: 6,
    walkingSpeed: 3,
    distanceMeasure: "km",
  },
};
describe("DetailSummary", () => {
  it("renders a component with 1 marker on the route", () => {
    render(<DetailSummary markers={props} />);
    const markerImg = screen.getAllByRole("img");

    expect(markerImg.length).toBe(3);
    markerImg.forEach((img) => {
      expect(img).toBeInTheDocument();
    });
  });
  it("renders texts that describe the route", () => {
    render(<DetailSummary markers={props} />);

    const textElements = [
      screen.getByText(/Start/),
      screen.getByText(/Stop/),
      screen.getByText(/End/)]

    textElements.forEach((p)=>{
      expect(p).toBeInTheDocument()
    })
  });
});

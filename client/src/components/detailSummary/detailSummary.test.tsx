import DetailSummary from "./detailSummary";
import { render, screen } from "@testing-library/react";
import { marker1 } from "../mock";

const DetailSummaryCompo = <DetailSummary markers={{ aaaa: marker1 }} />
;

describe("DetailSummary", () => {
  it("renders a component with 1 marker on the route", () => {
    render(DetailSummaryCompo);
    const markerImg = screen.getAllByRole("img");

    expect(markerImg.length).toBe(3);
    markerImg.forEach((img) => {
      expect(img).toBeInTheDocument();
    });
  });

  it("renders texts that describe the route", () => {
    render(DetailSummaryCompo);

    const textElements = [
      screen.getByText(/Start/),
      screen.getByText(/Stop/),
      screen.getByText(/End/),
    ];

    textElements.forEach((p) => {
      expect(p).toBeInTheDocument();
    });
  });
});

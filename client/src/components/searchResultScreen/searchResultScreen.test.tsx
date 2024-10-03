import SearchResultScreen from "./searchResultScreen";
import { render, screen } from "@testing-library/react";
import { marker1, marker2, marker3 } from "../mock";

const SearchResultCompo = (
  <SearchResultScreen
    marker={marker2}
    markers={{ aaaa: marker1, bbbb: marker2, cccc: marker3 }}
    setMarkers={() => {}}
    closeOverlay={() => false}
  />
);

describe("Search Result Screen", () => {
  it("renders a component with 3 different buttons", () => {
    render(SearchResultCompo);

    const buttonsElements = screen.getAllByRole("button");

    buttonsElements.forEach((btt) => {
      expect(btt).toBeInTheDocument();
    });
  });

  // describe("Search Result Screen", () => {
  //   it("renders a component with 3 different buttons", () => {
  //     render(SearchResultCompo);
  //   });
  // });
});

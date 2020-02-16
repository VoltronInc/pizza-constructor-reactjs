import React from "react";
import { render } from "@testing-library/react";
import Routes from "../Routes";
import ConstructorContext from "../../engine/ConstructorContext";
import {
  createHistory,
  createMemorySource,
  LocationProvider,
} from "@reach/router";
import mockAppData from "../../mockData/mockAppData";

describe("Routes", () => {
  const contextValue = [
    {
      response: mockAppData,
      scores: {
        absence: 0,
        "trigger-points-sick-pay": 5,
      },
      backgrounds: {
        absence: "bg-mint.png",
        "trigger-points-sick-pay": "bg-green.png",
      },
      completedCategories: {
        absence: false,
        "trigger-points-sick-pay": false,
      },
    },
    jest.fn(),
  ];

  const Wrapper = ({ route }) => {
    const history = createHistory(createMemorySource(route));

    return (
      <ConstructorContext.Provider value={contextValue}>
        <LocationProvider history={history}>
          <Routes />
        </LocationProvider>
      </ConstructorContext.Provider>
    );
  };

  it("should render Homepage", () => {
    const { getByText } = render(<Wrapper route="/" />);

    getByText("homepageTitle");
  });

  it("should render Absence Category", () => {
    const { getAllByText } = render(<Wrapper route="/category/absence" />);

    getAllByText("Absence");
  });

  it("should render NotFound", () => {
    const { getByText } = render(<Wrapper route="/empty-page" />);

    getByText("notFound");
    getByText("homePageButton");
  });

  it("should render NotFound on invalid category", () => {
    const { getByText } = render(<Wrapper route="/category/empty-page" />);

    getByText("notFound");
    getByText("homePageButton");
  });
});

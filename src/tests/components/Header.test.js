import React from "react";
import ReactShallowRenderer from "react-test-renderer/shallow";
import Header from "../../components/Header";

test("should render Header correctly", () => {
  const renderer = new ReactShallowRenderer();
  renderer.render(<Header />);
  //la 1re fois le snapshot sera créé (dans tests/_snapshots_). La deuxième fois il sera comparé
  expect(renderer.getRenderOutput()).toMatchSnapshot();
  console.log(renderer.getRenderOutput());
});

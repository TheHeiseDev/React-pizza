import React from "react";
import ContentLoader from "react-content-loader";

const PizzaSkeleton = (props) => (
  <ContentLoader
    className="pizza-block"
    speed={2}
    width={280}
    height={500}
    viewBox="0 0 280 500"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    <circle cx="134" cy="136" r="125" />
    <rect x="0" y="278" rx="11" ry="11" width="280" height="20" />
    <rect x="0" y="324" rx="10" ry="10" width="280" height="88" />
    <rect x="0" y="440" rx="10" ry="10" width="95" height="30" />
    <rect x="126" y="433" rx="25" ry="25" width="152" height="45" />
  </ContentLoader>
);

export default PizzaSkeleton;

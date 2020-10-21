import React from "react";

import NavigationBar from "./NavigationBar";

const PageLayout = ({ title, children }) => (
  <>
    <NavigationBar />

    <div className="container">
      <div className="row">
        <div className="col">
          <h1>{title}</h1>
        </div>
      </div>

      <div className="row">
        <div className="col">{children}</div>
      </div>
    </div>
  </>
);

export default PageLayout;

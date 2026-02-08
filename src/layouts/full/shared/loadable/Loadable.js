import React, { Suspense } from "react";

const Loadable = (Component) => (props) =>
(
  <Suspense>
    {
  //console.log(Component)
  }
    <Component {...props} />
  </Suspense>
);

export default Loadable;

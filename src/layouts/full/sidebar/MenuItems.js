import { useState } from "react";
import { RouteHeader } from "../../../constant/routeAndHeader";

const Menuitems = () =>{
  const [meunitem , setMenuitem] = useState(RouteHeader().router.Menu)
  // //console.log(meunitem)
  return [
    ...meunitem
  ];
  
}

export default Menuitems;

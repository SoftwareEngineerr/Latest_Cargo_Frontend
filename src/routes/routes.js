import { Navigate, Outlet } from 'react-router';
import { RouteHeader } from '../constant/routeAndHeader';
import FullLayout from '../layouts/full/FullLayout';
import Label from '../components/xaoasoft/label';
import CheckLayout from '../layouts/CheckLayout';


const func = () =>{
  const data = RouteHeader().router
  const getdata = RouteHeader().router
  return getdata
}
const routesData = func();   // ← FIX: CALL ONLY ONCE\\

export const Routering = [
  {
    path: '/',
    element: (
      <>
        <Outlet />
        <Label />
      </>
    ),
    children: [
      ...routesData.SinglePage
    ]
  },
  {
    path: '/Private/',
    element: <div id="fullLayout"><FullLayout /></div>,
    children: [
      ...routesData.Menu
    ]
  },
  {
    path: '/Shirkat/',
    element: <div id="fullLayout"><CheckLayout /></div>,
    children: [
      ...routesData.Shirkat
    ]
  }
];

import { Navigate } from "react-router";
import Login from "../veiws/Website/authentication/Login/login";
import Branch from "../veiws/Website/Branch/Branch";
import Track from "../veiws/Website/authentication/Login/tracking";
import { uniqueId } from "lodash";
import { IconAperture, IconCopy, IconLayoutDashboard,   IconLogin, IconMoodHappy, IconTypography, IconRegistered, IconUserPlus } from '@tabler/icons';
import './routeAndHeader.css'
import { AddCard, Api, AddAlert, AppRegistration, Assessment, AssignmentReturn, Bloodtype, InstallMobile, CallSplit, DirectionsTransit, DataSaverOn, Dialpad, GradeOutlined, VerifiedUserRounded, StickyNote2Rounded, FlightClassOutlined, Games, Subject, Inventory, Receipt, EditCalendar, CurrencyExchange, ImportExport, QrCodeScanner, SettingsSuggest, Category, Equalizer, Group, AttachMoney, CardTravel, HelpOutline, CloudDownload, TrendingDown, TrendingUp, Payment, QueuePlayNext, Dashboard, AddCircleOutline, FileDownload, BusinessCenter, ShoppingCart, AssignmentReturned, Beenhere, Search, LowPriority } from "@mui/icons-material";
import { User_Data } from "../hooks/Requests/localStroagedata";
import { Typography } from "@mui/material"; 
import Purchase from "../veiws/Dashboard/purchase/purchase";
import ReceiptComp from "../veiws/Dashboard/receipt/receipt"; 
import Roznamcha from "../veiws/Dashboard/report/component/roznamcha/roznamcha";
import Expenses from "../veiws/Dashboard/report/component/expenses";
import ExpiryList from "../veiws/Dashboard/expiryDateList/expiryList";
import Cargo from "../veiws/Dashboard/sale/dashboard";
import GetTrackRecord from "../veiws/Website/track/track";
import ErrorPage from "../components/ErrorPage/ErrorPage";
import Shirkat from "../veiws/Dashboard/Shirkat";
import ShirkatLogin from "../veiws/Website/shirtkat/ShirkatLogin";
import HomePage from "../veiws/Website/HomePage/HomePage";
import EmployeeRegister from "../veiws/Dashboard/employee/employee";
import CapitalRemove from "../veiws/Dashboard/capitalRemove/index";
import Damage from "../veiws/Dashboard/damage";
import Checker from "./checker";
import ReceivedOrders from "../veiws/Dashboard/sale/component/receivedOrders";
import DeliveredOrders from "../veiws/Dashboard/sale/component/deliveredOrders";
import BranchPayment from "../veiws/Dashboard/branchPayment/index";
import SearchOrder from "../veiws/Dashboard/sale/component/searchOrders";
import AdminEmployee from "../veiws/Dashboard/adminEmployee/AdminEmployee";
import ReturnOrdersMain from "../veiws/Dashboard/sale/component/returnOrders";
import DailyReport from "../veiws/Dashboard/report/component/report/report";
import DetailBranchReportDateWise from "../veiws/Dashboard/report/component/detailReport/report";

// //console.log(SelectedData())
export const RouteHeader = () => { 
//  //console.log(User_Data)
  const userData = sessionStorage.getItem('User_Data');
  const branchUser = userData ? JSON.parse(userData)?.branch?.main_branch : undefined;
  const dispute = userData ? JSON.parse(userData)?.branch?.origin : undefined;
  const isDispute = dispute == 'DISPUTE'? true : false
  //console.log(dispute)
  //console.log(branchUser)
return {
    router:{
       
      SinglePage: [
        {path:'/' , element: <div className="menuItem"><Track/></div> },  
        {path:'/Branch' , element: <div id="Login"><Branch /></div>},
        {path:'/login' , element: <div id="Login"><Login /></div>},
        // {path:'/private/*' , element: branchUser != undefined ? <Navigate to="/Private/Branch_Connectivity" /> : <Navigate to="/Private/order" />},
        // {path:'/private/*' , element: branchUser != undefined <Navigate to="" /><div id="Login"></div>},
         {
                item: true,
              title: 'My-Profile',
              icon: IconCopy,
              path: '/track/:id',
              element: <div id="ErrorPage"><GetTrackRecord /></div>
                
              },
                {
                item: true,
              title: 'My-Profile',
              icon: IconCopy,
              path: '/shirkat/login',
              element: <div id="ErrorPage"><ShirkatLogin /></div>
                
              },
              
      ],
      Shirkat:[
            {path:'/Shirkat/home' , element: <HomePage /> },
      ],
        Menu:[
          // ...(User_Data == undefined  ? [] : User_Data == 'empty' ? [] : [
            {path:'/Private/' , element: <Navigate to="/Private/Order" /> },
          
                  {
                    item: true,
                    navlabel: true,
                    subheader: <div className="mainMenuMain"><Typography variant="span" sx={{display: (theme)=>theme.palette.sidemenutext.display.display}}> </Typography><Typography variant="span" sx={{fontSize: '14px',marginLeft: '1px',display: (theme)=>theme.palette.sidemenutext.display.display, display: 'inline'}}> پارسلان</Typography></div>,
                    title: '',
                    icon: '',
                    href: '',
                    path: '',
                    element: ''
                  },
                    //   ...(branchUser == 1
                    // ? [{
                    //     item: true,
                    //     id: uniqueId(),
                    //     title: (
                    //       <div className="menuItem">
                    //         <span>Branch Details </span>
                    //         <Typography variant="span" sx={{ fontSize: '14px', marginLeft: '1px', display: 'inline' }}>رسید</Typography>
                    //       </div>
                    //     ),
                    //     icon: Receipt,
                    //     href: '/Private/Branch_Connectivity',
                    //     path: '/Private/Branch_Connectivity',
                    //     element: <div id="Receipt"><BranchPayment  /></div>
                    //   }]
                    // : []),
                  // ...(branchUser == 0 && !isDispute
                  // ? [
                  {
                    item: true,
                    id: uniqueId(),
                    title: <div className="menuItem"><span>Dashboard </span><Typography variant="span" sx={{fontSize: '14px',marginLeft: '1px',display: (theme)=>theme.palette.sidemenutext.display.display, display: 'inline'}}> ډشبورډ</Typography></div>,
                    icon: Dashboard,
                    href: '/Private/Order',
                    path: '/Private/Order',
                    element: <div id="Refund"><Checker /></div>
                  }
                // ]: [])
                ,
                  
                  ...(branchUser == 0 && !isDispute
                  ? [{
                    item: true,
                    id: uniqueId(),
                    title: <div className="menuItem"><span>New Order </span><Typography variant="span" sx={{fontSize: '14px',marginLeft: '1px',display: (theme)=>theme.palette.sidemenutext.display.display, display: 'inline'}}>نوي پارسلونه</Typography></div>,
                    icon: AddCircleOutline,
                    href: '/Private/ExpireList',
                    path: '/Private/ExpireList',
                    element: <div id="ExpireList"><ExpiryList /></div>
                 }]
                  : []),
                  
                   ...(branchUser == 0 && !isDispute
                  ? [{
                    item: true,
                    id: uniqueId(),
                    title: <div className="menuItem"><span>Coming </span><Typography variant="span" sx={{fontSize: '14px',marginLeft: '1px',display: (theme)=>theme.palette.sidemenutext.display.display, display: 'inline'}}>را روان پارسلونه  </Typography></div>,
                    icon: FileDownload,
                    href: '/Private/ComingParcels',
                    path: '/Private/ComingParcels',
                    element: <div id="ComingParcels"><ReceiptComp /></div>
                  }]
                  : []),
                  
                   ...(branchUser == 0 && !isDispute
                  ? [{
                    item: true,
                    id: uniqueId(),
                    title: <div className="menuItem"><span>Received </span><Typography variant="span" sx={{fontSize: '14px',marginLeft: '1px',display: (theme)=>theme.palette.sidemenutext.display.display, display: 'inline'}}>را رسیدلي پارسلونه  </Typography></div>,
                    icon: AssignmentReturned,
                    href: '/Private/BranchReceived',
                    path: '/Private/BranchReceived',
                    element: <div id="BranchReceived"><ReceivedOrders /></div>
                  }]
                  : []),

                   ...(branchUser == 0 && !isDispute
                  ? [{
                    item: true,
                    id: uniqueId(),
                    title: <div className="menuItem"><span>Return </span><Typography variant="span" sx={{fontSize: '14px',marginLeft: '1px',display: (theme)=>theme.palette.sidemenutext.display.display, display: 'inline'}}>ریټرن پارسلونه  </Typography></div>,
                    icon: LowPriority,
                    href: '/Private/BranchReturn',
                    path: '/Private/BranchReturn',
                    element: <div id="BranchReturn"><ReturnOrdersMain /></div>
                  }]
                  : []),
                   
                  
                   
                   ...(branchUser == 1 && !isDispute 
                  ? [{
                  item: true,
                    id: uniqueId(),
                    title: <div className="menuItem"><span>Damage/Missing </span><Typography variant="span" sx={{fontSize: '14px',marginLeft: '1px',display: (theme)=>theme.palette.sidemenutext.display.display, display: 'inline'}}>  زیان یا ورک شوی  </Typography></div>,
                    icon: Receipt,
                    href: '/Private/DamageParcel',
                    path: '/Private/DamageParcel',
                    element: <div id="DamageParcel"><Damage /></div>
                   }]
                  : []),

                   ...(branchUser == 0 && !isDispute
                  ? [{
                    item: true,
                    id: uniqueId(),
                    title: <div className="menuItem"><span>Delivered </span><Typography variant="span" sx={{fontSize: '14px',marginLeft: '1px',display: (theme)=>theme.palette.sidemenutext.display.display, display: 'inline'}}>مکمله سوی پارسلونه  </Typography></div>,
                    icon: Beenhere,
                    href: '/Private/Delivered',
                    path: '/Private/Delivered',
                    element: <div id="Delivered"><DeliveredOrders /></div>
                  }]
                  : []),

                   {
                    item: true,
                    id: uniqueId(),
                    title: <div className="menuItem"><span>Search Parcel </span><Typography variant="span" sx={{fontSize: '14px',marginLeft: '1px',display: (theme)=>theme.palette.sidemenutext.display.display, display: 'inline'}}>پارسل وپلټئ  </Typography></div>,
                    icon: Search,
                    href: '/Private/Search',
                    path: '/Private/Search',
                    element: <div id="Search"><SearchOrder /></div>
                  },


                  ...((branchUser == 1 || branchUser == 0  ) && !isDispute 
                    ? [{
                    item: true,
                    navlabel: true,
                    subheader: <div className="mainMenuMain"><Typography variant="span" sx={{display: (theme)=>theme.palette.sidemenutext.display.display}}> </Typography><Typography variant="span" sx={{fontSize: '14px',marginLeft: '1px',display: (theme)=>theme.palette.sidemenutext.display.display, display: 'inline'}}> برانچ حساب</Typography></div>,
                    title: '',
                    icon: '',
                    href: '',
                    path: '',
                    element: ''
                  }]
                  : []),


                  

                    ...(branchUser == 1
                  ? [{

                  // {
                    item: true,
                    id: uniqueId(),
                    title: <div className="menuItem"><span>Employee </span><Typography variant="span" sx={{fontSize: '14px',marginLeft: '1px',display: (theme)=>theme.palette.sidemenutext.display.display, display: 'inline'}}>  کارمند  </Typography></div>,
                    icon: ImportExport,
                    href: '/Private/AdminEmployee',
                    path: '/Private/AdminEmployee',
                    element: <div id="AdminEmployee"><AdminEmployee /></div>
                     }]
                  : []),   

                  ...(!isDispute 
                  ? [{

                    item: true,
                    id: uniqueId(),
                    title: <div className="menuItem"><span>Shirkat </span><Typography variant="span" sx={{fontSize: '14px',marginLeft: '1px',display: (theme)=>theme.palette.sidemenutext.display.display, display: 'inline'}}> شرکت</Typography></div>,
                    icon: BusinessCenter,
                    href: '/Private/Shirkat',
                    path: '/Private/Shirkat',
                    element: <div id="Refund"><Shirkat /></div>
                  }]
                  : []), 
                   
                 ...(branchUser == 0 && !isDispute
                  ? [{

                  // {
                    item: true,
                    id: uniqueId(),
                    title: <div className="menuItem"><span>Daily Cash </span><Typography variant="span" sx={{fontSize: '14px',marginLeft: '1px',display: (theme)=>theme.palette.sidemenutext.display.display, display: 'inline'}}>  روزنامچه  </Typography></div>,
                    icon: ImportExport,
                    href: '/Private/Roznamcha',
                    path: '/Private/Roznamcha',
                    element: <div id="Roznamcha"><Roznamcha /></div>
                     }]
                  : []),    

                  // ...(branchUser == 0 && !isDispute
                  // ? [{
                  //   item: true,
                  //   id: uniqueId(),
                  //   title: <div className="menuItem"><span>Daily Report </span><Typography variant="span" sx={{fontSize: '14px',marginLeft: '1px',display: (theme)=>theme.palette.sidemenutext.display.display, display: 'inline'}}>  روزانې راپور  </Typography></div>,
                  //   icon: Category,
                  //   href: '/Private/Report',
                  //   path: '/Private/Report',
                  //   element: <div id="Report"><DailyReport /></div>
                  //    }]
                  // : []), 
                  
                  
                  ...(branchUser == 0 && !isDispute
                  ? [{
                    item: true,
                    id: uniqueId(),
                    title: <div className="menuItem"><span>Daily Report </span><Typography variant="span" sx={{fontSize: '14px',marginLeft: '1px',display: (theme)=>theme.palette.sidemenutext.display.display, display: 'inline'}}>  روزانې راپور  </Typography></div>,
                    icon: Category,
                    href: '/Private/DetailReport',
                    path: '/Private/DetailReport',
                    element: <div id="DetailReport"><DetailBranchReportDateWise /></div>
                     }]
                  : []), 


                  // },
                 ...(branchUser == 0 && !isDispute
                  ? [{
                      item: true,
                      id: uniqueId(),
                      title: <div className="menuItem"><span>Expenses </span><Typography variant="span" sx={{fontSize: '14px',marginLeft: '1px',display: (theme)=>theme.palette.sidemenutext.display.display, display: 'inline'}}>  مصارف  </Typography></div>,
                      icon:   ShoppingCart,
                      href: '/Private/Expenses',
                      path: '/Private/Expenses',
                      element: <div id="Expenses"><Expenses /></div>
                    
                     }]
                  : []), 

                    
                 ...(branchUser == 0 && !isDispute
                  ? [{
                    item: true,
                    id: uniqueId(),
                    title: <div className="menuItem"><span>Employee Registration </span><Typography variant="span" sx={{fontSize: '14px',marginLeft: '1px',display: (theme)=>theme.palette.sidemenutext.display.display, display: 'inline'}}>  کارمند ثبتول </Typography></div>,
                    icon: Group,
                    href: '/Private/Employee/Registration',
                    path: '/Private/Employee/Registration',
                    element: <div id="Customers"><EmployeeRegister /></div>
                  
                     }]
                  : []),
                  
                  // {
                  //   item: true,
                  //   id: uniqueId(),
                  //   title: <div className="menuItem"><span>Customers </span><Typography variant="span" sx={{fontSize: '14px',marginLeft: '1px',display: (theme)=>theme.palette.sidemenutext.display.display, display: 'inline'}}> مشتری </Typography></div>,
                  //   icon: Group,
                  //   href: '/Private/Customers',
                  //   path: '/Private/Customers',
                  //   element: <div id="Customers"><Customers /></div>
                  // }, 
                 ...(branchUser == 1  
                  ? [{
                    item: true,
                    id: uniqueId(),
                    title: <div className="menuItem"><span>Capital Remove</span><Typography variant="span" sx={{fontSize: '14px',marginLeft: '1px',display: (theme)=>theme.palette.sidemenutext.display.display, display: 'inline'}}>  پانګونه  </Typography></div>,
                    icon: TrendingUp,
                    href: '/Private/Capital',
                    path: '/Private/Capital',
                    element: <div id="Capital"><CapitalRemove /></div>
                   
                     }]
                  : []),
                  // {
                  //         item: true,
                  //         id: uniqueId(),
                  //         title: <div className="menuItem"><span>Finance </span><Typography variant="span" sx={{fontSize: '14px',marginLeft: '1px',display: (theme)=>theme.palette.sidemenutext.display.display, display: 'inline'}}>مالیه</Typography></div>,
                  //         icon: AttachMoney,
                  //         href: '/Private/Finance',
                  //         path: '/Private/Finance',
                  //         element: <div id="FinanceSettings"><Income /></div>
                  //       },
                  // // {
                  //   item: true,
                  //   navlabel: true,
                  //   subheader: <div className="mainMenuMain"><Typography variant="span" sx={{display: (theme)=>theme.palette.sidemenutext.display.display}}>Finance </Typography><Typography variant="span" sx={{fontSize: '14px',marginLeft: '1px',display: (theme)=>theme.palette.sidemenutext.display.display, display: 'inline'}}>مالیه</Typography></div>,
                  //   title: '',
                  //   icon: '',
                  //   href: '',
                  //   path: '',
                  //   element: ''
                  // },

                   
             
        ]
    }
  }
}
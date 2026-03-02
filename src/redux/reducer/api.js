import { UserData } from "../../hooks/FirstTimeWebSrn/Websrn";


// const web = 'https://backend.qatehkandahar.com/';
const web = 'http://localhost:4000/'
//  const imagesServer = 'https://backend.qatehkandahar.com'
const imagesServer = 'http://localhost:4000/Public/'


const initialState = {
    // web : 'https://backend.qatehkandahar.com',
    web : 'https://localhost:4000',
    //website api's
    Registration:`${web}registration`, 
    Login:`${web}login`,
    Customer: `${web}dashboard/customer/get`,

    


    // Shirkat

    
    UpdateShirkatPhone: `${web}dashboard/shirkat/update`,
    Shirkat: `${web}dashboard/shirkat/get`,
    CreateShirkatOrder: `${web}dashboard/orderByShirkat/createorder`,
    Shirkatlist: `${web}dashboard/Shirkatlist/get`,
    ShirkatInfo: `${web}dashboard/ShirkatInfo/get/`,


    BranchGet: `${web}dashboard/branch/get`,
    BranchGetPayment: `${web}dashboard/branch/getpayment`,
    BranchDetails : `${web}dashboard/branch/Details/`,
    BranchSummary : `${web}dashboard/branch/overAllDetails`,


    // Shop
    CreateShop: `${web}dashboard/shop/create`,
    ShopSuggestions: `${web}dashboard/shop/get`,
    CheckUsername: `${web}dashboard/user/check`,

    // Customer
    CreateCustomer: `${web}dashboard/customer/register`,


    //order
    CreateOrder: `${web}dashboard/order/add`,
    GetIncomingOrder: `${web}dashboard/order/getincoming`,
    GetOutGoingOrder: `${web}dashboard/order/getoutgoing`,
    GetReceivedOrder: `${web}dashboard/order/getreceived`, 
    GetDeliveredOrder: `${web}dashboard/order/compeleted`, 
    StatusWiseChecking: `${web}dashboard/order/statuswise`,
    UpdateOrder: `${web}dashboard/order/update`,
    GetOrderDetail: `${web}dashboard/order/orderdetail`,
    DeleteOrderBoth: `${web}dashboard/order/deleteorderboth`,
    // Website
    TrackOrder: `${web}order/orderdetail/`,
    ForwardOrder: `${web}dashboard/order/orderforward`,
    DeliverdOrder: `${web}dashboard/order/delivered`,
    ReceivedOrder: `${web}dashboard/order/received`,
    DisputeOrder: `${web}dashboard/order/dispute`,
    DisputeOrderUpdate: `${web}dashboard/order/updatedispute`,
    ReturnOrder: `${web}dashboard/order/return`,
    CancelledOrder: `${web}dashboard/order/cancel`,

    
    // image
    Imagelink: `${web}dashboard/createFolder`,
    ImageServer: imagesServer,
    
    
    //Shirkat
    ShirtkatLogin: `${web}shirkat/login`,
    ShirkatData: `${web}shirkat/details`,
    ShirkatDetails: `${web}dashboard/ShirkatPayment/get`,

    //Expense
    Expense: `${web}dashboard/expense`,
    ShowExpense: `${web}dashboard/expense/view`,

    //Capital Remove
    CapitalRemove: `${web}dashboard/capitalremove`,
    ShowCapitalRemove: `${web}dashboard/capitalremove/view`,


    // Employee 
    EmployeeRegistration: `${web}dashboard/employee/register`,
    AdminGetEmployee:`${web}dashboard/admin/employee/get`,
    GetEmployee: `${web}dashboard/employee/get`,
    UpdateEmployee: `${web}dashboard/employee/UpdateEmployee`,
    PayEmployee:`${web}dashboard/employee/payment`,
    ListPayEmployee: `${web}dashboard/employee/paymentlist/`,
    UpdateEmployeePayment: `${web}dashboard/employee/updateEmployeepayment`,

    
    //Daily Cash
    DailyCash: `${web}dashboard/getroznamcha`,
    BranchTransfer: `${web}dashboard/paytobranch`,


    UpdateBranchDetails: `${web}dashboard/branch/updatebranchdetails`,
    UpdatePassword: `${web}dashboard/branch/updatepassword`,


    SearchOrder : `${web}dashboard/order/SearchOrder`,
    // /order/SearchOrder

    MissingDamageAdmin : `${web}dashboard/order/missingdamage`,
    ShowAllReturns : `${web}dashboard/order/returnbags`,
    dailyBranchReport : `${web}dashboard/dailyreport`, 
    defaultBranchDailyReport: `${web}dashboard/defaultBranchDailyReport`,
    dailyBranchReportDateWise : `${web}dashboard/dailyreportdate`, 
    branchProgressByAdmin : `${web}dashboard/branchdailyreportbyadmin`, //
    
};

const Api = (state = initialState) => {
        return state;
}
export default Api;

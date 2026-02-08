import { useSelector } from "react-redux";
// import Showclasses from "../components/showclasses";
import { useState } from "react";
import Purchase from "../veiws/Dashboard/purchase/purchase";
 
export const POS = ()=> {
 
    return{ 
    Supplier:{
        text:
            {data: 'Roll Number', placeholder:'Roll Number', type: 'number',required: true, name: 'RollNum ', style:'100%', feildtype:'input', lg: 12 , md: 5, sm: 12, xs: 12, lang: 'en'},
        
        inputs:[
            
            {data:'Supplier :', feildtype:'label' , lg: 3 , md: 3, sm: 12, xs: 12},
            {data: 'نوم', type: 'text', required: true, name: 'suppName', feildtype:'input', lg: 9 , md: 9, sm: 12, xs: 12, lang:'ph'},

            {data:'Contact Name:', feildtype:'label' , lg: 3 , md: 3, sm: 12, xs: 12},
            {data: 'د تماس کس', type: 'text',  name: 'contactName', feildtype:'input', lg: 9 , md: 9, sm: 12, xs: 12, lang:'ph'},

            {data:'Phone Number', feildtype:'label' , lg: 3 , md: 3, sm: 12, xs: 12},
            // {data: 'Old Roll No', type: 'text', required: true, name: 'Old-Assas-No', feildtype:'input', lg: 5 , md: 5, sm: 6, xs: 12, lang: 'en'},
            {data: 'د تلیفون شمیره', type: 'numeric', required: true, name: 'phoneNumber', feildtype:'input', lg: 9 , md: 9, sm: 12, xs: 12, lang:'ph'},
            
            {data:'Email', feildtype:'label' , lg: 3 , md: 3, sm: 12, xs: 12},
            // {data: 'Tel Num 1', type: 'text', required: true, name: 'Tel-Num2', feildtype:'input', lg: 5 , md: 5, sm: 6, xs: 12, lang: 'en'},
            {data: 'ایمیل', type: 'text', name: 'email', feildtype:'input', lg: 9 , md: 9, sm: 12, xs: 12, lang:'ph'},
            
            {data:'Address', feildtype:'label' , lg: 3 , md: 3, sm: 12, xs: 12},
            {data: 'آدرس', type: 'text',  name: 'address', feildtype:'input', lg: 9 , md: 9, sm: 12, xs: 12, lang:'ph'},

        ],
        butn:'Register ثبت',
        style:'max-Width: 400px',
        // forget:'Forgot Password ?',
        // label:"Remeber this Device",
        title: 'Qateh Kandahar by Wasily Technology Technology',
        description: 'Student Registration page'
    },

    Purchase: {
        inputs: [ 
            { data: "نوم", type: "text", required: true, name: "productName", feildtype: "input", lg: 3, md: 3, sm: 1, xs: 12, lang: "ph" },
            { data: "کټګورۍ",  type: "text", name: "categoryNumber", required: true, feildtype: "input", lg: 1, md: 1, sm: 1, xs: 12 },
            { data: "برانډ",  type: "text", name: "brands", feildtype: "input", lg: 1, md: 1, sm: 1, xs: 12 },
            { data: "جنس",  type: "text", name: "uniteType", required: true, feildtype: "input", lg: 1, md: 1, sm: 1, xs: 12 },
            { data: "ماډل",  type: "text", name: "formula", feildtype: "input", lg: 2, md: 2, sm: 1, xs: 12 },
            // { data: "ناریخ", type: "text", name: "invoiceDate", feildtype: "input", lg: 2, md: 2, sm: 1, xs: 12 },
  

            { data: "خرید", type: "numeric", name: "unitPurchasePrice", feildtype: "input", lg: 2, md: 2, sm: 1, xs: 12 },
            { data: "فروش", type: "numeric",  name: "unitSalePrice", required: true, feildtype: "input", lg: 2, md: 2, sm: 1, xs: 12 },
            { data: "تعداد", type: "numeric", name: "quantity", required: true,  feildtype: "input", lg: 2, md: 2, sm: 1, xs: 12 },

            { data: "توضیحات", type: "text", name: "description", feildtype: "input", lg: 4, md: 4, sm: 1, xs: 12,   },
            { data: "بارکوډ", type: "text", name: "barcode", feildtype: "input", lg: 2, md: 2, sm: 1, xs: 12,   },
            { data: "ټوټل", type: "numeric", name: "totalPrice", feildtype: "input", lg: 1, md: 1, sm: 1, xs: 12, disabled: true },

        ],
        
        butn:'Save ثبت',
        style:'max-Width: 400px', 
        title: 'Qateh Kandahar by Wasily Technology Technology',
        description: 'Product Addition Page',
        btnAdd: 'Add Row'
    },


    PurchaseEdit: {
        inputs: [ 
            { data: "نوم", type: "text", required: true, name: "product_name", feildtype: "input", lg: 3, md: 3, sm: 1, xs: 12, lang: "ph" },
            { data: "کټګورۍ",  type: "text", name: "category_id", required: true, feildtype: "input", lg: 1, md: 1, sm: 1, xs: 12 },
            { data: "برانډ",  type: "text", name: "brand_id", feildtype: "input", lg: 1, md: 1, sm: 1, xs: 12 },
            { data: "جنس",  type: "text", name: "uniteType", required: true, feildtype: "input", lg: 1, md: 1, sm: 1, xs: 12 },
            { data: "ماډل",  type: "text", name: "product_code", feildtype: "input", lg: 2, md: 2, sm: 1, xs: 12 },
            // { data: "ناریخ", type: "text", name: "invoiceDate", feildtype: "input", lg: 2, md: 2, sm: 1, xs: 12 },
  

            { data: "خرید", type: "number", name: "purchase_price", feildtype: "input", lg: 2, md: 2, sm: 1, xs: 12 },
            { data: "فروش", type: "number",  name: "selling_price", required: true, feildtype: "input", lg: 2, md: 2, sm: 1, xs: 12 },
            { data: "تعداد", type: "number", name: "quantity_ordered", required: true,  feildtype: "input", lg: 2, md: 2, sm: 1, xs: 12 },

            { data: "توضیحات", type: "text", name: "description", feildtype: "input", lg: 4, md: 4, sm: 1, xs: 12,   },
            { data: "بارکوډ", type: "text", name: "barcode", feildtype: "input", lg: 2, md: 2, sm: 1, xs: 12,   },
            { data: "ټوټل", type: "number", name: "total_price", feildtype: "input", lg: 1, md: 1, sm: 1, xs: 12, disabled: true },

        ],
        
        butn:'Delete ډیلیټ',
        style:'max-Width: 400px', 
        title: 'Qateh Kandahar by Wasily Technology Technology',
        description: 'Product Addition Page',
        btnAdd: 'Add Row'
    },

    Sale: {
        inputs: [ 
            { data: "نوم", type: "text", required: true, name: "productName", feildtype: "input", lg: 2, md: 2, sm: 1, xs: 12, lang: "ph" },
      
        ],
        
        butn:'Save ثبت',
        style:'max-Width: 400px',
        // forget:'Forgot Password ?',
        // label:"Remeber this Device",
        title: 'Qateh Kandahar by Wasily Technology Technology',
        description: 'Product Addition Page',
        btnAdd: 'Add Row',
        addBtn: ' مشتری  ',
        paidBtn: 'بل',
        deleteBtn : 'خالي ',
        scannerBtn : 'Scanner',
    },
    Receipt: {
        inputs: [ 
            { data: "نوم", type: "text", required: true, name: "productName", feildtype: "input", lg: 2, md: 2, sm: 1, xs: 12, lang: "ph" },
      
        ],
        
        butn:'Save ثبت',
        style:'max-Width: 400px',
        // forget:'Forgot Password ?',
        // label:"Remeber this Device",
        title: 'Qateh Kandahar by Wasily Technology Technology',
        description: 'Product Addition Page',
        btnAdd: 'Add Row',
        addBtn: ' add  ',
        paidBtn: 'Paid',
        deleteBtn : 'Empty'
    },
    Report: {
        inputs: [ 
            { data: "نوم", type: "text", required: true, name: "productName", feildtype: "input", lg: 2, md: 2, sm: 1, xs: 12, lang: "ph" },
        ],
        ReportProductPage : [
            // {data:'Admission Date', feildtype:'label' , lg: 3 , md: 3, sm: 12, xs: 12},
            // {data: 'Admission Date', type: 'text', required: true, name: 'Admission-Date', feildtype:'input', lg: 5 , md: 5, sm: 6, xs: 12, lang: 'en'},
            {data: ' شروع تاریخ ', type: 'text', required: false, name: 'AdmissionDate', feildtype:'date', lg: 9 , md: 9, sm: 12, xs: 12, lang:'ph'},
            {data: ' اخیر تاریخ ', type: 'text', required: false, name: 'AdmissionDate', feildtype:'date', lg: 9 , md: 9, sm: 12, xs: 12, lang:'ph'},

        ],
        
        butn:'Save ثبت',
        style:'max-Width: 400px',
        // forget:'Forgot Password ?',
        // label:"Remeber this Device",
        title: 'Kandahar',
        description: 'Product Addition Page',
        btnAdd: 'Add Row',
        addBtn: ' add  ',
        paidBtn: 'Paid',
        deleteBtn : 'Empty'
    },
     
    }
};
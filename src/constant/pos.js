import { useSelector } from "react-redux";
// import Showclasses from "../components/showclasses";
import { useState } from "react";
import Purchase from "../veiws/Dashboard/purchase/purchase";
 
export const POS = ()=> {
    const locations = [
    'Badakhshan – BDS',
    'Badghis – BGS',
    'Bamyan – BMY',
    'Daykundi – DKN',
    'Farah – FRH',
    'Faryab – FYB',
    'Ghazni – GZN',
    'Ghor – GHR',
    'Helmand – HLD',
    'Herat – HRT',
    'Jowzjan – JZN',
    'Kabul – KBL',
    'Kandahar – KDR',
    'Khost – KHT',
    'Kunar – KNR',
    'Kunduz – KDZ',
    'Laghman – LGM',
    'Logar – LGR',
    'Nangarhar – NHR',
    'Nimroz – NMZ',
    'Nuristan – NRS',
    'Paktia – PKA',
    'Paktika – PKK',
    'Panjsher – PSH',
    'Parwan – PRW',
    'Samangan – SMG',
    'SariPul – SRP',
    'Takhar – TKH',
    'Urozgan – URZ',
    'Wardak – WDK',
    'Zabul – ZBL',
    ]
 
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

    Order: {
        inputs: [ //POS Medical
            //  { data: "Name", type: "text", required: true, name: "productName", feildtype: "input", lg: 12, md: 12, sm: 12, xs: 12, lang: "en" },
            // { data: "Phone Number",  type: "text", name: "batchNumber", feildtype: "input", lg: 12, md: 12, sm: 12, xs: 12 },
            { data: "Parcel تعریف جنس ",  type: "text", name: "parcel_details", feildtype: "input", autoComplete: "off", required: true, lg: 6, md: 6, sm: 6, xs: 12 },
            // { data: "Origin",  type: "text", name: "brands", feildtype: "input", lg: 12, md: 12, sm: 12, xs: 12 },
            { data: "Destination دریافت شعبه",  type: "text", name: "parcel_destination", feildtype: "branch", autoComplete: "off", selectitems: locations, lg: 6, md: 6, sm: 6, xs: 12 },
            { data: "Weight وزن",  type: "text", name: "parcel_weight", feildtype: "input", lg: 6, md: 6, sm: 6, xs: 12 },
            // { data: "Delivery Date", type: "text", name: "delivery_date",required: true,  feildtype: "date", lg: 6, md: 6, sm: 6, xs: 12 },
 


            { data: "Receiver Name اسم دریافت کننده", type: "text", name: "receiver_name",required: true,  feildtype: "input", lg: 6, md: 6, sm: 6, xs: 12 },
            { data: "Receiver Phone شمیره دریافت", type: "number",  name: "receiver_phone", required: true, feildtype: "input", lg: 6, md: 6, sm: 6, xs: 12 },
            { data: "Receiver Address ادرس دریافت", type: "text", name: "receiver_address", required: true,  feildtype: "input", lg: 12, md: 12, sm: 12, xs: 12 },

            { data: "description معلومات اضافی", type: "text", name: "description", feildtype: "input", lg: 6, md: 6, sm: 6, xs: 12,   },

            // { data: "Tracking ID", type: "number", name: "totalPrice", feildtype: "input", lg: 6, md: 6, sm: 6, xs: 12, disabled: true },
            { data: "Total Fees کرایه", type: "number", name: "total_fees", feildtype: "input", lg: 6, md: 6, sm: 6, xs: 12,  required: true,  },
            { data: "Cash Or Loan", type: "slider", name: "cashOrLoan", feildtype: "slider", lg: 6, md: 6, sm: 6, xs: 12,  required: true,  },

            {data: 'Create Order', type: 'text', required: true, name: 'Roll', feildtype:'button', lg: 12 , md: 12, sm: 12, xs: 12, lang: 'en'},

        ],
        shirkatInputs: [ //POS Medical
            //  { data: "Name", type: "text", required: true, name: "productName", feildtype: "input", lg: 12, md: 12, sm: 12, xs: 12, lang: "en" },
            // { data: "Phone Number",  type: "text", name: "batchNumber", feildtype: "input", lg: 12, md: 12, sm: 12, xs: 12 },
            { data: "Parcel تعریف جنس",  type: "text", name: "parcel_details", feildtype: "input", required: true, lg: 6, md: 6, sm: 6, xs: 12 },
            // { data: "Origin",  type: "text", name: "brands", feildtype: "input", lg: 12, md: 12, sm: 12, xs: 12 },
            { data: "Destination دریافت شعبه",  type: "text", name: "parcel_destination", feildtype: "branch",selectitems: locations, lg: 6, md: 6, sm: 6, xs: 12 },
            { data: "Weight وزن",  type: "text", name: "parcel_weight", feildtype: "input", lg: 6, md: 6, sm: 6, xs: 12 },
            // { data: "Delivery Date", type: "text", name: "delivery_date",required: true,  feildtype: "date", lg: 6, md: 6, sm: 6, xs: 12 },
 


            { data: "Receiver Name اسم دریافت کننده", type: "text", name: "receiver_name",required: true,  feildtype: "input", lg: 6, md: 6, sm: 6, xs: 12 },
            { data: "Receiver Phone شمیره دریافت", type: "number",  name: "receiver_phone", required: true, feildtype: "input", lg: 6, md: 6, sm: 6, xs: 12 },
            { data: "Receiver Address ادرس دریافت", type: "text", name: "receiver_address", required: true,  feildtype: "input", lg: 12, md: 12, sm: 12, xs: 12 },

            { data: "description معلومات اضافی", type: "text", name: "description", feildtype: "input", lg: 12, md: 12, sm: 12, xs: 12,   },

            // { data: "Tracking ID", type: "number", name: "totalPrice", feildtype: "input", lg: 6, md: 6, sm: 6, xs: 12, disabled: true },
            { data: "Our Fees کرایه", type: "number", name: "total_fees", feildtype: "input", lg: 6, md: 6, sm: 6, xs: 12,  required: true,  },
            { data: "Shirkat Fees ارزش مجموعی", type: "number", name: "shirkat_fees", feildtype: "input", lg: 6, md: 6, sm: 6, xs: 12,    },
            // { data: "Total Customer Charges", type: "number", name: "total_customerFees", feildtype: "input", lg: 6, md: 6, sm: 6, xs: 12,    },
            // { data: "Cash Or Loan", type: "slider", name: "cashOrLoan", feildtype: "slider", lg: 6, md: 6, sm: 6, xs: 12,  },

            // {data: 'Create Order', type: 'text', required: true, name: 'Roll', feildtype:'button', lg: 12 , md: 12, sm: 12, xs: 12, lang: 'en'},

        ],
        CreateShop:[
              { data: "Shop Name*", type: "text", name: "name",required: true,  feildtype: "input", lg: 12, md: 12, sm: 12, xs: 12 },
              //   { data: "Phone 2", type: "number", name: "phone2",  feildtype: "input", lg: 12, md: 12, sm: 12, xs: 12 },
              { data: "Address", type: "text", name: "address",  feildtype: "input", lg: 12, md: 12, sm: 12, xs: 12 },
              //   { data: "User Name*", type: "text", name: "username", required: true, feildtype: "input", lg: 6, md: 6, sm: 6, xs: 12 },
              { data: "Phone 1*", type: "number", name: "phone1",required: true,  feildtype: "input", lg: 6, md: 6, sm: 6, xs: 12 },
              { data: "Password*", type: "text", name: "password", required: true, feildtype: "input", lg: 6, md: 6, sm: 6, xs: 12 },
              { data: "Old Dues", type: "text", name: "old_Dues", required: false, feildtype: "input", lg: 12, md: 12, sm: 12, xs: 12 },
            // { data: "Tracking ID", type: "number", name: "totalPrice", feildtype: "input", lg: 6, md: 6, sm: 6, xs: 12, disabled: true },

            {data: 'Register Shop', type: 'text', required: true, feildtype:'button', lg: 12 , md: 12, sm: 12, xs: 12, lang: 'en'},

        ],
        CustomerPopup:[
            { data: "Customer Name*", type: "text", name: "name",required: true,  feildtype: "input", lg: 6, md: 6, sm: 6, xs: 12 },
            { data: "Phone Number*", type: "number", name: "phone",required: true,  feildtype: "input", lg: 6, md: 6, sm: 6, xs: 12 },
            {data: 'Register Shop', type: 'text', required: true, feildtype:'button', lg: 12 , md: 12, sm: 12, xs: 12, lang: 'en'},
        ],
        butn:'Save ثبت',
        style:'max-Width: 400px', 
        title: 'Qateh Kandahar by Wasily Technology Technology',
        description: 'Product Addition Page',
        btnAdd: 'Add Row'
    },
    Employee:{
        inputs: [ 
            { data: "Name*", type: "text", required: true, name: "Name", feildtype: "input", lg: 6, md: 6, sm: 12, xs: 12, lang: "en" },
            { data: "Phone Number*", type: "Number", required: true, name: "Phone_Number", feildtype: "input", lg: 6, md: 6, sm: 12, xs: 12, lang: "en" },
            { data: "Address", type: "text", name: "Address", feildtype: "input", lg: 6, md: 6, sm: 12, xs: 12, lang: "en" },
            { data: "Salary*", type: "Number", required: true, name: "salary", feildtype: "input", lg: 6, md: 6, sm: 12, xs: 12, lang: "en" },
            { data: "Position*", type: "text", required: true, name: "position", feildtype: "input", lg: 12, md: 12, sm: 12, xs: 12, lang: "en" },
            {data: ' شروع تاریخ ', type: 'text', required: false, name: 'joining_Date', feildtype:'date', lg: 9 , md: 9, sm: 12, xs: 12, lang:'ph'},
        ] 
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
import React, { useRef } from "react";
import {
  Box,
  Typography,
  Divider,
  Grid,
  Paper,
  Button,
} from "@mui/material";
import QRCode from "react-qr-code";

const OrderDetailView = ({ data, currentValues }) => {
  // //console.log(currentValues);
  // //console.log(data);
  const invoiceRef = useRef(); // ✅ Ref for printing

  if (!data) return null;

  const info = { ...currentValues[0], ...data };
  const trackingLink = `https://app.qatehkandahar.com/search/${info.track_number}`;
  //console.log(info);
  const date = new Date(info.delivery_date).toLocaleDateString("fa-AF", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  // ✅ Print function
  const handlePrint = () => {
  const printContents = invoiceRef.current.innerHTML;
  const printTab = window.open("", "_blank");

  printTab.document.write(`
    <html>
      <head>
        <title>Print</title>
        <style>
          body {
            font-family: 'Noto Naskh Arabic', sans-serif;
            direction: rtl;
            margin: 0;
            padding: 0;
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
            background: #f8f8f8;
          }
          .container {
            width: 14cm;
            margin: auto;
            padding: 20px;
            border-radius: 8px;
            background-color: #fff;
            box-shadow: 0 0 6px rgba(0, 0, 0, 0.2);
          }
        </style>
      </head>
      <body>
        <div class="container">${printContents}</div>
      </body>
    </html>
  `);

  // printTab.document.close();

  // ✅ Wait for the tab to finish rendering before printing
  const interval = setInterval(() => {
    if (printTab.document.readyState === "complete") {
      clearInterval(interval);
      // Small delay ensures layout & fonts are painted
      setTimeout(() => {
        printTab.focus();
        printTab.print();
        // Optional: comment out next line if you want to preview first
        // printTab.close();
      }, 300);
    }
  }, 50);
};


  return (
    <Box mb={2}>
      <Button
        variant="contained"
        color="primary"
        onClick={handlePrint}
        sx={{ mb: 2 }}
      >
        چاپ کړئ / Print
      </Button>

      <Paper
        ref={invoiceRef} // ✅ Attach ref
        elevation={5}
        sx={{
          width: "14cm",
          margin: "0 auto",
          p: 3,
          borderRadius: 2,
          backgroundColor: "#fff",
          fontFamily: "'Noto Naskh Arabic', sans-serif",
          direction: "rtl",
          overflowY: "auto",
          boxShadow: "0 0 6px rgba(0,0,0,0.2)",
        }}
      >
        {/* Header */}
        <Box textAlign="left" mb={1}>
          <Typography
            variant="h5"
            fontWeight="bold"
            // sx={{  }}
            style={{color: "#1976d2", fontSize:'30px', margin:'0px', padding:'0px', textAlign:'center', fontFamily: "'Noto Naskh Arabic', sans-serif"}}
          >
            د قاطع کندهار انتقالات
          </Typography>
          <Typography variant="body2" color="text.secondary"
            style={{margin:'0px', padding:'0px',  fontSize:'14px', textAlign:'center', fontFamily: "'Noto Naskh Arabic', sans-serif"}}
          >
           آدرس ما: کوته سنګی، بوستان پلازا، منزل سوم دفتر نمبر D10
          </Typography>
          <Typography variant="body2" color="text.secondary"
            style={{margin:'0px', padding:'0px',  fontSize:'14px', textAlign:'center', fontFamily: "'Noto Naskh Arabic', sans-serif"}}
          >
آدرس ولایت: کندهار،حضرت حاجی بابا، مارکیټ رحمت نوری، منزل دوم، دفتر نمبر 3 
          </Typography>
          
          <Typography variant="body2" color="text.secondary"
            style={{margin:'0px', padding:'0px',  fontSize:'14px', textAlign:'center', fontFamily: "'Noto Naskh Arabic', sans-serif"}}
          >
کابل: 0764297383 - 0798767012   کندهار: 0700202548 - 0700374853          </Typography>
          <Divider sx={{ mt: 1, mb: 2 }} />
        </Box>

        {/* Tracking + QR */}
        <Grid display="flex" justifyContent="space-between" alignItems="center" mb={2}
            style={{margin:'0px', height:'185px', width:'100%', padding:'0px'}}
        >
          <Box 
            style={{margin:'0px',  width:'50%', padding:'0px', float:'right', textAlign:'right', fontFamily: "'Noto Naskh Arabic', sans-serif"}}
          >
            
            <Typography  style={{ fontSize: "14px", padding:'0px', margin:'0px'}}>
              {date}
            </Typography>
            <Typography variant="subtitle2" color="text.secondary" style={{  padding:'0px', margin:'0px', fontSize:'18px'}}>
              د تعقیب شمېره
            </Typography>
            <Typography variant="h6" fontWeight="bold" style={{  padding:'0px', fontSize:'20px', margin:'0px'}}>
              {info.track_number}
            </Typography>
            <Typography  style={{ fontSize: "14px", padding:'0px', margin:'0px'}}>
              www.qatehkandahar.com
            </Typography>
          {/* <Grid item xs={9} style={{padding:'0px', margin:'0px', width:'85%', float:'right'}}>{date}</Grid> */}

          </Box>
          <Box textAlign="center" 
            style={{margin:'0px', width:'50%', padding:'0px', float:'left', textAlign:'left', fontFamily: "'Noto Naskh Arabic', sans-serif"}}
          >
            <QRCode
              value={trackingLink}
              size={140}
              style={{
                border: "1px solid #ddd",
                padding: "4px",
                borderRadius: "6px",
                backgroundColor: "#fff",
              }}
            />
            <Typography variant="caption" color="text.secondary" display="block" mt={0.5}
            style={{ float:'left'}}
            >
              د تعقیب لپاره سکین کړئ
            </Typography>
          </Box>
        </Grid>

        {/* Sender + Receiver Info side by side */}
        <Grid container spacing={2} mb={2} style={{ width:'100%'}}>
          {/* Sender */}
          <Grid item xs={12} style={{  padding:'0px', margin:'0px'}}>
            <Typography variant="subtitle1" fontWeight="bold" gutterBottom style={{  padding:'0px', margin:'0px', fontSize:'18px'}}>
              د استوونکي معلومات
            </Typography>
            <Grid container spacing={1}>
              <Grid item xs={2} style={{padding:'0px', margin:'0px', width:'15%', float:'right'}}><b>نوم:</b></Grid>
              <Grid item xs={9} style={{padding:'0px', margin:'0px', width:'85%', float:'right'}}>{info.name || info.sender_name}</Grid>

              <Grid item xs={2} style={{padding:'0px', margin:'0px', width:'15%', float:'right'}}><b>تلیفون:</b></Grid>
              <Grid item xs={9} style={{padding:'0px', margin:'0px', width:'85%', float:'right'}}>{info.phone || info.sender_phone }</Grid>

              {/* <Grid item xs={2} style={{padding:'0px', margin:'0px', width:'15%', float:'right'}}><b>پته:</b></Grid>
              <Grid item xs={9} style={{padding:'0px', margin:'0px', width:'85%', float:'right'}}>{info.originAddress}</Grid> */}
            </Grid>
          </Grid>

          {/* Receiver */}
          <Grid item xs={12} style={{  padding:'0px', margin:'0px', direction: "ltr"}}>
            <Typography variant="subtitle1" fontWeight="bold" gutterBottom  style={{  padding:'0px', margin:'0px', fontSize:'18px'}}>
              د ترلاسه کوونکي معلومات
            </Typography>
            <Grid container spacing={1}>
              <Grid item xs={2} style={{padding:'0px', margin:'0px', width:'15%', float:'left'}}><b>نوم:</b></Grid>
              <Grid item xs={9} style={{padding:'0px', margin:'0px', width:'85%', float:'left'}}>{info.receiver_name}</Grid>

              <Grid item xs={2} style={{padding:'0px', margin:'0px', width:'15%', float:'left'}}><b>تلیفون:</b></Grid>
              <Grid item xs={9} style={{padding:'0px', margin:'0px', width:'85%', float:'left'}}>{info.receiver_phone}</Grid>

              {/* <Grid item xs={2} style={{padding:'0px', margin:'0px', width:'15%', float:'left'}}><b>برانچ:</b></Grid>
              <Grid item xs={9} style={{padding:'0px', margin:'0px', width:'85%', float:'left'}}>{info.parcel_destination || ''}</Grid> */}
            </Grid>
          </Grid>
        </Grid>

        {/* Parcel Info */}
          <Grid item xs={12} style={{  padding:'0px', margin:'0px'}}>
        <Typography variant="subtitle1" fontWeight="bold" gutterBottom style={{  padding:'0px', margin:'0px', fontSize:'18px'}}>
          د پارسل معلومات
        </Typography>
        <Grid container spacing={1} mb={2}>
          <Grid item xs={2} style={{padding:'0px', margin:'0px', width:'15%', float:'right'}}><b>تفصیل:</b></Grid>
          <Grid item xs={9} style={{padding:'0px', margin:'0px', width:'85%', float:'right'}}>{info.parcel_details}</Grid>

          {/* <Grid item xs={2}style={{padding:'0px', margin:'0px', width:'15%', float:'right'}}><b>وزن (کيلوګرام):</b></Grid>
          <Grid item xs={9} style={{padding:'0px', margin:'0px', width:'85%', float:'right'}}>{info.parcel_weight}</Grid> */}
      
          <Grid item xs={2} style={{padding:'0px', margin:'0px', width:'15%', float:'right'}}><b>برانچ:</b></Grid>
          <Grid item xs={9} style={{padding:'0px', margin:'0px', width:'85%', float:'right'}}>{info.parcel_destination || ''}</Grid>

          <Grid item xs={2} style={{padding:'0px', margin:'0px', width:'15%', float:'right'}}><b>ادرس:</b></Grid>
          <Grid item xs={9} style={{padding:'0px', margin:'0px', width:'85%', float:'right'}}>{info.receiver_address}</Grid>
          {/* <Grid item xs={2}style={{padding:'0px', margin:'0px', width:'15%', float:'right'}}><b>د سپارلو نېټه:</b></Grid>
          <Grid item xs={9} style={{padding:'0px', margin:'0px', width:'85%', float:'right'}}>{date}</Grid> */}
        </Grid>
        </Grid>
        <br/>

        {/* Fees */}
        <Divider sx={{ mb: 1 }} />
        <Grid container spacing={1}>
          <Grid item xs={6}>
            <Typography variant="body1" fontWeight="bold" style={{width:'50%', margin:'0px', float:'right'}}>
              ټول فیس:
            </Typography>
          </Grid>
          <Grid item xs={6}  >
            <Typography variant="body1" fontWeight="bold" textAlign="left" style={{textAlign:'left', margin:'0px', width:'50%', float:'left', fontWeight:'bold', fontSize:'16px'}}>
              {info?.pay_status == 1? `AFN ${info.total_fees}` : `(AFN ${parseFloat(info?.total_fees) + parseFloat(info?.shirkat_charges || info?.shirkat_fees || 0)})`} 
            </Typography>
          </Grid>

          {/* <Grid item xs={6}>
            <Typography variant="body1" style={{padding:'0px', margin:'0px', width:'50%', float:'right'}}>د پیسو ډول:</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body1" textAlign="left">
              {info.cashOrLoan ? "نغدې" : "پور"}
            </Typography>
          </Grid> */}
        </Grid>

        {/* Footer */}
        <Divider sx={{ mt: 2, mb: 1 }} />
        <Box textAlign="center" mt={1} style={{ textAlign:'center'}}>
          {/* <Typography variant="body2" color="text.secondary">
            مننه چې تاسو <b>وسیلي</b> غوره کړې — ستاسو د باور وړ انتقال ملګری.
          </Typography> */}
          <Typography variant="caption" color="text.secondary" style={{fontSize:'11px', textAlign:'center'}}>
            د واصیلي ټیکنالوژی 0703131865 لخوا رامینځته سوی، www.wasily.net
          </Typography>
        </Box>
      </Paper>
    </Box>
  );
};

export default OrderDetailView;


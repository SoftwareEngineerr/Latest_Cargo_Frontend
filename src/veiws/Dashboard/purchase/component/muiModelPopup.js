import React, { useRef } from "react";
import {
  Box,
  Typography,
  Divider,
  Grid,
  Paper,
  Button,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import QRCode from "react-qr-code";
import PrintLogo from "./printlogo";

const OrderDetailView = ({ data, currentValues }) => {
  const invoiceRef = useRef();

  if (!data) return null;
  const info = { ...currentValues[0], ...data };
console.log(info)

  const trackingLink = `https://app.qatehkandahar.com/track/${info.track_number}`;
  // const trackingLink = `https://qatehkandahar.com/track/kbl012305598`;

  const date = new Date(info.delivery_date).toLocaleDateString("fa-AF", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  // ==============================
  // 🔥 THERMAL PRINTER PRINT FIX
  // ==============================
  const handlePrint = () => {
    const printArea = document.getElementById("thermal-receipt");

    if (!printArea) {
      console.error("❌ thermal-receipt not found");
      return;
    }

    const html = printArea.innerHTML;
    const printWin = window.open("", "", "width=400,height=600");

    printWin.document.write(`
      <html>
        <head>
          <title>Receipt</title>

          <style>
            @page {
              size: 76mm auto;
              margin: 0;
              margin-top: 20px;
              margin-bottom: 20px;
            }

            html, body {
              direction: rtl;
              font-family: 'Noto Naskh Arabic', sans-serif;
              width: 80mm !important;
              max-width: 80mm !important;
              margin: 0 !important;
              padding: 0 !important;
              margin-bottom: 30px !important;
              margin-top: 30px !important;
              margin-right: 5px !important;

              /* Prevent Chrome auto-scaling */
              transform: scale(1) !important;
              transform-origin: top left !important;

              -webkit-print-color-adjust: exact;
              print-color-adjust: exact;
            }

            * {
              zoom: 1 !important; /* Force full-size print */
            }

            .receipt-container {
              width: 60% !important;
              padding: 5px;
              font-size: 11px;
              box-sizing: border-box;
              margin-bottom: 20px;
              margin-top: 20px;
            }

            .center { text-align: center; }
            .title { font-weight: bold; font-size: 18px; }
            .bold { font-weight: bold; }

            hr {
              border: none;
              border-top: 1px dashed #000;
              margin: 6px 0;
            }
          </style>
        </head>

        <body>
          <div class="receipt-container">
            ${html}
          </div>
        </body>
      </html>
    `);

    // printWin.document.close();

    setTimeout(() => {
      printWin.focus();
      printWin.print();
      // printWin.close();
    }, 300);
  };

  return (
    <Box mb={2}>
      <Button
        variant="contained"
        color="primary"
        onClick={handlePrint}
        sx={{ mb: 2 }}
      >
        چاپ / Print Receipt
      </Button>

      {/* PRINT AREA */}
      <div id="thermal-receipt">

        <Paper
          ref={invoiceRef}
          elevation={0}
          sx={{
            width: "70mm",
            margin: "0 auto",
            p: 1,
            background: "#fff",
            fontFamily: "'Noto Naskh Arabic', sans-serif",
            direction: "rtl",
            fontSize: "12px",
            boxShadow: "none",
          }}
        >
          <br /> <br />

          {/* HEADER */}
          <Box className="right">
            <PrintLogo />
            {/* <Typography className="title" sx={{ mb: 0 }}>
              د قاطع کندهار انتقالات
            </Typography> */}

            <Typography sx={{ fontSize: "11px" }} style={{margin:'0'}}>
              {/* کابل،کوټه سنګي، بوستان پلازا، دفتر D10 */}
              {info?.BranchAddress}
            </Typography>

            {/* <Typography sx={{ fontSize: "11px" }} style={{margin:'0'}}>
              کابل: 0764297383 - 0798767012  
            </Typography> */}

            <Typography sx={{ fontSize: "11px" }} style={{margin:'0'}}>
              {/* کندهار، حاجي بابا مارکیټ، دفتر 3 */}
                {/* کندهار، حضرت جي بابا مارکیټ، دفتر ۳ */}
                {info?.BranchDestinationAddress}
            </Typography>
            <Typography sx={{ fontSize: "11px" }} style={{margin:'0'}}>
              {/* کندهار: 0700202548 - 0700374853 */}
              {info?.BranchDestinationPhone}
            </Typography>
            <hr />
          </Box>

          {/* TRACKING + QR */}
          <Grid container>
            <Grid item xs={6} textAlign="right">
              <Typography sx={{ fontSize: "11px" }} style={{margin:'0'}}>{date}</Typography>
              <Typography sx={{ fontSize: "13px" }} style={{margin:'0'}}>د تعقیب شمېره</Typography>

              <Typography sx={{ fontSize: "16px", fontWeight: "bold" }} style={{margin:'0'}}>
                {info.track_number}
              </Typography>

              <Typography sx={{ fontSize: "10px" }} style={{margin:'0'}}>
                www.qatehkandahar.com
              </Typography>
              <Typography sx={{ fontSize: "10px" }} style={{margin:'0'}}>
                {info.branch_order_no != 0 ? info.branch_order_no : null}
              </Typography>
            </Grid>

            <Grid item xs={6} textAlign="left">
              <QRCode value={trackingLink} size={70} />
              <Typography sx={{ fontSize: "10px" }} style={{margin:'0'}}>
                د سکین سره تعقیب کړئ
              </Typography>
            </Grid>
          </Grid>

          <hr />

          {/* SENDER */}
          <Typography className="bold" style={{margin:'0'}}>د استوونکي معلومات</Typography>
          <Typography style={{margin:'0'}}><b>نوم:</b> {info.sender_name}</Typography>
          <Typography style={{margin:'0'}}><b>تلیفون:</b> {info.sender_phone}</Typography>

          <hr />

          {/* RECEIVER */}
          <Typography className="bold" style={{margin:'0'}}>د ترلاسه کوونکي معلومات</Typography>
          <Typography style={{margin:'0'}}><b>نوم:</b> {info.receiver_name}</Typography>
          <Typography style={{margin:'0'}}><b>تلیفون:</b> {info.receiver_phone}</Typography>

          <hr />

          {/* PARCEL */}
          <Typography className="bold" style={{margin:'0'}}>د پارسل معلومات</Typography>
          <Typography style={{margin:'0'}}><b>تفصیل:</b> {info.parcel_details}</Typography>
          <Typography style={{margin:'0'}}><b>برانچ:</b> {info.parcel_destination}</Typography>
          <Typography style={{margin:'0'}}><b>پته:</b> {info.receiver_address}</Typography>

          <hr />

         

          {/* <Grid container>
            <Grid item xs={6} textAlign="right">
                <Grid xs={12}>
                  <Typography className="bold">
                    kiraya 
                  </Typography>
                </Grid>
                <Grid xs={12}>
                  <Typography className="bold">
                    {info?.pay_status == 1
                      ? `AFN ${info.total_fees}`
                      : `AFN ${parseFloat(info.total_fees)
                      }`
                    }
                  </Typography>
                </Grid>
            </Grid>

            <Grid item xs={6} textAlign="left">
                <Grid xs={12}>
                  <Typography className="bold">
                    kiraya 
                  </Typography>
                </Grid>
                <Grid xs={12}>
                  <Typography className="bold">
                    {info?.pay_status == 1
                      ? `AFN ${info.total_fees}`
                      : `AFN ${parseFloat(info.total_fees)
                      }`
                    }
                  </Typography>
                </Grid>
            </Grid>
          </Grid> */}


          <Grid container style={{ margin: '0 auto', margin: "0px",
            width: "154px",
            height: "24px" 
            }}>
            <Grid item xs={4} style={{ textAlign:"left",    width: "33%", float: "left" }}>
              {/* FEES */}
              <Grid container>
                <Grid item xs={6} >
                  <Typography className="bold"  style={{margin:'0'}}>کرایه</Typography>
                </Grid>

                <Grid item xs={6} >
                  <Typography className="bold"  style={{margin:'0'}}>
                    {/* {info?.pay_status == 1
                      ? `AFN ${info.total_fees}`
                      : `AFN ${parseFloat(info.total_fees)
                      }`
                    } */}

                    {
                      info.pay_status == 1 ?
                      <>
                        ({info.total_fees})
                      </>
                      :
                        info.total_fees
                    }
                  </Typography>
                </Grid>
              </Grid>
            </Grid>

                  {
                    info.shirkat_charges
                    ? 
                      <Grid item xs={4} style={{
                          width: "33%",
                          float: "left",
                          textAlign: "center",
                      }}>
                        <Grid container>
                          <Grid item xs={6} style={{margin:'0'}}>
                            <Typography className="bold"  style={{margin:'0'}}> شرکات</Typography>
                          </Grid>

                          <Grid item xs={6} textAlign="left" style={{margin:'0'}}>
                            <Typography className="bold" style={{margin:'0'}}>
                            {
                              info.shirkat_charges
                            }
                            </Typography>
                          </Grid>
                        </Grid>
                      </Grid>
                    :
                      null
                   }
                   {
                    info.total_customer_charge
                    ?
                      <Grid item xs={4} style={{
                          width: "33%",
                          float: "right",
                      }}>
                        <Grid container>
                          <Grid item xs={6} style={{margin:'0'}}>
                            <Typography className="bold"  style={{margin:'0'}}>ټول فیس</Typography>
                          </Grid>

                          <Grid item xs={6} textAlign="left" style={{margin:'0'}}>
                            <Typography className="bold" style={{margin:'0'}}>
                            {
                              info.total_customer_charge
                            }
                            </Typography>
                          </Grid>
                        </Grid>
                      </Grid>
                      :
                      null
                   }

          </Grid>
          <hr />
          <Grid container>
            <Grid item xs={12}>
                  <Typography className="bold" style={{margin:'0'}}>
                    شرایط
                  </Typography>
            </Grid>
          </Grid>
          {/* <hr /> */}
            <Grid container>
                <Grid item xs={12}>
                  <Typography  style={{margin:'0'}} variant="body2">
                    1. بل بعد از صدور برای یکماه قابل اعتبار است، بعد از یکماه نه جنس نه پول
                    جنس داده می‌شود.
                  </Typography>
                </Grid>

                <Grid item xs={12}>
                  <Typography  style={{margin:'0'}} variant="body2">
                    2. خود را از معلومات که در بل درج شده مطمین سازید!
                  </Typography>
                </Grid>

                <Grid item xs={12}>
                  <Typography  style={{margin:'0'}} variant="body2">
                    3. برای جلوگیری از انتقال اموال غیر مجاز، کارمند موظف ما اجناس‌ تان را چک می‌کند.
                  </Typography>
                </Grid>

                <Grid item xs={12}>
                  <Typography  style={{margin:'0'}} variant="body2">
                    4. در صورت بروز حوادث طبیعی، آتش‌سوزی و تصادم، شرکت خساره اجناس‌ تان را نمی‌دهد.
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography  style={{margin:'0'}} variant="body2">
                    5. جنس پس از مسترد شدن، برای ده روز در دفاتر ما قابل نگهداری می‌باشد.
                  </Typography>
                  <Typography  style={{margin:'0'}} variant="body2">
                    6. دبل دورکيدو په صورت کي جنس او پيسي نه ورکول کيږي
                  </Typography>
                </Grid>
              </Grid>
          <hr />
          {/* FOOTER */}
          <Box className="right" sx={{height:"70px"}}>
            <Typography>
              واصیلي ټیکنالوژي – www.Wasily.net
               {/* 0703131865   */}
             
            </Typography>
              <hr />
             {/* <Typography sx={{color:"white"}}>
              Wasily.net
            </Typography> */}
          </Box>

        </Paper>
      </div>

    </Box>
  );
};

export default OrderDetailView;

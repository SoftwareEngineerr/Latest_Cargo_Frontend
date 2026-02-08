import React, { useRef } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography, Grid, Card, IconButton, CardMedia, Box, TableHead } from "@mui/material";
import { CustomBtn } from "../../../../components/button/button";
import html2canvas from 'html2canvas';
import { useSelector } from "react-redux";
import { Height } from "@mui/icons-material";
import '../sales.scss'
// const { ipcRenderer } = window.require('electron');
const PrintBillDialog = ({ open, onClose, paymentData }) => {
    // //console.log(paymentData?.customer_contact)
    // //console.log(paymentData     )
    const loginUser = localStorage.getItem('loggedInUser')
    let phoneNumber = '';

    if (paymentData?.customer_contact == undefined) {
        let phone = paymentData?.customers[0]?.phone_number?.trim() || '';
        // Remove leading zero if present
        phone = phone.replace(/^0+/, '');
        phoneNumber = '93' + phone;
    } else {
        let phone = paymentData?.customer_contact?.trim() || '';
        // Remove leading zero if present
        phone = phone.replace(/^0+/, '');
        phoneNumber = '93' + phone;
    }
    // //console.log(Number(phoneNumber))
    // const billContentElement = document.getElementById('bill-content');
        const api = useSelector((state) => state.Api); 
        const billContentRef =  useRef(null);    
          
    const sendBillToWhatsApp = () => {
        const billContentElement = document.getElementById('bill-content');
    
        if (!billContentElement) {
            console.error("Bill content not found!");
            return;
        }
    
        // Capture the bill content as an image
        html2canvas(billContentElement, {
            scale: 1, 
            width: billContentElement.scrollWidth, // Capture full width
            height: billContentElement.scrollHeight, // Capture full height
            windowWidth:  billContentElement.scrollWidth, // Capture full width
            windowHeight:  billContentElement.scrollHeight, // Capture full height
         }).then((canvas) => {
            canvas.toBlob((blob) => {
                if (!blob) {
                    console.error("Failed to convert canvas to blob");
                    return;
                }
                //console.log(billContentElement.scrollHeight, billContentElement.scrollWidth)
                // Prepare form data for image upload
                const formData = new FormData();
                formData.append("image", blob, "bill.png");
        
                // Upload the image to the backend server
                fetch(api.uploadBills, {
                    method: "POST",
                    body: formData,
                })
                .then((response) => response.json())
                .then((data) => {
                    //console.log(data);
                    if (!data.fileUrl) {
                        throw new Error("Image upload failed");
                    }
                    
                    const baseUrl = window.location.origin;
                    const uploadedImageUrl = `${baseUrl}${data.fileUrl}`;
                    //console.log(uploadedImageUrl)
                    const formattedPhoneNumber = Number(phoneNumber);
                    //console.log("Full image URL:", uploadedImageUrl);

                    const whatsappLink = `https://wa.me/${formattedPhoneNumber}?text=${encodeURIComponent(
                        `Check your bill: ${uploadedImageUrl}`
                    )}`;
                    // Open WhatsApp with the message
                    window.open(whatsappLink, "_blank");
                })
                .catch((error) => {
                    console.error("Error uploading image:", error);
                });
            }, "image/png");
        }).catch((error) => {
            console.error("Error capturing bill:", error);
        });
        
    };
    
    const currentDateTime = () => {
        const date = new Date(paymentData?.created_at);
    
        // Custom formatting options
        const options = {
            day: '2-digit',
            month: 'short', // This will give you the abbreviated month (e.g., "Mar")
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: true // To display in 12-hour format (AM/PM)
        };
    
        // Format date and time
        const formattedDate = date.toLocaleString('en-GB', options).replace(',', ''); // Remove comma if desired
        return formattedDate;
    };
    
    const handlePrint = () => {
    const content = billContentRef.current?.innerHTML;

    if (!content) {
        console.error("Nothing to print");
        return;
    }

    const fullHTML = `
        <!DOCTYPE html>
        <html>
        <head>
            <title>Receipt</title>
            <style>
                * {
                    margin: 0 !important;
                    padding: 0 !important;
                    box-sizing: border-box !important;
                }
                body {
                    width: 80mm !important;
                    font-family: 'Courier New', monospace !important;
                    font-size: 12px !important;
                    font-weight: bold !important;
                    line-height: 1.2 !important;
                }
                @page {
                    size: 80mm auto;
                    margin: 0 !important;
                }
                @media print {
                    body {
                        padding: 0 !important;
                        margin: 0 !important;
                    }
                }
            </style>
        </head>
        <body>
            ${content}
        </body>
        </html>
    `;

    // Send the full HTML to Electron main process
    if (window.electron?.ipcRenderer) {
        window.electron.ipcRenderer.send('print-bill', { htmlContent: fullHTML });
    } else {
        console.error("Electron IPC not available.");
    }
};

// In your PrintBillDialog.jsx
const sendToPrinter = async () => {
    window.print();
}
const sendToPrinter2 = async () => {

    if (!window.electronAPI) {
        console.error('Electron API not available');
        return;
    }

    const receiptData = {
        businessName: localStorage.getItem('businessName'),
        items: paymentData.inCartProducts.map(p => ({
            name: p.product_name,
            qty: p.stock_quantity,
            price: p.selling_price
        })),
        total: paymentData.total_amount
    };

    try {
        const result = await window.electronAPI.printReceipt(receiptData);
        if (result.success) {
            alert('Receipt printed successfully!');
        } else {
            alert(`Print failed: ${result.error}`);
        }
    } catch (error) {
        alert('Print error: ' + error.message);
    }
};
    const handlePrintDirect = () => {
    const { ipcRenderer } = window.require('electron');
    ipcRenderer.send('print-thermal', {
      items: [{ name: "Coffee", qty: 2, price: 5 }],
      total: 10.00
    });
  };

// Check backend connection example
const checkConnection = async () => {
    const { online } = await window.electronAPI.checkBackendConnection();
    //console.log('Backend is', online ? 'online' : 'offline');
};

        return (
            <Dialog open={open} onClose={onClose}> 
                <DialogContent>
                <div id="bill-content" ref={billContentRef}  style={{   
                    padding: '0 5px', 
                    backgroundColor: 'white',
                    fontFamily: 'Courier New, monospace',
                    fontWeight: 'bold' }}>
                    <Box><h2 style={{ margin:'0px !important', marginLeft:'5% !important'}}>{localStorage.getItem('businessName')}</h2></Box> 
                    {/* <Box><p className='loanOrcash' style={{marginLeft:'20%'}}>{paymentData?.payment_method === 'LOAN'? 'پور': 'نغد'}</p></Box>  */}
                    <Box><p>Recipt #: {paymentData?.transaction_id}  <span style={{fontSize:'18px', marginLeft:'20px', fontWeight:'bold'}}>{paymentData?.payment_method === 'LOAN'? 'پور': 'نغد'}</span></p></Box> 
                    <Box><p>Date: {currentDateTime()}</p></Box> 
                        <table>
                            <thead>
                                <tr className="boldi">
                                    <td >Item</td>
                                    <td>Price</td>
                                    <td>Qty</td>
                                    <td>Amount</td>
                                </tr>
                            </thead>
                        
                        {paymentData?.inCartProducts?.map((product, key) => ( 
                            <>
                            <tbody>
                                <tr>
                                <td>{product?.product_id}</td>
                                <td>{product?.selling_price}</td>
                                {/* <td>{product?.stock_quantity?.toFixed(2)}</td> */}
                                <td>{Number(product?.stock_quantity).toFixed(2)}</td>
                                <td>{(product?.selling_price * product?.stock_quantity)?.toFixed(2)}</td>
                                </tr>
                                <tr>
                                    <td colSpan={product?.discount > 0 ? 2 : 4} className="boldi prodName">{product?.product_name}</td>
                                    {product?.discount > 0 ? <>
                                    <td>Dis: </td>
                                    <td>{(product?.discount)?.toFixed(2)}</td>
                                    </> : null}
                                </tr>
                            </tbody> 
                            </>
                        ))} 
                        {paymentData?.discount_amount > 0? 
                        <tr>
                            <td>Discount</td>
                            <td></td>
                            <td></td>
                            <td>{paymentData?.discount_amount} </td>
                        </tr>
                        : null }
                        <tr className="boldi total">
                            <td>Total</td>
                            <td></td>
                            {/* <td>{paymentData?.inCartProducts?.reduce((acc, product) => acc + ( product?.stock_quantity), 0)}</td> */}
                            <td>{paymentData?.inCartProducts?.length}</td>
                            {/* <td>{(paymentData?.inCartProducts?.reduce((acc, product) => acc + (product?.selling_price * product?.stock_quantity) - (paymentData?.discount_amount), 0))?.toFixed(2)}</td> */}
                            <td>{parseFloat(paymentData?.total_amount)?.toFixed(2)}</td>
                        </tr>
                              
                        <tfoot>
                            <tr>
                                <td colSpan={3}>SalesPerson: {loginUser}</td>
                            </tr>
                            <tr>
                                <td className="pashtoThanks" colSpan={4}>ستاسو د راتګ څخه مننه</td>
                            </tr>
                            <tr>                                
                                <td colSpan={4}>Wasily Technology <b>www.Wasily.net</b></td>
                            </tr>
                        </tfoot>
                    </table> 
                    </div>
                </DialogContent>
                <Grid container lg={12} className='bottomTotal'>
                    <Grid xs={4} lg={4}>
                        <DialogActions>
                            <Button onClick={onClose} color="primary" variant="contained">OK</Button>
                            {/* <Button onClick={handlePrintDirect} color="primary" variant="contained">local</Button> */}
                        </DialogActions>
                    </Grid>
                    <Grid xs={4} lg={4}>
                        <DialogActions>
                            <Button onClick={sendToPrinter} color="primary" variant="contained">Print</Button>
                        </DialogActions>
                    </Grid>
                    <Grid xs={4} lg={4}>
                        <DialogActions>
                            <Button color="primary" onClick={sendBillToWhatsApp} variant="contained">WhatsApp</Button>
                        </DialogActions>
                    </Grid>
                </Grid>



            </Dialog>
        );
    };

    export default PrintBillDialog;

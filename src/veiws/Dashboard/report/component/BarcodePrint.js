    import React, { useEffect, useRef } from "react";
    import JsBarcode from "jsbarcode";
    import './../report.scss'
    const BarcodePrint = ({ barcode, productName, onClose }) => {
        const barcodeRef = useRef(null);

        const handlePrint = () => {
            const printWindow = window.open("", "_blank");
            printWindow.document.write(`
                <html>
                <head>
                    <title>Print Barcode</title>
                    <style>
                        body { text-align: center; font-family: Arial, sans-serif; }
                        svg { margin: 20px 0; }
                        @media print {
                            body * { visibility: hidden; }
                            #barcode-print { visibility: visible; position: absolute; left: 0; top: 0; }
                        }
                    </style>
                </head>
                <body>
                    <div id="barcode-print">
                        <h3>${productName}</h3>
                        <svg id="print-barcode"></svg>
                    </div>
                    <script src="https://cdn.jsdelivr.net/npm/jsbarcode/dist/JsBarcode.all.min.js"></script>
                    <script>
                        document.addEventListener("DOMContentLoaded", function() {
                            var svg = document.getElementById('print-barcode');
                            JsBarcode(svg, '${barcode}', { format: 'CODE128', width: 2, height: 50, displayValue: true });
                            // setTimeout(() => {
                            //     window.print();
                            //     setTimeout(() => window.close(), 500);
                            // }, 500);
                        });
                    </script>
                </body>
                </html>
            `);
            printWindow.document.close();
        };

        return (
            <div style={{ textAlign: "center", padding: "20px" }}>
                <h3>{productName}</h3>
                <svg ref={barcodeRef}></svg>
                <br />
                <button onClick={handlePrint} style={{ marginTop: "10px" }}>Print</button>
                <button onClick={onClose} style={{ marginTop: "10px", marginLeft: "10px" }}>Close</button>
            </div>
        );
    };

    export default BarcodePrint;

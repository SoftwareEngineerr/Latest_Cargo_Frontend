import React, { useEffect, useState } from "react";
import { Grid, Box, Button, TextField, MenuItem, IconButton, Slider } from "@mui/material";
import { Close as CloseIcon } from "@mui/icons-material";
import axios from "axios";
import { useSelector } from "react-redux";
import AccessibleTable from "../component/table";
import { POS } from "../../../../constant/pos";
// import SuggestionInput from "../../../../components/suggestionInput/suggestionInput";
import SuggestionProducts  from "./suggestionProducts";
import { CustomBtn } from "../../../../components/button/button";

// const categoryOptions = ["Antibiotics", "Pain Relievers", "Vitamins", "Antiseptics", "Allergy Medications"]; // Static category list

const Products = () => {
    const [data, setData] = useState(POS().Purchase);
    const api = useSelector((state) => state.Api);
    const [categoryOptions, setCategoryOptions] = useState(["Antibiotics", "Pain Relievers", "Vitamins", "Antiseptics", "Allergy Medications"]);
    const [suggestions, setSuggestions] = useState([]);
    const [productsSuggestions, setProductsSuggestions] = useState([]);
    const [suplierID, setSuplierID] = useState();
    const [cashOrLoan, setCashOrLoan] = useState(1);
    const [grandTotal, setGrandTotal] = useState(0);
    const [loanAmount, setLoanAmount] = useState(0);
    const [oldBill, setOldBill] = useState();
    const [selectedProducts, setSelectedProducts] = useState([
        { productName: "", batchNumber: "", formula: "", catagoryNumber: "", invoiceDate: "", quantity: "", unitPurchasePrice: "", unitSalePrice: "", totalPrice: 0, description:"", barcode:"", image: null }
    ]);
    const [sliderValue, setSliderValue] = useState(1);
    const [butnVisiablity, setButnVisiablity] = useState(true);

    const fetchCategories = async () => {
        const userToken = JSON.parse(localStorage.getItem("User_Data"))?.token || undefined;
        try {
            const response = await axios.get(api.showCategories, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${userToken}`,
                },
            });
            if (response.status === 200) {
                //console.log(response.data.data)
                setCategoryOptions(response.data.data);
            }
        } catch (err) {
            console.error("Error fetching suppliers:", err);
        }
    };
  

    const fetchProducts = async () => {
        const userToken = JSON.parse(localStorage.getItem("User_Data"))?.token || undefined;
        try {
            const response = await axios.get(api.showProducts, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${userToken}`,
                },
            });
    
            if (response.status === 200) {
                //console.log(response.data);
                if (selectedProducts.length === 1 && selectedProducts[0].productName === "") {
                    setProductsSuggestions(response.data.data);
                }
            }
        } catch (err) {
            console.error("Error fetching products:", err);
        }
    };
    
    useEffect(() => {
        fetchProducts();
        // fetchSuppliers();
        fetchCategories();
    }, [api.showSupplier]);
    

    const handleProductChange = (index, fieldName, value) => {
        //console.log(index, fieldName, value)
        setSelectedProducts((prevProducts) => {
            const updatedProducts = prevProducts.map((product, i) =>
                i === index
                    ? {
                          ...product,
                          [fieldName]: value,
                          totalPrice:
                              fieldName === "quantity" || fieldName === "unitPurchasePrice"
                                  ? (fieldName === "quantity" ? value : product.quantity) *
                                    (fieldName === "unitPurchasePrice" ? value : product.unitPurchasePrice || 0)
                                  : product.totalPrice,
                      }
                    : product
            );
    
            // **Calculate Grand Total**
            const newGrandTotal = updatedProducts.reduce((acc, p) => acc + (p.totalPrice || 0), 0);
            setGrandTotal(newGrandTotal); // Update grand total
            
            return updatedProducts;
        });
    };
    

    const handleImageUpload = async (index, event) => {
        const file = event.target.files[0];
        if (!file) return;
    
        const formData = new FormData();
        formData.append("image", file);
    
        try {
            const userToken = JSON.parse(localStorage.getItem("User_Data"))?.token || undefined;
            const response = await axios.post(api.uploadImage, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${userToken}`,
                },
            });
    
            if (response.status === 200 && response.data.imagePath) {
                setSelectedProducts((prevProducts) =>
                    prevProducts.map((product, i) =>
                        i === index ? { ...product, image: response.data.imagePath } : product
                    )
                );
            }
        } catch (err) {
            console.error("Error uploading image:", err);
        }
    };
    
    
    const removeImage = (index) => {
        setSelectedProducts((prevProducts) =>
            prevProducts.map((product, i) => (i === index ? { ...product, image: null } : product))
        );
    };


    

const handleSubmit = async (event) => {
    event.preventDefault();
    setButnVisiablity(false);
    
    const userToken = JSON.parse(localStorage.getItem("User_Data"))?.token || undefined;
    const formData = new FormData();

    // Upload images & prepare product data
    selectedProducts.forEach((product, index) => {
        if (product.image instanceof File) {
            formData.append(`images`, product.image); // Append actual image files
        } else {
            formData.append(`imageUrls`, product.image); // If image is already uploaded, send its URL
        }
    });

        // Convert products to JSON & append to formData        // Convert products to JSON & append to
    // </Grid> formDat2
        formData.append("products", JSON.stringify(selectedProducts.map(({ image, ...rest }) => rest)));
        //console.log(selectedProducts)
        // return false
        try {
            const response = await axios.post(api.addPurchase, {products: selectedProducts, suplierID, payStatus: cashOrLoan ==1? 'Cash': 'Loan', loanAmount, grandTotal, oldBill }, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${userToken}`,
                },
            });
    
            if (response.status === 200) {
                //console.log("Success:", response);
                alert("Products added successfully!");
                setSelectedProducts([
                    { productName: "", batchNumber: "", formula: "", catagoryNumber: "", invoiceDate: "", quantity: "", unitPurchasePrice: "", unitSalePrice: "", totalPrice: 0, description:"", barcode:"", image: null }
                ]);
                setGrandTotal(0)
                setLoanAmount(0)
                setOldBill('')
                setProductsSuggestions(response.data.products);
            }
        } catch (err) {
            console.error("Error saving products:", err);
            alert("Error submitting products");
        }
    
        setButnVisiablity(true);
    };
    
    // Handle Enter key press in input field
    const handleKeyDown = (event) => {
        if (event.key === "Enter") {
            event.preventDefault(); // Stop Enter from submitting the form
        }
    };
 

    const handleProductSelect = (index,  val) => {
        //console.log(index,  val)
        // return false
        // const value = e.target.value; // Example: "7, sheedy, MKR456"
        const parts = val.split(",").map((p) => p.trim()); // ["7", "sheedy", "MKR456"]
        //console.log(val)
        if (parts.length >= 3) {
            const productID = parts[0]; // "7"
            const getPName = parts[1]; // "name"
            const formulaValue = parts[2]; // "MKR456"
            const barcodeValue = parts[3]; // "13165456"
            const imagePath = parts[4]; // "image"
            const purchase = parts[5]; // "purchasing price"
            const sellprice = parts[6]; // "selling price"
            const quantity = parts[7]; // "quantity"
            const expiry = parts[8]; // "expiry"
            const description = parts[9]; // "description"
            const categoryID = parts[10]; // "categoryid"
            const batchNumber = parts[11]; // "batchnumber"
    
            setSelectedProducts((prevProducts) =>
                prevProducts.map((product, i) =>
                    i === index
                        ? { ...product, productID, catagoryNumber:categoryID, quantity:quantity,description:description, batchNumber,  unitPurchasePrice: purchase, invoiceDate: expiry, unitSalePrice: sellprice, productName:getPName, formula: formulaValue, barcode: barcodeValue, formulaDisabled: true, image: imagePath }
                        : product
                )
            );
        }
        else{
            setSelectedProducts((prevProducts) =>
                prevProducts.map((product, i) =>
                    i === index
                        ? { ...product, productID: 'New', productName: val, formula: '', barcode: '', formulaDisabled: false, image: null }
                        : product
                )
            ); 
        }
    };
 

    return (
        <>
            {/* <Grid container>
                <Grid lg={12}>
                    <AccessibleTable rows={suggestions} />
                </Grid>
            </Grid> */}

<form onSubmit={handleSubmit}>
              
                <Grid container spacing={2}>
                    {selectedProducts.map((product, index) => (
                        <Grid container spacing={1} mt={2} key={index} alignItems="center" className="repeat">
                            {data.inputs.map((input) => (
                                <Grid item lg={input.lg} md={input.md} sm={input.sm} xs={input.xs} key={input.name}>
                                    
                                    {input.name === "productName" ? (
                                        <SuggestionProducts
                                            simple="true"
                                            handleInputChange={(e) => handleProductSelect(index, e.target.value)}
                                            Suggestions={productsSuggestions}
                                            // name={data.product_id}
                                            // onDelete={handleDelete}
                                        />
                                    ) : input.name === "invoiceDate" ? (
                                        <TextField
                                            type="date"
                                            name={input.name}
                                            label={input.data}
                                            value={product[input.name]}
                                            onChange={(e) => handleProductChange(index, input.name, e.target.value)}
                                            fullWidth
                                            InputLabelProps={{ shrink: true }}
                                        />
                                    ) : input.name === "categoryNumber" ? (
                                        <>
                                    
                                        <TextField
                                            select
                                            name={input.name}
                                            label={input.data}
                                            value={product.catagoryNumber || product[input.name] || ""}  // Ensure default selection
                                            onChange={(e) => handleProductChange(index, input.name, e.target.value)}
                                            fullWidth
                                        >
                                            {categoryOptions.map((option) => (
                                                <MenuItem key={option.category_id} value={option.category_id}>
                                                    {option.category_name}
                                                </MenuItem>
                                            ))}
                                        </TextField>
                                        </>
                                    ):   input.name === "barcode" ? (
                                        <>
                                        <TextField
                                        type={input.type}
                                            name={input.name}
                                            label={input.data}
                                            value={product[input.name]} 
                                            required={input.required}
                                            onChange={(e) => handleProductChange(index, input.name, e.target.value)}
                                            // disabled={input.disabled}
                                            onKeyDown={handleKeyDown}
                                            fullWidth
                                            disabled={product.formulaDisabled} // Disable field if value is set
                                            
                                        >
                                        </TextField>
                                        <br/>
                                        <label className="barcode">{product[input.name]} </label>
                                        </>
                                    ) : input.name === "totalPrice" ? (
                                        <>
                                        {//console.log('===>', product.unitPurchasePrice)}
                                        <label className="barcode">{product?.unitPurchasePrice * product?.quantity} </label>
                                        </>
                                    ): (
                                        <TextField
                                            type={input.type}
                                            name={input.name}
                                            label={input.data}
                                            value={product[input.name]}
                                            onChange={(e) => handleProductChange(index, input.name, e.target.value)}
                                            required={input.required}
                                            disabled={input.disabled}
                                            fullWidth
                                        />
                                    )
                                    }
                                </Grid>
                            ))}

                            {/* Image Upload Field */}
                            <Grid item lg={2} md={2} sm={2} xs={12}>
                                {!product.image ? (
                                    <>
                                        <input
                                            accept="image/*"
                                            type="file"
                                            onChange={(e) => handleImageUpload(index, e)}
                                            style={{ display: "none" }}
                                            id={`upload-button-${index}`}
                                        />
                                        <label htmlFor={`upload-button-${index}`}>
                                            <Button variant="contained" component="span">
                                                Upload Image
                                            </Button>
                                        </label>
                                    </>
                                ) : (
                                    <Box position="relative" display="inline-block">
                                        <img
                                            src={product.image ? `http://localhost:4000${product.image}` : ""}
                                            alt="Preview"
                                            width={50}
                                            height={50}
                                            style={{ borderRadius: "5px" }}
                                        />
                                        <IconButton
                                            size="small"
                                            onClick={() => removeImage(index)}
                                            sx={{
                                                position: "absolute",
                                                top: 0,
                                                right: 0,
                                                backgroundColor: "rgba(255, 255, 255, 0.8)",
                                            }}
                                        >
                                            <CloseIcon fontSize="small" />
                                        </IconButton>
                                    </Box>
                                )}
                            </Grid>

                            
                        </Grid>
                    ))}
                </Grid> 


                <Grid container justifyContent="center" mt={2}>
                    {/* <Button type="submit" variant="contained" color="success" >
                        Save
                    </Button> */}
                    <Box>
                        <CustomBtn disable={!butnVisiablity} data={data.butn} style={{ margin: 'auto', display: 'block', marginTop: '10px' }} />
                    </Box>
                </Grid>
            </form>
        </>
    );
};

export default Products;

import React, { useEffect, useState } from "react";
import {
  Box,
  Grid,
  CircularProgress,
  List,
  ListItemButton,
  TextField,
} from "@mui/material";
import { Input } from "../input/input";
import { useSelector } from "react-redux";
import axios from "axios";

const NameHistoryShirkat = (props) => {
  const url = useSelector((state) => state.Api);
  const token = sessionStorage.getItem("User_Data")
    ? JSON.parse(sessionStorage.getItem("User_Data")).token
    : null;

  const [shirkat, setShirkat] = useState([]);
  const [loading, setLoading] = useState(false);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  const [showPhoneList, setShowPhoneList] = useState(false);
  const [phoneSearch, setPhoneSearch] = useState("");

  // ✅ Fetch Shirkat from API or sessionStorage
  const fetchShirkat = async () => {
    try {
      setLoading(true);

      const stored = sessionStorage.getItem("shirkat");
      if (stored) {
        setShirkat(JSON.parse(stored));
        return;
      }

      const res = await axios.get(url.Shirkat, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = res.data.data || [];

      setShirkat(data);
      sessionStorage.setItem("shirkat", JSON.stringify(data));
    } catch (err) {
      console.error("❌ Error fetching shirkat", err);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Load initial data on mount
  useEffect(() => {
    fetchShirkat();

    // ✅ Listen for updates from RegisterShopModal
    const handleShirkatUpdate = () => {
      const stored = sessionStorage.getItem("shirkat");
      if (stored) setShirkat(JSON.parse(stored));
    };

    window.addEventListener("shirkatUpdated", handleShirkatUpdate);

    return () => {
      window.removeEventListener("shirkatUpdated", handleShirkatUpdate);
    };
  }, []);

  // ✅ Filtered phones based on search
  const filteredPhones = shirkat.filter((c) => {
    const search = phoneSearch.toLowerCase();

    return (
      c.phone1?.toLowerCase().includes(search) ||
      c.name?.toLowerCase().includes(search)
    );
  });


  // ✅ Handle selecting a customer
  const handleSelectCustomer = (customer) => {
    //console.log(customer)
    setName(customer.name);
    setPhone(customer.phone1);
    setShowPhoneList(false);
    sessionStorage.setItem("selectedShirkat", JSON.stringify(customer));

    // Pass data to parent
    props.handleInputChange({
      target: { srn: customer.srn, name: "name", value: customer.name },
    });
    props.handleInputChange({
      target: { srn: customer.srn, name: "phone", value: customer.phone1 },
    });
  };

  // ✅ Handle phone search input
  const searchPhone = (e) => {
    setPhoneSearch(e.target.value);

    // Reload latest from sessionStorage to ensure new shops are visible
    const stored = sessionStorage.getItem("shirkat");
    if (stored) setShirkat(JSON.parse(stored));
  };

  return (
    <Grid item lg={6} md={6} sm={6} xs={12}>
      <Box mt="15px" mr="10px" position="relative">
        <Input
          type="text"
          placeholder="Phone"
          name="phone"
          value={`${name} ${phone}`}
          readOnly
          onClick={() => setShowPhoneList(!showPhoneList)}
          sx={{ backgroundColor: "#f5f4f4", cursor: "pointer" }}
        />

        {showPhoneList && (
          <Box
            sx={{
              position: "absolute",
              width: "100%",
              backgroundColor: "white",
              boxShadow: "0 2px 5px rgba(0,0,0,0.2)",
              zIndex: 5,
              maxHeight: 250,
              overflowY: "auto",
              borderRadius: "4px",
            }}
          >
            <Box p={1}>
              <TextField
                fullWidth
                size="small"
                placeholder="Search phone..."
                value={phoneSearch}
                onChange={searchPhone}
              />
            </Box>

            {loading ? (
              <Box display="flex" justifyContent="center" p={2}>
                <CircularProgress size={20} />
              </Box>
            ) : (
              <List>
                {filteredPhones.map((customer, index) => (
                  <ListItemButton
                    key={index}
                    onClick={() => handleSelectCustomer(customer)}
                  >
                    {customer.phone1} — {customer.name}
                  </ListItemButton>
                ))}
              </List>
            )}
          </Box>
        )}
      </Box>
    </Grid>
  );
};

export default NameHistoryShirkat;

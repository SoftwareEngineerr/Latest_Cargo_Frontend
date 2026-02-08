import React, { useState, useMemo } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Collapse,
  IconButton,
  Box,
  Paper,
  Typography,
  Grid,
  Button,
} from "@mui/material";
import { KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import AccordionData from "./accordiondata";
import { FullDate } from "../../../../components/Date/FullDate";
import { CustomBtn } from "../../../../components/button/button";

const DynamicAccordionTable = (props) => {
  console.log(props)
  const [openRow, setOpenRow] = useState(null);
  const [sortKey, setSortKey] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");

  const [startDate, setStartDate] = useState(() => {
    const yesterday = new Date();
    // yesterday.setDate(yesterday.getDate() - 1);
    // yesterday.setDate(yesterday.getDate() - 1);
    console.log(yesterday)
    return yesterday;
  });

  const [endDate, setEndDate] = useState(() => {
    const tomorrow = new Date();
    // tomorrow.setDate(tomorrow.getDate() + 1);
    // tomorrow.setDate(tomorrow.getDate() + 1);
    console.log(tomorrow)
    return tomorrow;
  });
  const [ dataStartDate , setDataStartDate] = useState();
  const [ dataEndDate , setDataEndDate ] = useState()


  const keys = props.data[0]
    ? Object.keys(props.data[0]).filter((k) => k !== "Accordion")
    : [];

  const sortedData = useMemo(() => {
    if (!sortKey || !props.data) return props.data;
    return [...props.data].sort((a, b) => {
      const valA = a[sortKey]?.toString().toLowerCase() || "";
      const valB = b[sortKey]?.toString().toLowerCase() || "";
      if (valA < valB) return sortOrder === "asc" ? -1 : 1;
      if (valA > valB) return sortOrder === "asc" ? 1 : -1;
      return 0;
    });
  }, [props.data, sortKey, sortOrder]);

  if (!Array.isArray(props.data) || props.data.length === 0) {
    return (
      <Typography variant="h6" align="center" sx={{ mt: 3 }}>
        No data available.
      </Typography>
    );
  }

  const toggleRow = (index) => {
    setOpenRow(openRow === index ? null : index);
  };

  const handleSort = (key) => {
    if (sortKey === key) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortKey(key);
      setSortOrder("asc");
    }
  };

  const handleFilterClick = () => {
    // Call parent function with selected dates
    console.log(dataStartDate, dataEndDate);
    props.myfunc(dataStartDate, dataEndDate);
  };

  return (
    <>
      <Grid container >
        <Grid item sm={6} xs={12} sx={{ display: "block", margin: 'auto' }}>
          <FullDate
            getprops={{ name: "From", value: dataStartDate }}
            onChange={(e) => setDataStartDate(e)}
          />
        </Grid>
      </Grid>
      <Grid container >
        <Grid item sm={6} xs={12} sx={{ display: "block", margin: 'auto' }}>
          <FullDate
            getprops={{ name: "To", value: dataEndDate }}
            onChange={(e) => setDataEndDate(e)}
          />
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} sx={{ display: "block", margin: 'auto' }}>
          <CustomBtn
            click={handleFilterClick}
            data="Filter"
          />
        </Grid>
      </Grid>
      <br />
      <TableContainer
        component={Paper}
        sx={{
          borderRadius: 3,
          boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
          overflow: "hidden",
          width: "95%",
          mx: "auto",
          mt: 2,
        }}
      >
        <Table>
          <TableHead sx={{ backgroundColor: "#fafafa" }}>
            <TableRow>
              <TableCell />
              {keys.map((key) => (
                <TableCell
                  key={key}
                  sx={{
                    fontWeight: 600,
                    textTransform: "capitalize",
                    cursor: "pointer",
                    userSelect: "none",
                  }}
                  onClick={() => handleSort(key)}
                >
                  <Box display="flex" alignItems="center">
                    {key.replace(/_/g, " ")}
                    {sortKey === key &&
                      (sortOrder === "asc" ? (
                        <ArrowUpwardIcon fontSize="small" sx={{ ml: 0.5 }} />
                      ) : (
                        <ArrowDownwardIcon fontSize="small" sx={{ ml: 0.5 }} />
                      ))}
                  </Box>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>

          <TableBody>
            {sortedData.map((row, index) => (
              <>
                <React.Fragment key={index}>
                  <TableRow
                    hover
                    sx={{
                      "&:hover": { backgroundColor: "#f9f9f9" },
                      cursor: "pointer",
                    }}
                    onClick={() => toggleRow(index)}
                  >
                    <TableCell>
                      <IconButton size="small">
                        {openRow === index ? (
                          <KeyboardArrowUp />
                        ) : (
                          <KeyboardArrowDown />
                        )}
                      </IconButton>
                    </TableCell>
                    {keys.map((key) => (
                      <TableCell key={key}>{row[key]}</TableCell>
                    ))}
                  </TableRow>
                  <TableRow>
                    <TableCell colSpan={keys.length + 1} sx={{ p: 0 }}>
                      <Collapse in={openRow === index} timeout="auto" unmountOnExit>
                        <AccordionData
                          startDate={dataStartDate}
                          endDate={dataEndDate}
                          rowData={row}
                        />
                      </Collapse>
                    </TableCell>
                  </TableRow>
                </React.Fragment>
              </>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default DynamicAccordionTable;

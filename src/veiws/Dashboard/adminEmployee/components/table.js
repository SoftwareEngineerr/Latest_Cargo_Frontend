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
import { FullDate } from "../../../../components/Date/FullDate";
import { CustomBtn } from "../../../../components/button/button";
import EmployeeRegister from "../employee";


const DynamicAccordionTable = (props) => {
  const [openRow, setOpenRow] = useState(null);
  const [sortKey, setSortKey] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");

  const [startDate, setStartDate] = useState(() => {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    return yesterday;
  });

  const [endDate, setEndDate] = useState(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow;
  });

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
    props.myfunc(startDate, endDate);
  };

  return (
    <>
      
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
                        {/* <AccordionData
                          startDate={startDate}
                          endDate={endDate}
                          rowData={row}
                        /> */}
                        <EmployeeRegister brsrn={row} />
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

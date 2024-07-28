import React, { useState, useRef, forwardRef } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  Box,
  Button,
  Grid,
  Typography,
  Menu,
  MenuItem,
  IconButton,
} from "@mui/material";
import RefreshIcon from "@mui/icons-material/Refresh";
import Datepicker from "../../DateTimePicker/DatePicker";
import { Container, OverlayTrigger, Tooltip } from "react-bootstrap";
import { useReactToPrint } from "react-to-print";
import * as XLSX from "xlsx";
import styled from "styled-components";
import { useSelector } from "react-redux";
import {PlantReport,ProductionReport,DowntimeRepo,QualityReport} from "./utility";
import MoreVertIcon from "@mui/icons-material/MoreVert";

// Styled components for consistent layout
const CenteredContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ButtonContainer = styled.div`
  display: flex;
  margin: -40px 0px 0px 0;
  background-color: #f3f3f3;
  height: 50px;

  button {
    color: #0f2765;
    font-weight: 600;
    border-radius: 0px;
    background-color: transparent;
    cursor: pointer;
    transition: all 0.3s ease;
    padding: 5px 15px;

    &:hover {
      background-color: hsl(48.62deg, 82.95%, 61.37%);
      color: #0f2765;
    }

    &.active {
      background-color: hsl(48.62deg, 82.95%, 61.37%);
    }
  }
`;

// Component to render report content based on selected report type
const ReportContent = forwardRef(
  ({ dates, plantR, ProR, DownR, QualR }, ref) => {
    // Helper function to format date
    const formatDate = (timestamp) => {
      const date = new Date(timestamp);
      const day = String(date.getDate()).padStart(2, "0");
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const year = String(date.getFullYear());
      return `${day}/${month}/${year}`;
    };

    return (
      <div ref={ref} style={{ paddingTop: "2%", width: "100%" }}>
        {plantR ? (
          <PlantReport dates={dates} />
        ) : ProR ? (
          <ProductionReport dates={dates} />
        ) : DownR ? (
          <DowntimeRepo dates={dates} />
        ) : QualR ? (
          <QualityReport dates={dates} />
        ) : (
          <></>
        )}
      </div>
    );
  }
);

// Main Report component
const Report = ({ isOpen, toggle }) => {
  // State variables to manage report types and data
  const [plantR, setPlantR] = useState(true);
  const [ProR, setProR] = useState(false);
  const [DownR, setDownR] = useState(false);
  const [QualR, setQualR] = useState(false);
  const [activeButton, setActiveButton] = useState("plant");
  const componentPDF = useRef();
  const tableRef = useRef();
  const dates = useSelector((state) => state.datePicker.dates);

  // State for dropdown menu
  const [anchorEl, setAnchorEl] = useState(null);

  // Hook to handle PDF generation
  const generatePDF = useReactToPrint({
    content: () => componentPDF.current,
    documentTitle: "Plant Report",
    onAfterPrint: () => toast.success("PDF downloaded successfully"),
  });

  // Function to extract table data and download as CSV
  const downloadCSV = () => {
    const table = tableRef.current;
    const rows = table.querySelectorAll("tr");

    const csvData = [];
    rows.forEach((row) => {
      const cols = row.querySelectorAll("td, th");
      const rowData = [];
      cols.forEach((col) => {
        rowData.push(col.innerText);
      });
      csvData.push(rowData.join(","));
    });

    const csvContent = "data:text/csv;charset=utf-8," + csvData.join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "report_data.csv");
    document.body.appendChild(link);

    link.click();
    document.body.removeChild(link);

    toast.success("CSV downloaded successfully");
  };
  // Function to extract table data and download as Excel
  const downloadExcel = () => {
    const table = tableRef.current;
    const ws = XLSX.utils.table_to_sheet(table);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Report Data");

    //Generate the excel file and trigger download
    XLSX.writeFile(wb, "report_data.xlsx");

    toast.success("Data downloaded succesfully");
  };

  // Handlers for different report buttons
  const productionHandler = () => {
    setPlantR(false);
    setDownR(false);
    setQualR(false);
    setProR(true);
    setActiveButton("production");
  };

  const plantHandler = () => {
    setProR(false);
    setDownR(false);
    setQualR(false);
    setPlantR(true);
    setActiveButton("plant");
  };

  const downtimeHandler = () => {
    setProR(false);
    setPlantR(false);
    setQualR(false);
    setDownR(true);
    setActiveButton("downtime");
  };

  const qualityHandler = () => {
    setProR(false);
    setPlantR(false);
    setDownR(false);
    setQualR(true);
    setActiveButton("quality");
  };

  // Dropdown menu handlers
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  // Function to handle menu item click
  const handleMenuItemClick = (action) => {
    switch (action) {
      case "pdf":
        // Logic to handle PDF download
        generatePDF();
        break;
      case "excel":
        // Logic to handle Excel download
        downloadExcel();
        break;
      case "csv":
        // Logic to handle CSV download
        downloadCSV();
        break;
      default:
        toast.info("please try Again...");
        break;
    }

    // Close the menu after action
    handleClose();
  };

  return (
    <div style={{ display: "inline-block", width: "98%" }}>
      <ToastContainer />
      {/* Toolbar for date picker and action buttons */}
      <div
        className="header"
        style={{
          backgroundColor: "hsl(0deg 0% 95.29%)",
          display: "flex",
          position: "fixed",
          marginTop: "0%",
          width: isOpen ? "89%" : "100%",
          padding: "1% 0% 0% 3%",
        }}
      >
        <Grid
          columnSpacing={2}
          sx={{ display: "flex", float: "left", width: "97%" }}
        >
          <Grid item lg={7} sx={{ display: "inline-block", float: "left" }}>
            <Typography
              sx={{
                color: "hsl(215.84deg 100% 15.1%)",
                fontWeight: 800,
                marginTop: "4px",
                alignItems: "center",
              }}
            >
              Reports
            </Typography>
          </Grid>
          <Grid
            item
            lg={5}
            sx={{ marginLeft: "auto", boxShadow: "none", float: "right" }}
          >
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Box
                sx={{ color: "hsl(215.84deg 100% 15.1%)", marginRight: "1%" }}
              >
                <Datepicker />
              </Box>
              <Button
                sx={{ color: "hsl(215.84deg 100% 15.1%)", fontWeight: 500 }}
              >
                <OverlayTrigger
                  placement="top"
                  overlay={
                    <Tooltip variant="light" id="button-tooltip-2">
                      Refresh
                    </Tooltip>
                  }
                >
                  <RefreshIcon />
                </OverlayTrigger>
              </Button>
              <IconButton
                aria-label="more"
                id="more-vert-button"
                aria-controls={anchorEl ? "long-menu" : undefined}
                aria-expanded={anchorEl ? "true" : undefined}
                aria-haspopup="true"
                onClick={handleClick}
                sx={{ color: "hsl(215.84deg 100% 15.1%)", marginRight: "1%" }}
              >
                <MoreVertIcon />
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={() => handleMenuItemClick("pdf")}>
                  Download as PDF
                </MenuItem>
                <MenuItem onClick={() => handleMenuItemClick("excel")}>
                  Download as Excel
                </MenuItem>
                <MenuItem onClick={() => handleMenuItemClick("csv")}>
                  Download as CSV
                </MenuItem>
              </Menu>
            </Box>
          </Grid>
        </Grid>
      </div>

      {/* Main content container */}
      <Container
        style={{ marginTop: "10%", paddingLeft: isOpen ? "3%" : "0%" }}
      >
        <CenteredContainer>
          <ButtonContainer>
            {/* Buttons to switch between different reports */}
            <Button
              className={activeButton === "plant" ? "active" : ""}
              onClick={plantHandler}
              sx={{ color: "#0f2765", fontWeight: "600" }}
            >
              Plant Report
            </Button>
            <Button
              className={activeButton === "production" ? "active" : ""}
              onClick={productionHandler}
              sx={{ color: "#0f2765", fontWeight: "600" }}
            >
              Production Report
            </Button>
            <Button
              className={activeButton === "downtime" ? "active" : ""}
              onClick={downtimeHandler}
              sx={{ color: "#0f2765", fontWeight: "600" }}
            >
              Downtime Report
            </Button>
            <Button
              className={activeButton === "quality" ? "active" : ""}
              onClick={qualityHandler}
              sx={{ color: "#0f2765", fontWeight: "600" }}
            >
              Quality Report
            </Button>
          </ButtonContainer>
        </CenteredContainer>

        {/* Render selected report content */}
        <Box ref={tableRef}>
          <ReportContent
            ref={componentPDF}
            dates={dates}
            plantR={plantR}
            ProR={ProR}
            DownR={DownR}
            QualR={QualR}
          />
        </Box>
      </Container>
    </div>
  );
};

export default Report;

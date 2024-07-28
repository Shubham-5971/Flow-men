import { useReactToPrint } from "react-to-print";
import React, { useEffect, useState, useRef } from "react";
import {
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
} from "@coreui/react";
import "bootstrap/dist/css/bootstrap.min.css";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";


const ProductionReport = ({ dates }) => {
  const [reportData, setProdReportData] = useState([]);
  const componentPDF = useRef();
  // const navigate = useNavigate();
  // const [activeButton, setActiveButton] = useState("production"); // State to manage active button
  // const generatePDF = useReactToPrint({
  //   content: () => componentPDF.current,
  //   documentTitle: "Userdata",
  //   onAfterPrint: () => alert("Data downloaded successfully"),
  // });

  // API for the report
  const URL = `https://api.golain.io/876dbb57-d0aa-447b-ac43-983b1b1aca19/wke/getProductionReport/get_productionReport/?start=${dates[0]}&stop=${dates[1]}`;

  useEffect(() => {
    const fetchProdReportData = async () => {
      try {
        const response = await fetch(URL, {
          headers: {
            "Content-Type": "application/json",
            Authorization:
              "APIKEY 68421f9c518fcd554ad4a6397039bacdb82b863dc4c5154b939d50ecbe3cb29b",
            "org-id": "b7d31442-4487-4138-b69d-1fd97e7a5ae6",
          },
        });

        const responseData = (await response.json()).data;
        setProdReportData(responseData); // Assuming responseData contains the data in the required format
      } catch (error) {
        console.error(error);
      }
    };

    fetchProdReportData();
  }, [dates]);

  // Function to convert timestamp to DD/MM/YY format
  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-indexed
    const year = String(date.getFullYear());
    return `${day}/${month}/${year}`;
  };

  return (
    <>
      <p style={{ fontSize: "16px", fontWeight: "700" }}>Daily Summary</p>
      <div ref={componentPDF} style={{ overflowX: "auto", width: "100%" }}>
        <CTable
          bordered
          borderColor="gray"
          style={{
            width: "100%",
            border: "1px solid gray",
            textAlign: "center",
          }}
        >
          <CTableHead>
            <CTableRow>
              <CTableHeaderCell rowSpan="2" scope="col">
                Date
              </CTableHeaderCell>
              <CTableHeaderCell colSpan="3" scope="col">
                Production
              </CTableHeaderCell>
              <CTableHeaderCell rowSpan="2" scope="col">
                Energy per good production(kWh)
              </CTableHeaderCell>
            </CTableRow>
            <CTableRow>
              <CTableHeaderCell scope="col">Good</CTableHeaderCell>
              <CTableHeaderCell scope="col">Reject</CTableHeaderCell>
              <CTableHeaderCell scope="col">Total</CTableHeaderCell>
            </CTableRow>
          </CTableHead>
          <CTableBody>
            {reportData && reportData.length > 0 ? (
              reportData.map((data, index) => (
                <CTableRow
                  key={index}
                  color={
                    index % 3 === 0
                      ? "info"
                      : index % 3 === 1
                      ? "warning"
                      : "danger"
                  }
                >
                  <CTableDataCell>{formatDate(data.timestamp)}</CTableDataCell>
                  <CTableDataCell>{data.good}</CTableDataCell>
                  <CTableDataCell>{data.reject}</CTableDataCell>
                  <CTableDataCell>{data.total}</CTableDataCell>
                  <CTableDataCell>{data.energy1}</CTableDataCell>
                </CTableRow>
              ))
            ) : (
              <CTableRow>
                <CTableDataCell colSpan="10">
                  No Dates Selected/No Data in Selected Dates
                </CTableDataCell>
              </CTableRow>
            )}
          </CTableBody>
        </CTable>
      </div>
    </>
  );
};

export default ProductionReport;

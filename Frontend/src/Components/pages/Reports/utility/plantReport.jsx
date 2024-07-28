import React, { useEffect, useState } from "react";
import styled from "styled-components";
import {
  CTable,
  CTableBody,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableDataCell,
} from "@coreui/react";

const StyledTable = styled(CTable)`
  tbody tr:nth-child(3n + 1) {
    background-color: hsl(48.62deg, 82.95%, 61.37%);
  }
  tbody tr:nth-child(3n + 2) {
    background-color: red;
  }
  tbody tr:nth-child(3n + 3) {
    background-color: blue;
  }
`;

const StyledTableCell = styled(CTableDataCell)`
  color: #000; /* Adjust text color */
`;

const PlantReport = ({ dates }) => {
  const [reportData, setReportData] = useState([]);

  const URL = `https://api.golain.io/876dbb57-d0aa-447b-ac43-983b1b1aca19/wke/getplantReport/get_plantReport/?start=${dates[0]}&stop=${dates[1]}`;

  useEffect(() => {
    const fetchReportData = async () => {
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
        setReportData(responseData); // Assuming responseData contains the data in the required format
      } catch (error) {
        console.error(error);
      }
    };

    fetchReportData();
  }, [dates]);

  // Function to convert timestamp to DD/MM/YY format
  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    const day = String(date.getDate()).padStart(1, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-indexed
    const year = String(date.getFullYear());
    return `${day}/${month}/${year}`;
  };

  return (
    <>
      <p style={{ fontSize: "16px", fontWeight: "700" }}>Daily Summary</p>
      <CTable bordered borderColor="gray" style={{ textAlign: "center" }}>
        <CTableHead>
          <CTableRow>
            <CTableHeaderCell scope="col">Date</CTableHeaderCell>
            <CTableHeaderCell scope="col">Good</CTableHeaderCell>
            <CTableHeaderCell scope="col">Reject</CTableHeaderCell>
            <CTableHeaderCell scope="col">Runner Weight(kg)</CTableHeaderCell>
            <CTableHeaderCell scope="col">Energy(kWh)</CTableHeaderCell>
            <CTableHeaderCell scope="col">
              Energy per good production(kWh)
            </CTableHeaderCell>
            <CTableHeaderCell scope="col">AVAILABILITY(%)</CTableHeaderCell>
            <CTableHeaderCell scope="col">PERFORMANCE(%)</CTableHeaderCell>
            <CTableHeaderCell scope="col">QUALITY(%)</CTableHeaderCell>
            <CTableHeaderCell scope="col">OEE(%)</CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody>
          {reportData ? (
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
                <CTableDataCell>{data.weight}</CTableDataCell>
                <CTableDataCell>{data.energy2}</CTableDataCell>
                <CTableDataCell>{data.energy2}</CTableDataCell>
                <CTableDataCell>{data.availability}</CTableDataCell>
                <CTableDataCell>{data.performance}</CTableDataCell>
                <CTableDataCell>{data.quality}</CTableDataCell>
                <CTableDataCell>{data.oee}</CTableDataCell>
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
    </>
  );
};

export default PlantReport;

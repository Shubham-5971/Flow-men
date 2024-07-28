import { useReactToPrint } from "react-to-print";
import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import {
  CTable,
  CTableBody,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableDataCell,
} from "@coreui/react"; // Importing CoreUI components
import { useNavigate } from "react-router-dom";

const DowntimeRepo = ({ dates }) => {
  const componentPDF = useRef();
  const [reportData, setReportData] = useState([]);
  // const [activeButton, setActiveButton] = useState("downtime");
  // const navigate = useNavigate();
  // const generatePDF = useReactToPrint({
  //   content: () => componentPDF.current,
  //   documentTitle: "Downtime Report",
  //   onAfterPrint: () => alert("Data downloaded successfully"),
  // });

  const fetchDownReportData = async () => {
    const URL = `https://api.golain.io/876dbb57-d0aa-447b-ac43-983b1b1aca19/wke/getdowntimeReport/get-downtimeReport/?start=${dates[0]}&stop=${dates[1]}`;

    try {
      const response = await fetch(URL, {
        headers: {
          "Content-Type": "application/json",
          Authorization:
            "APIKEY 68421f9c518fcd554ad4a6397039bacdb82b863dc4c5154b939d50ecbe3cb29b",
          "org-id": "b7d31442-4487-4138-b69d-1fd97e7a5ae6",
        },
      });

      const responseData = await response.json();
      setReportData(responseData.data);
    } catch (error) {
      console.error("Error fetching downtime report:", error);
    }
  };

  useEffect(() => {
    fetchDownReportData();
  }, [dates]);

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = String(date.getFullYear());
    return `${day}/${month}/${year}`;
  };

  const formatDuration = (milliseconds) => {
    const totalMinutes = Math.floor(milliseconds / 60000);
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    return `${hours}h ${minutes}m`;
  };

  return (
    <>
      <p style={{ fontSize: "16px", fontWeight: "700" }}>Daily Summary</p>
      <CTable
        bordered
        borderColor="gray"
        style={{ width: "100%", border: "1px solid gray", textAlign: "center" }}
      >
        <CTableHead>
          <CTableRow>
            <CTableHeaderCell scope="col">Date</CTableHeaderCell>
            <CTableHeaderCell scope="col">Operator Break</CTableHeaderCell>
            <CTableHeaderCell scope="col">
              Operator Unavailable
            </CTableHeaderCell>
            <CTableHeaderCell scope="col">
              Material Unavailable
            </CTableHeaderCell>
            <CTableHeaderCell scope="col">
              Waiting On Inspection
            </CTableHeaderCell>
            <CTableHeaderCell scope="col">Machine Issues</CTableHeaderCell>
            <CTableHeaderCell scope="col">Total Downtime</CTableHeaderCell>
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
                <CTableDataCell>
                  {formatDuration(data.operator_Break)}
                </CTableDataCell>
                <CTableDataCell>
                  {formatDuration(data.operator_Unavailable)}
                </CTableDataCell>
                <CTableDataCell>
                  {formatDuration(data.material_Unavailable)}
                </CTableDataCell>
                <CTableDataCell>
                  {formatDuration(data.waiton_Inspection)}
                </CTableDataCell>
                <CTableDataCell>
                  {formatDuration(data.mechine_Issue)}
                </CTableDataCell>
                <CTableDataCell>{formatDuration(data.downtime)}</CTableDataCell>
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

export default DowntimeRepo;

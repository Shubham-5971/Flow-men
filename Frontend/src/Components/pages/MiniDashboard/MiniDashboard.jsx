import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Sidebar from "../../Navbar/SideBar";
import Home from "../../home/Home";
import TuneIcon from "@mui/icons-material/Tune";
import {
  Box,
  Grid,
  Typography,
  Button as MuiBtn,
  IconButton,
  Tooltip,
} from "@mui/material";
import CropFreeIcon from "@mui/icons-material/CropFree";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { DownTime, Machine, OEE, Production, Quality } from "./Utility";
import CustomNavbar from "../../home/mininavbar";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import CloseIcon from "@mui/icons-material/Close";
import Behind from "./Utility/Quality/Behind";
import Target from "./Utility/product/target";
import MachineModel from "./Utility/MachineModel";
import AreaChart from "./Utility/AllCharts/AreaChart";
import LChart from "./Utility/AllCharts/LineChart";

const Item = styled(Box)`
  background-color: #f1f1f1;
  padding: 10px;
  border: 1px solid #ddd;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
`;

// DropDown Css
const DummyDropdown = styled.ul`
  list-style: none;
  padding: 0;
  margin: 30px 0px 0px 25px;
  font-size: 12px;
  position: absolute;
  background-color: #f1f1f1;
  border-radius: 10px;
  // border: 1px solid #ccc;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  display: ${({ isOpen }) => (isOpen ? "block" : "none")};
`;

const DummyDropdownItem = styled.li`
  padding: 8px 16px;
  cursor: pointer;
  &:hover {
    background-color: hsl(50.1deg 93.41% 48.78% / 68%);
  }
`;
function MiniDashboard({ isOpen, toggle, isVisi = true }) {
  const [selected, setSelected] = useState({ category: "", item: "" });
  const [filters, setFilters] = useState([]);
  const [isNavbarVisible, setNavbarVisible] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [selectedComponent, setSelectedComponent] = useState("machine");

  const [DashData, setDashboardData] = useState({
    availability: 0,
    performance: 0,
    quality: 0,
    oEE: 0,
    productionVolume: 0,
    machinesInProduction: 0,
    expectedProduction: 0,
    actualProduction: 0,
    goodProduction: 0,
    rejectedProduction: 0,
    operatorBreak: 0,
    operatorUnavailable: 0,
    materialUnavailable: 0,
    waitingOnInception: 0,
    machineIssues: 0,
    Downtime: 0,
  });

  // Calculation of rejected percentage
  const { goodProduction, rejectedProduction } = DashData;
  const rejectedPercentage = Number(
    Math.abs(((goodProduction - rejectedProduction) / goodProduction) * 100)
  ).toFixed(2);

  const URL =
    "https://api.golain.io/876dbb57-d0aa-447b-ac43-983b1b1aca19/wke/get_final_data/37009e35-91fc-4c46-b15a-5767af505334/data/";

  useEffect(() => {
    const fetchData = async () => {
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
        setDashboardData(responseData[0]);
      } catch (error) {
        console.error(error);
      }
    };

    const interval = setInterval(() => {
      fetchData();
    }, 1000);

    return () => clearInterval(interval);
  }, []);
  // console.log(MiniData[0].Mdown);
  const handleSelect = (categoryId, value) => {
    setSelected({ category: categoryId, item: value });
  };

  // const toggleNavbar = () => {
  //   setNavbarVisible(!isNavbarVisible);
  // };
  const handleToggleNavbar = () => {
    setNavbarVisible(!isNavbarVisible);
  };

  //Logic For Modal
  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  //Drop Down Code
  const handleToggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  const handleSelectComponent = (componentId) => {
    setSelectedComponent(componentId);
    setDropdownOpen(false);
  };

  // Define chart options with labels and corresponding components
  const chartOptions = [
    { id: "bar-chart", label: "Bar Chart" },
    { id: "area-chart", label: "Area Chart" },
    { id: "line-chart", label: "Line Chart" },
  ];

  const difference = DashData.expectedProduction - DashData.actualProduction;

  return (
    <div>
      <div style={{ justifyContent: "center", overflow: "inherit" }}>
        {/*<-----------Navbar----------> */}
        <div
          className="header"
          style={{
            backgroundColor: "hsl(0deg 0% 95.29%)",
            display: "flex",
            position: "fixed",
            marginTop: "0%",
            width: isOpen ? "89%" : "100%",
            padding: "0% 2% 0% 1%",
            alignItems: "center",
            zIndex: 1,
          }}
        >
          {/* MiniDashBoard Code  */}
          <Grid container alignItems="center" className="mini-dashboard">
            <Grid item lg={2} className="mini-dashboard-container">
              <Typography
                style={{
                  color: "hsl(215.84deg 100% 15.1%)",
                  fontWeight: 800,
                  marginTop: "4px",
                  // new Content
                  marginLeft:"6%",
                  alignItems: "center",
                }}
              >
                MiniDashboard
              </Typography>
            </Grid>

            <Grid
              item
              lg={8}
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {isVisi && isNavbarVisible && (
                <CustomNavbar
                  filters={filters}
                  onSelect={handleSelect}
                  selected={selected}
                  isVisible={isNavbarVisible}
                />
              )}
            </Grid>

            <Grid
              item
              lg={2}
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                alignItems: "center",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  position: "fixed",
                  right: isOpen ? "0%" : "0%",
                }}
              >
                <MuiBtn
                  sx={{ color: "hsl(215.84deg 100% 15.1%)", fontWeight: 550 }}
                >
                  {isNavbarVisible ? (
                    <CloseIcon onClick={handleToggleNavbar} />
                  ) : (
                    <TuneIcon onClick={handleToggleNavbar} />
                  )}
                </MuiBtn>
              </Box>
            </Grid>
          </Grid>
        </div>
        <div style={{ display: "inline-block" }}>
          <div
            style={{
              marginTop: "60px",
              padding: "19px",
              marginLeft: "11px",
              width: "99%",
              display: "flex",
            }}
          >
            {/*Expected Production */}

            <Grid container spacing={3} item lg={9} className="grid-container">
              {/* Production Target */}
              <Grid item xs={12} sm={4} md={4} className="production-container" >
                <Item
                  sx={{
                    height: { xs: 130, sm: 130, md: 115 },
                  }}
                  style={{
                    boxShadow: "rgba(0, 0, 0, 0.2) -5px 6px 7px 0px",
                    background:
                      "linear-gradient(131deg, rgba(10, 27, 87, 1) 63%, rgb(15 46 109 / 99%) 83%)",
                    borderRadius: "5px",
                  }}
                >
                  <Production Prod={DashData.expectedProduction} />
                </Item>
              </Grid>
              {/*Actual Production*/}
              <Grid item xs={12} sm={4} md={4} className="actual-production-container">
                <Item
                  sx={{
                    height: { xs: 130, sm: 130, md: 115 },
                  }}
                  style={{
                    boxShadow: "rgba(0, 0, 0, 0.2) -5px 6px 7px 0px",
                    //   background:
                    //     "linear-gradient(131deg, rgba(10, 27, 87, 1) 63%, rgb(15 46 109 / 99%) 83%)",
                    borderRadius: "3px",
                  }}
                >
                  <Target AcProd={DashData.actualProduction} />
                </Item>
              </Grid>

              {/* Behind By  */}
              <Grid item xs={12} sm={4} md={4} className="behind-by-container">
                <Item
                  sx={{
                    height: { xs: 130, sm: 130, md: 115 },
                  }}
                  style={{
                    boxShadow: "rgba(0, 0, 0, 0.2) -5px 6px 7px 0px",
                    //   background:
                    //     "linear-gradient(131deg, rgba(10, 27, 87, 1) 63%, rgb(15 46 109 / 99%) 83%)",
                    borderRadius: "3px",
                  }}
                >
                  <Behind difference={difference} />
                </Item>
              </Grid>

              {/* Machine Component */}
              <Grid item xs={12} sm={12} md={12} sx={{ marginTop: "-250px" }} className="machine-component">
                <Box
                  sx={{
                    display: "block",
                    height: { xs: "auto", sm: "auto", md: "235px" },
                    marginTop: "1%",
                    backgroundColor: "#f1f1f1",
                    width: "100%",
                    textAlign: "center",
                  }}
                >
                  {/* Title */}
                  <Typography className="machine-title-container"
                    sx={{
                      padding: "5px 4px 6px 16px",
                      fontSize: "16px",
                      color: "#385076",
                      fontWeight: "600",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      borderBottom: "2px solid #0000004a",
                    }}
                  >
                    Machine
                    <Box
                      sx={{
                        display: "flex",
                        color: "hsl(214.86deg 100% 14.51%)",
                      }}
                    >
                      <Tooltip title="Expand" placement="top">
                        <IconButton onClick={openModal}>
                          <CropFreeIcon
                            sx={{ fontSize: "12px", fontWeight: "900" }}
                          />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="More" placement="top">
                        <IconButton onClick={handleToggleDropdown}>
                          {isDropdownOpen ? (
                            <ArrowDropUpIcon
                              sx={{ fontSize: "15px", fontWeight: "900" }}
                            />
                          ) : (
                            <ArrowDropDownIcon
                              sx={{ fontSize: "15px", fontWeight: "900" }}
                            />
                          )}
                        </IconButton>
                      </Tooltip>
                      <DummyDropdown isOpen={isDropdownOpen}>
                        {chartOptions.map((option) => (
                          <DummyDropdownItem
                            key={option.id}
                            onClick={() => handleSelectComponent(option.id)}
                          >
                            {option.label}
                          </DummyDropdownItem>
                        ))}
                      </DummyDropdown>
                    </Box>
                  </Typography>
                  <Item
                    sx={{
                      height: { xs: "160px", sm: "160px", md: "205px" },
                    }}
                  >
                    {selectedComponent === "machine" && <Machine />}
                    {selectedComponent === "bar-chart" && <Machine />}
                    {selectedComponent === "area-chart" && <AreaChart />}
                    {selectedComponent === "line-chart" && <LChart />}
                  </Item>
                </Box>
              </Grid>
            </Grid>

            {/*Production Component*/}
            {/* Quality Component */}
            <Grid container spacing={2} item lg={4} className="quality-container">
              <Grid item xs={12} style={{ marginLeft: "7px" }}>
                <Item sx={{ height: { xs: "auto", sm: "auto", md: "602px" } }}>
                  <Quality
                    Prod={DashData.goodProduction}
                    AcProd={DashData.rejectedProduction}
                    RProd={rejectedPercentage}
                  />
                </Item>
              </Grid>
            </Grid>
          </div>

          {/*OEE and Downtime component */}
          <div className="downtime-component"
            style={{
              padding: "19px",
              marginLeft: "11px",
              width: "98%",
              display: "flex",
              marginTop: "-259px",
            }}
          >
            <Grid container spacing={0} item lg={12} className="bottom-container">
              {/*Downtime */}
              <Grid item xs={12} sm={6} md={3.5} style={{}}>
                <Typography
                  sx={{
                    padding: "0px 0px 0px 16px",
                    background: "#f1f1f1",
                    fontSize: "16px",
                    color: "#385076",
                    fontWeight: "600",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    borderBottom: "2px solid #0000004a",
                  }}
                >
                  Downtime
                  <Box
                    sx={{
                      display: "flex",
                      color: "hsl(214.86deg 100% 14.51%)",
                    }}
                  >
                    <IconButton>
                      <InfoOutlinedIcon
                        sx={{ fontSize: "17px", margin: "10px 11px 0px 0px" }}
                      />
                    </IconButton>
                  </Box>
                </Typography>
                <Item sx={{ height: { xs: 130, sm: 130, md: 175 } }}>
                  <DownTime data={DashData} />
                </Item>
              </Grid>

              {/*OEE*/}
              <Grid
                item
                xs={12}
                sm={6}
                md={4.8}
                style={{ margin: "0 0 0 9px" }}
              >
                <Typography
                  sx={{
                    padding: "0px 0px 0px 16px",
                    background: "#f1f1f1",
                    fontSize: "16px",
                    color: "#385076",
                    fontWeight: "600",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    borderBottom: "2px solid #0000004a",
                  }}
                >
                  OEE
                  <Box
                    sx={{
                      display: "flex",
                      color: "hsl(214.86deg 100% 14.51%)",
                    }}
                  >
                    <IconButton>
                      <InfoOutlinedIcon
                        sx={{ fontSize: "17px", margin: "10px 11px 0px 0px" }}
                      />
                    </IconButton>
                  </Box>
                </Typography>
                <Item
                  sx={{
                    height: { xs: 130, sm: 130, md: 175 },
                  }}
                  style={{}}
                >
                  <OEE
                    percentage={DashData.oEE}
                    gradient={[
                      "hsl(48.62deg 82.95% 61.37%)",
                      "hsl(48.62deg 82.95% 61.37%)",
                    ]}
                    strokeWidth="20"
                  />
                </Item>
              </Grid>
            </Grid>
          </div>
        </div>
      </div>
      {/* Machine Model */}
      <MachineModel
        show={modalOpen}
        handleClose={closeModal}
        selectedComponent={selectedComponent}
      />
    </div>
  );
}

export default MiniDashboard;

import React, { useState, useEffect } from "react";
import { Box, Grid } from "@mui/material";
import Linechart from "../containts/Charts/LineChart";
import Navbar from "../../Navbar/Navbar";
import styled from "styled-components";
import {
  ProVolume,
  TPReport,
  CycTime,
  DownTime,
  PreChart,
  MacInPro,
  EnergyMeter,
} from "../containts";
import lineData from "../api/lineData";
import { useSelector } from "react-redux";
import { getDeviceData } from "../api";

const Component = styled(Box)`
  justify-content: center;
  height: auto;
  margin-bottom: 2% !important;
`;

const BComponent = styled(Box)`
  justify-content: center;
  height: auto;
  margin-bottom: 2% !important;
`;

const Progress = styled(Box)`
  height: 81.5vh;
  margin-top: 2%;
`;

const Header = styled(Box)`
  background-color: hsl(0deg 0% 95.29%);
  position: fixed;
  width: ${(props) => (props.isOpen ? "88%" : "100%")};
  z-index: 1;
  padding: 0% 2% 0% 1%;
  height: 70px;
  align-items: center;
  display: flex;
`;

const GridContainer = styled.div`
  display: inline-block;
  height: 100vh;
  justify-content: center;
  width: ${(props) => (props.isOpen ? "98%" : "99%")};
  position: relative;
  @media (max-width: 768px) {
    width: 100%;
  }
`;

const Dashboard = ({ isOpen, toggle }) => {
  const userData = useSelector((state) => state.auth.userData);
  const [username, setUsername] = useState("");

  useEffect(() => {
    if (userData) {
      setUsername(userData.username);
    }
  }, [userData]);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const [obj, setObj] = useState("");
  const [dashboardData, setDashboardData] = useState("");
  const [EData, setEData] = useState("");
  const [finaldata, setfinalData] = useState({
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

  const props = [
    {
      id: 1,
      name: "1min",
      dataKey: "availability",
      title: "Availability",
      per: finaldata.availability,
    },
    {
      id: 2,
      name: "2min",
      dataKey: "performance",
      title: "Performance",
      per: finaldata.performance,
    },
    {
      id: 3,
      name: ["1min", "2min", "3min", "4min", "5min"],
      dataKey: "quality",
      title: "Quality",
      per: finaldata.quality,
    },
    { id: 4, name: "4min", dataKey: "oEE", title: "OEE", per: finaldata.oEE },
  ];

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

        const responseData = await response.json();
        // console.log(responseData.data[0])
        setfinalData(responseData.data[0]);

        const data = await lineData();
        if (data !== "" && data !== undefined) {
          setDashboardData(data);
        }

        const eData = await getDeviceData();
        if (eData !== "" && eData !== undefined) {
          setEData(eData);
        }
      } catch (error) {
        console.error(error);
      }
    };

    const interval = setInterval(() => {
      fetchData();
    }, 2000);

    return () => clearInterval(interval);
  }, []);
  // console.log(EData)
  return (
    <GridContainer isOpen={isOpen}>
      <div style={{ height: "auto" }}>
        <Header isOpen={isOpen}>
          <Navbar />
        </Header>
      </div>
      <Component>
        <PreChart
          show={show}
          handleClose={handleClose}
          obj={obj}
          data={dashboardData}
          finaldata={finaldata}
        />

        <Grid
          container
          columnSpacing={1}
          style={{
            width: "100%",
            marginBottom: "1%",
            marginLeft: "1%",
            marginTop: isOpen ? "5%" : "4%",
          }}
        >
          <Grid item xs={12} md={12} lg={8} sx={{ marginTop: "0.5%" }}>
            <div style={{ display: "block", width: "99%" }}>
              <Grid container spacing={1.5} sx={{ padding: "2% 0% 0% 1%" }}>
                {props.map((item) => (
                  <Grid key={item.id} item xs={12} sm={12} md={6} lg={6}>
                    <Linechart
                      data={dashboardData}
                      dataKey={item.dataKey}
                      name={item.name}
                      title={item.title}
                      per={item.per}
                      setObj={setObj}
                      setShow={setShow}
                    />
                  </Grid>
                ))}
              </Grid>
            </div>
            <Box sx={{ width: "99%", padding: "0% 0% 0% 1%" }}>
              <TPReport data={finaldata} />
              <CycTime />
            </Box>
          </Grid>
          <Grid item md={10} lg={4}>
            <Progress>
              <Grid
                item
                xs={12}
                sx={{ marginTop: "5.5%", padding: "0px 5px 0px 0px" }}
              >
                <ProVolume
                  isOpen={isOpen}
                  title="Production Volume"
                  subTitles={[
                    { name: "Good Production" },
                    { name: "Scrap Production" },
                    { name: "NCR" },
                  ]}
                  para={573}
                  pcs="17Pcs"
                  isvisi={true}
                  data={finaldata}
                />
              </Grid>
              <Grid
                item
                xs={12}
                sx={{ marginTop: "3%", padding: "0px 5px 0px 0px" }}
              >
                <MacInPro
                  isOpen={isOpen}
                  title="Machines In Production"
                  subTitles={[
                    { name: "Production" },
                    { name: "Setup" },
                    { name: "No Activity" },
                  ]}
                  para="47/64"
                  data={finaldata}
                />
              </Grid>
              <Grid
                item
                xs={12}
                sx={{ marginTop: "3%", padding: "0px 6px 0px 0px" }}
              >
                <DownTime data={finaldata} />
              </Grid>
            </Progress>
          </Grid>
        </Grid>
      </Component>
      <BComponent
        sx={{
          marginBottom: "2%",
          marginTop: "-1.2%",
          padding: "0px 0px 7px 30px",
          width: "100%",
        }}
      >
        <EnergyMeter Edata={EData} />
      </BComponent>
    </GridContainer>
  );
};

export default Dashboard;

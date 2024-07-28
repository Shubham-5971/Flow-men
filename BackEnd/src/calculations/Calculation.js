import deviceData from "../api/deviceData.js";

const getRandomNumber = (min, max) => {
    return Math.floor(Math.random() * (max - min) + min);
};

export const fetchData = async (url) => {
    try {
        const response = await fetch(url, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'APIKEY 68421f9c518fcd554ad4a6397039bacdb82b863dc4c5154b939d50ecbe3cb29b',
                'org-id': 'b7d31442-4487-4138-b69d-1fd97e7a5ae6'
            }
        });
        const responseData = await response.json();
        return responseData.data[0];
    } catch (error) {
        console.error(error);
        return null;
    }
};
let newUserInput = null
let newDeviceData = null
const productionVolume = 700;
const machinesInProduction = 41;

const Calculate = async () => {
    const URL = `https://api.golain.io/876dbb57-d0aa-447b-ac43-983b1b1aca19/wke/get-user-input-data/data/`;
    const userinput = await fetchData(URL);
    // console.log(userinput)
    const DeviceData = await deviceData();
    // console.log(DeviceData)
    // const PLCData = await fetchData('https://api.golain.io/876dbb57-d0aa-447b-ac43-983b1b1aca19/wke/getPLCData/get-plcData/')
    // console.log(userinput);
    // console.log(PLCData)

    if (!userinput || !DeviceData) {
        console.error("Failed to fetch data");
        return null;
    }


    const operationTime = 19//Math.abs(DeviceData.machineStopTime - DeviceData.machineStartTime) 
    const plannedOperation = userinput.plannedProductionTime
    const idealTimeInseconds =  userinput.ideal_cycle_time;
    // console.log(idealTimeInseconds)
    const actualTimeInseconds = 3432 //Math.abs(DeviceData.injectionStopTimestamp - DeviceData.injectionStartTimestamp)
    const totalPartsProduce =  DeviceData.Prodcount //userinput.actual_production + DeviceData.productionCount;
    const goodParts = userinput.good_production;
    const noOfCycle = 0//DeviceData.numberOfCycle;
    const machineOperatingTime = 0//DeviceData.machineStartTime + DeviceData.machineStopTime;

    // Downtime
    const operatorBreak = 0//getRandomNumber(15200, 18200);
    const operatorUnavailable = 0//getRandomNumber(11400, 13600);
    const materialUnavailable = 0//getRandomNumber(14300, 18600);
    const waitingOnInception = 0//getRandomNumber(10400, 12600);
    const machineIssues = 0//getRandomNumber(1400, 2000);

    // Availability
    const macAvail = () => {
        const cal = operationTime / plannedOperation;
        return Math.ceil(cal * 100);
    };

    // Performance
    const macPerf = () => {
        const cal = idealTimeInseconds / actualTimeInseconds;
        return Math.ceil(cal * 100);
    };

    // Quality
    const proQual = () => {
        const cal = totalPartsProduce==0?0: goodParts / totalPartsProduce;
        return Math.ceil(cal*100);
    };

    // OEE
    const macOEE = () => {
        const cal = (macAvail() * macPerf()) * proQual();
        return Math.ceil(cal / 10000);
    };

    // Cycle Time
    const cycleTime = () => {
        const cal = operationTime / noOfCycle;
        return Math.ceil(cal * 100);
    };

    // DownTime
    const downTime = () => {
        const cal = operatorBreak + operatorUnavailable + materialUnavailable + waitingOnInception + machineIssues;
        return cal;
    };

    const data = {
        "availability": macAvail(),
        "performance": macPerf(),
        "quality": proQual(),
        "oEE": macOEE(),
        "productionVolume": productionVolume,
        "machinesInProduction": machinesInProduction,
        "expectedProduction": userinput.expected_production,
        "actualProduction": totalPartsProduce,
        "goodProduction": userinput.good_production,
        "rejectedProduction": userinput.rejected_production,
        "operatorBreak": operatorBreak,
        "operatorUnavailable": operatorUnavailable,
        "materialUnavailable": materialUnavailable,
        "waitingOnInception": waitingOnInception,
        "machineIssues": machineIssues,
        "Downtime": DeviceData.MdownT//downTime(),
    };
    // console.log(userinput.actual_production )    
    return data;
};

export default Calculate;

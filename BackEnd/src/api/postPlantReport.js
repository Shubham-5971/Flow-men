import axios from "axios";
import { fetchData } from "../calculations/Calculation.js";
import fetchdata from "./fetchdata.js";


const postPlantReport = async (data) => {
    const url = 'https://api.golain.io/876dbb57-d0aa-447b-ac43-983b1b1aca19/wke/postPlantData/plant-data/data/';
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': 'APIKEY 68421f9c518fcd554ad4a6397039bacdb82b863dc4c5154b939d50ecbe3cb29b',
        'org-id': 'b7d31442-4487-4138-b69d-1fd97e7a5ae6'
    }
    const userinput = await fetchData("https://api.golain.io/876dbb57-d0aa-447b-ac43-983b1b1aca19/wke/get-user-input-data/data/");
    const deviceData = await fetchdata(
        "https://dev.api.golain.io/e8ab8d81-a0d6-46f6-87f1-e5ec6c9d763e/wke/meterData/meter/data/"
    );
    
    
    // console.log(deviceData)
    const postData = {
        "oee": `${data.oEE}`,
        "good": data.goodProduction,
        "reject": data.rejectedProduction,
        "weight": 20,//userinput.ideal_parts_weight,
        "energy1": Math.floor(deviceData.KW1),
        "energy2": Math.floor(deviceData.KW2),
        "quality": `${data.quality}`,
        "performance": `${data.performance}`,
        "availability": data.availability
    }
    let previousData = null;
    // console.log(postData)
    try {
        if (JSON.stringify(postData) !== JSON.stringify(previousData)) {
            const response = await axios.post(url, postData, { headers: headers });
            if (response) {
                console.log('Data posted successfully.: PlantData');
                // Update previousData with the new data
                previousData = postData;
            }
        }else{
            console.log('Data is identical to the previous one. Skipping post.: PlantData')
        }
        
        
    } catch (error) {
        console.log("error posting data:", error)
    }

}
export default postPlantReport;
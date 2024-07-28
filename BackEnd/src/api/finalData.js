import { asyncHandler } from "../utils/asyncHandler.js";
const URL = "https://api.golain.io/876dbb57-d0aa-447b-ac43-983b1b1aca19/wke/get_final_data/37009e35-91fc-4c46-b15a-5767af505334/data/";

export const finalData = async () => {
    try {
        const response = await fetch(URL, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'APIKEY 68421f9c518fcd554ad4a6397039bacdb82b863dc4c5154b939d50ecbe3cb29b',
                'org-id': 'b7d31442-4487-4138-b69d-1fd97e7a5ae6'
            }
        })
        const responseData = await response.json()
        // console.log(responseData.data[0])
        const data = responseData.data[0];
        const comData = {
            "availability": data.availability,
            "performance": data.performance,
            "quality": data.quality,
            "oEE": data.oEE,
            "productionVolume": data.productionVolume,
            "machinesInProduction": data.machinesInProduction,
            "expectedProduction": data.expectedProduction,
            "actualProduction": data.actualProduction,
            "goodProduction": data.goodProduction,
            "rejectedProduction": data.rejectedProduction,
            "operatorBreak": data.operatorBreak,
            "operatorUnavailable": data.operatorUnavailable,
            "materialUnavailable": data.materialUnavailable,
            "waitingOnInception": data.waitingOnInception,
            "machineIssues": data.machineIssues,
            "Downtime": data.Downtime
        }
        return comData;

    } catch (error) {
        console.log(error)
    }
}
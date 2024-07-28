import postDowntimeReport from "../api/postDowntimeReport.js";
import postProductionReport from "../api/postProductionReport.js";
import postQuality from "../api/postQuality.js";
import postPlantReport from "../api/postPlantReport.js";


const postReport = async () => {

        const responseData = await finalData();
        // console.log(responseData.data[0])
        postProductionReport(responseData);
        postPlantReport(responseData.data[0]);
        postDowntimeReport(responseData.data[0]);
        postQuality(responseData.data[0])
        
    
}

export default postReport;


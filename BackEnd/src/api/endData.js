import axios from 'axios';
import Calculate from '../calculations/Calculation.js';
import postReport from '../Reports/postReport.js';
import { finalData } from './finalData.js';




// Function to compare only the relevant keys
const isEqual = (obj1, obj2) => {
  const keys = [
    'availability', 'performance', 'quality', 'oEE', 'productionVolume',
    'machinesInProduction', 'expectedProduction', 'actualProduction', 'goodProduction',
    'rejectedProduction', 'operatorBreak', 'operatorUnavailable', 'materialUnavailable',
    'waitingOnInception', 'machineIssues', 'Downtime'
  ];
    
  return keys.every(key => obj1[key] === obj2[key]);
};

// Function to post data to the API
const postAPIData = async () => {
    const  previousData = await finalData();
    const data = await Calculate();


    if (data) {
        // Compare the new data with the previous data using isEqual function
        if (!isEqual(data, previousData)) {
            const url = 'https://api.golain.io/876dbb57-d0aa-447b-ac43-983b1b1aca19/wke/post-final-Data/37009e35-91fc-4c46-b15a-5767af505334/data/';
            const headers = {
                'Content-Type': 'application/json',
                'Authorization': 'APIKEY 68421f9c518fcd554ad4a6397039bacdb82b863dc4c5154b939d50ecbe3cb29b',
                'org-id': 'b7d31442-4487-4138-b69d-1fd97e7a5ae6'
            };

            try {
                const response = await axios.post(url, data, { headers });
                if (response) {
                    console.log('Data posted successfully.');
                    // Update previousData with the new data
                    // Optionally post report
                    // postReport();
                }
            } catch (error) {
                console.error('An error occurred:', error.message);
            }
        } else {
            console.log('Data is identical to the previous one. Skipping post.');
        }
    } else {
        console.error("Failed to calculate data");
    }
};

// Function to repeatedly post data
export const postAllData = () => {
    setInterval(postAPIData, 10000);
};

// Start posting data at intervals
postAllData();

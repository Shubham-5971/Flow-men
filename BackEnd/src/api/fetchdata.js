const fetchdata = async (URL) => {
    try {
        const response = await fetch(URL,  {
            headers: {
                'Authorization': 'APIKEY 76cbcf0bd4f387828b4b3555eb78330ea5c64d65cdb43a588e4c555917ffd9b5',
                'org-id': 'c1f462c4-d2fe-4517-a7c8-a0d32694a158'
            }
        });
        const responseData = await response.json();
        // console.log(responseData.data[0])
        return responseData.data[0];
    } catch (error) {
        console.log("Error Fetching Data");
    }
}
export default fetchdata;

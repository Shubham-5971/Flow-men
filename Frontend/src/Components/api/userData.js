import axios from 'axios';

const userData = (data) => {
    const userdata =  JSON.stringify(data)
    const url = `https://api.golain.io/876dbb57-d0aa-447b-ac43-983b1b1aca19/wke/post_userData/${data.device_id}/data`;

    const headers = {
        'Authorization': `APIKEY 68421f9c518fcd554ad4a6397039bacdb82b863dc4c5154b939d50ecbe3cb29b`,
        'Org-Id': 'b7d31442-4487-4138-b69d-1fd97e7a5ae6',
        'Content-Type': 'application/json'
    };
    axios.post(url, userdata, {headers} )
        .then(response => {
            console.log('API response:', response.data);
        })
        .catch(error => {
            console.error('Error while sending data to API:', error);
        });
};

export  default userData;
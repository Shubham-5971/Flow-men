import axios from 'axios'



export const getMembers = async()=>{
    const URL = "http://localhost:3000/member/data"
    try {
        const response =  await axios.get(URL);
        return response.data;
    } catch (error) {
        console.log(error)
    }
}
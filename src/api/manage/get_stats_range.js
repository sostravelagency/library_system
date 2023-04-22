import axios from "axios"
import { API_URL } from "../../config"

// This function retrieves statistics data within a specified time range
// The function takes two arguments: a start time and an end time
const get_stats_range= async (time_start, time_end)=> {
    // An axios request is made to the server with the specified URL, method and parameters
    const res= await axios({
        url: API_URL+ "/api/v2/stats",
        method: "get",
        params: {
            time_range: true, // specifies that the query should use time range
            time_start, // start time of the range
            time_end // end time of the range
        }

    })
    const result= await res.data
    return result
}

export default get_stats_range
import axios from "axios"
import Cookies from "js-cookie"
import { API_URL } from "../../config"

// Function to get list of blogs from the server
const get_list_blog= async ()=> {
    // Send GET request to API endpoint
    const res= await axios({
        url: API_URL+ "/api/v3/blogs/get",
        method: "get",
        headers: {
            // Set authorization header with the access token
            "authorization": "Bearer "+ Cookies.get("accessToken")
        }

    })
    const result= await res.data
    return result
}

export default get_list_blog
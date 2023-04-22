import axios from "axios"
import Cookies from "js-cookie"
import { API_URL } from "../../config"

// This function sends a POST request to the "/api/v3/staff/add" endpoint
// with the necessary data to add a new staff member to the database.
// The function uses an access token stored in a cookie to authenticate the request.

const add_staff= async (userName, phoneNumber, address, email, password)=> {
    const res= await axios({
        url: API_URL+ "/api/v3/staff/add",
        method: "post",
        headers: {
            "authorization": "Bearer "+ Cookies.get("accessToken") // Attach access token to the request headers
        },
        data: { // Attach user data to the request body
            userName, phoneNumber, address, email, password
        }
    })
    const result= await res.data // Extract data from the response object
    return result
}

export default add_staff
import axios from "axios"
import Cookies from "js-cookie"
import { API_URL } from "../../config"

// This function sends a request to the server to delete a user by ID
const delete_user= async (id)=> {
    const res= await axios({
        url: API_URL+ "/api/v3/user/delete",
        method: "post",
        headers: {
            "authorization": "Bearer "+ Cookies.get("accessToken") // Attach access token to the request headers
        },
        data: {
            // Send user ID to be deleted in the request body
            user_id: id
        }
    })
    const result= await res.data
    return result
}

export default delete_user
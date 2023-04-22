import axios from "axios"
import { API_URL } from "../../config"
import Cookies from "js-cookie"

// This function sends a POST request to delete a category from the server
const delete_category= async (id)=> {
    const res= await axios({
        url: API_URL+ "/api/v3/category/delete",
        method: "post",
        data: {
           id
        },
        headers: {
            "authorization": "Bearer "+ Cookies.get("accessToken")
        }
    })
    const result= await res.data
    return result
}

export default delete_category
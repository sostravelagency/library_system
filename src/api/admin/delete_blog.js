import axios from "axios"
import Cookies from "js-cookie"
import { API_URL } from "../../config"

// This function deletes a blog post from the API using its ID
const delete_blog= async (id)=> {
    const res= await axios({
        url: API_URL+ "/api/v3/blog/delete",
        method: "post",
        headers: {
            // Set the authorization header with the access token retrieved from cookies
            "authorization": "Bearer "+ Cookies.get("accessToken")
        },
        data: {
            // Pass the ID of the blog post to be deleted in the request body
            id: id
        }
    })
    const result= await res.data
    return result
}

export default delete_blog
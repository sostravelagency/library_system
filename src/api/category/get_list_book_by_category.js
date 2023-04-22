import axios from "axios"
import Cookies from "js-cookie"
import { API_URL } from "../../config"

// Define an asynchronous function called 'get_list_book_by_category', which takes in a 'category_id' parameter
const get_list_book_by_category= async (category_id)=> {
     // Send an HTTP GET request to the API_URL + '/api/v1/category/list/book' endpoint, passing in the 'category_id' parameter as a query parameter
    const res= await axios({
        url: API_URL+ "/api/v1/category/list/book",
        method: "get",
        params: {
            category_id
        },
        headers: {
            "authorization": "Bearer "+ Cookies.get("accessToken") // Set the 'authorization' header of the request to the value of the 'accessToken' cookie
        }
    })
    const result= await res.data
    return result
}

export default get_list_book_by_category
import axios from "axios"
import Cookies from "js-cookie"
import { API_URL } from "../config"

// This function adds a book to the user's shopping cart
// It takes the amount of books to be added and the book id as parameters
const add_cart= async (amount, book_id)=> {
    const res= await axios({
        url: API_URL+ "/api/cart/add",
        method: "post",
        data: {
            user_id: Cookies.get("uid"), // Get the user's ID from a cookie
            amount, // The amount of books to be added
            book_id // The ID of the book to be added
        }
    })
    const result= await res.data
    return result
}

export default add_cart
import axios from "axios"
import { API_URL } from "../../config"

 // この関数は司書が注文の状態についてのアクションを起こすためのものです
const action_book= async (id, status, is_borrow, day_borrow)=> {
    const res= await axios({
        url: API_URL+ "/staff/request/action",
        method: "post",
        data: {
            id,
            status,
            is_borrow,
            day_borrow
        }
    })
    const result= await res.data
    return result
}

export default action_book

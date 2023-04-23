import axios from "axios"
import Cookies from "js-cookie"
import { API_URL } from "../config"

// この関数は、ユーザーのショッピングカートに本を追加します
// 追加する本の量と本のIDをパラメーターとして受け取ります
const add_cart= async (amount, book_id)=> {
    const res= await axios({
        url: API_URL+ "/api/cart/add",
        method: "post",
        data: {
            user_id: Cookies.get("uid"), // クッキーからユーザーIDを取得する
            amount, // 追加する本の量
            book_id // 追加する本のID
        }
    })
    const result= await res.data
    return result
}

export default add_cart

import axios from "axios"
import { API_URL } from "../config"
import Cookies from "js-cookie"

// この関数は、借りた本を返すためのAPIエンドポイントにPOSTリクエストを行うために使用されます。
// 入力パラメータとして、本の履歴IDを取ります。
const give_book_back= async (history_id)=> {
    const res= await axios({
        url: API_URL+ "/api/v1/book/action/finish",
        method: "post",
        data: {
            history_id, user_id: Cookies.get("uid")
        },
        headers: {
            "authorization": "Bearer "+ Cookies.get("accessToken")
        }
    })
    const result= await res.data
    return result
}

export default give_book_back

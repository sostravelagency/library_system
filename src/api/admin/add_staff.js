import axios from "axios"
import Cookies from "js-cookie"
import { API_URL } from "../../config"

// この関数は、新しいスタッフメンバーをデータベースに追加するために必要なデータを使用して、
// "/api/v3/staff/add"エンドポイントにPOSTリクエストを送信します。
// 関数は、リクエストを認証するためにクッキーに保存されたアクセストークンを使用します。

const add_staff= async (userName, phoneNumber, address, email, password)=> {
    const res= await axios({
        url: API_URL+ "/api/v3/staff/add",
        method: "post",
        headers: {
            "authorization": "Bearer "+ Cookies.get("accessToken") // アクセストークンをリクエストヘッダーに添付する
        },
        data: { // ユーザーデータをリクエストボディに添付する
            userName, phoneNumber, address, email, password
        }
    })
    const result= await res.data // レスポンスオブジェクトからデータを抽出する
    return result
}

export default add_staff

const expressAsyncHandler = require("express-async-handler");
const connection = require("../database/connect");

const index= expressAsyncHandler(async(req, res)=> {
    try {
        // リクエストボディに渡されたユーザーIDに基づいてユーザー情報を取得するためにMySQLクエリを実行する
        const [rows]= await connection.execute("SELECT user_name, user_email, user_phone, user_address, role FROM user WHERE user_id= ?", [req.body.uid])
        if(rows.length >0 ) {
            // ユーザー情報が見つかった場合、200ステータスコードと 'auth'キーがtrueに設定されたJSONレスポンスとして返す
            return res.status(200).json({auth: true, ...rows[0]})
        }
        else {
            // ユーザー情報が見つからない場合、200ステータスコードと 'auth'キーがfalseに設定されたJSONレスポンスを返す
            return res.status(200).json({auth: false})
        }
    } catch (error) {
        // エラーが発生した場合、500ステータスコードと 'auth'キーがfalseに設定されたJSONレスポンスを返す
        return res.status(200).json({auth: false})
    }
    
})

module.exports= index

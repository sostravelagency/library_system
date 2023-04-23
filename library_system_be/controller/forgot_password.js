const connection = require("../database/connect")
const expressAsyncHandler= require('express-async-handler')
const verifyMail = require("../utils/mail")

// 2つの数字（両方含む）の間でランダムな整数を生成する関数
function randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}
const forgot_password= expressAsyncHandler(async (req, res)=> {
    try {
        const {email}= req.body
        // データベースをクエリして、メールアドレスが存在するかどうかを確認する
        const [rows]= await connection.execute("SELECT user_id FROM user WHERE user_email= ?", [email])
        if(rows.length <= 0) {
            // メールアドレスが存在しない場合、「forgot_password」をfalse、「exist」をtrueに設定したレスポンスを返す
            return res.status(200).json({forgot_password: false, exist: true})
        }
        
        else {
            // メールアドレスが存在する場合、検証コードを生成して「verify_email」テーブルに挿入する
            const verifyCode= randomIntFromInterval(100000, 999999)
            // 「ON DUPLICATE KEY UPDATE」構文は、テーブルにすでにメールアドレスが存在する場合、「code」列を更新します
            // verifyCode変数は、クエリ内で2回使用され、両方の「code」と「updated_at」列を同じ値に設定します
            // 結果は、挿入された行に関する情報を含む最初の要素と、更新された行に関する情報を含む2番目の要素を持つ配列です（該当する場合）
            const [rows]= await connection.execute("INSERT INTO verify_email VALUES (?, ?) ON DUPLICATE KEY UPDATE code= ?", [email, verifyCode, verifyCode])
            
            // 検証メールを送信し、結果オブジェクトと「verify」を「pending」に設定したレスポンスを返す
            const result= await verifyMail(email, verifyCode)
            return res.status(200).json({...result, verify: "pending"})
        }
    } catch (error) {
        console.log(error)
        return res.status(500).json(error)
    }
    
})

module.exports= forgot_password

const expressAsyncHandler = require("express-async-handler")
const connection = require("../database/connect")

const recover_password = expressAsyncHandler(async (req, res)=> {
    try {
        const {email, code}= req.body // Destructuring email and code from request body

        // verify_emailテーブルでSELECTクエリを実行して、メールアドレスとコードが一致するかどうかを確認する
        const [rows]= await connection.execute("SELECT * FROM verify_email WHERE email= ? AND code= ?", [email, code])
        if(rows.length > 0) { // もし行が見つかったら、メールアドレスとコードが一致する
            // verify_emailテーブルからメールアドレスとコードを削除するDELETEクエリを実行する
            const [rows]= await connection.execute("DELETE FROM verify_email WHERE email= ? AND code= ?", [email, code])
            return res.status(200).json({recover: true})
        }
        else {
            return res.status(200).json({recover: false, verify: false})
        }
    } catch (error) {
        console.log(error)
        return res.status(500).json(error)
    }
})

module.exports= recover_password 

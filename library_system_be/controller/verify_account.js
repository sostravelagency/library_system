const connection = require("../database/connect")
const expressAsyncHandler= require('express-async-handler')
const verifyMail = require("../utils/mail")

// この関数は、2つの指定された値の間でランダムな整数を生成します
function randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

// これは、ユーザーのメールアカウントを確認するためのAPIエンドポイントです
const verify_account= expressAsyncHandler(async (req, res)=> {
    try {
        const {email}= req.body
        // データベースから、指定されたメールアドレスに関連付けられたユーザーIDをクエリします
        const [rows]= await connection.execute("SELECT user_id FROM user WHERE user_email= ?", [email])
        // 指定されたメールアドレスを持つユーザーがいない場合、エラー応答を返します
        if(rows.length <= 0) {
            return res.status(200).json({verify_account: false, exist: true})
        }
        // それ以外の場合、検証コードを生成し、データベースのverify_emailテーブルに挿入します
        else {
            const verifyCode= randomIntFromInterval(100000, 999999)            
            const [rows]= await connection.execute("INSERT INTO verify_email VALUES (?, ?) ON DUPLICATE KEY UPDATE code= ?", [email, verifyCode, verifyCode])
            // ユーザーに検証コードを含むメールを送信します
            const result= await verifyMail(email, verifyCode)
            return res.status(200).json({...result, verify: "pending"})
        }
    } catch (error) {
        console.log(error)
        return res.status(500).json(error)
    }
    
})

module.exports= verify_account

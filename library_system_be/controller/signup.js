const connection = require("../database/connect")
const asyncHandler = require('express-async-handler')
const {v4}= require("uuid")
const md5 = require("md5")
const nodemailer = require('nodemailer');
const verifyMail = require("../utils/mail");

// ランダムな整数を生成する関数を定義する
function randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

// signUp と verifyEmail の 2 つのメソッドを持つオブジェクトを作成する
const signup = {
    // signUp メソッドは、リクエストオブジェクトとレスポンスオブジェクトを入力として受け取る非同期関数である
    signUp: asyncHandler(async (req, res)=> {
        try {
            // データベースに新しいユーザーデータを挿入するための MySQL クエリを実行する
           const [rows]= await connection.execute("INSERT INTO user(user_id, user_name, user_email, user_phone, user_password, user_address, role, time_created) VALUES(?, ?, ?, ?, ?, ?, ?, ?)", [v4(), req.body.userName, req.body.email, req.body.phone, md5(req.body.password), req.body.address, 1, new Date()])
           // クエリが成功した場合、クライアントに成功したレスポンスを返す
           return res.status(200).json({signup: true, redirect: "/login"})
        } catch (error) {
            console.log(error)
            return res.status(400).json({signup: false, exist: false, verify_email: false, mess: "Đã xảy ra lỗi không xác định, vui lòng thử lại hoặc liên hệ admin"})
        }
    }),
    // verifyEmail メソッドは、リクエストオブジェクトとレスポンスオブジェクトを入力として受け取る非同期関数である
    verifyEmail: asyncHandler(async (req, res)=> {
        try {
            // ユーザーテーブルにメールアドレスが既に存在するかどうかを確認するための MySQL クエリを実行する
            const [rows]= await connection.execute("SELECT * FROM user WHERE user_email= ?", [req.body.email])
            if(rows.length > 0) {
                // メールアドレスが存在する場合、メールアドレスが存在することを示すレスポンスを返す
                return res.status(200).json({exist: true})
            }
            else {
                // メールアドレスが存在しない場合、検証コードを生成してメールアドレスに送信する
                const verifyCode= randomIntFromInterval(100000, 999999)
                const [rows1]= await connection.execute("DELETE FROM verify_email WHERE email= ?", [req.body.email])
                const result= await verifyMail(req.body.email, verifyCode)
                const [rows2]= await connection.execute("INSERT INTO verify_email VALUES (?, ?)",[req.body.email, verifyCode])
                return res.status(200).json({exist: false})
            }
        } catch (error) {
            console.log(error)
            return res.status(400).json({verify_email: false})
        }
    }),
} 

module.exports= signup

const connection = require("../database/connect")
const expressAsyncHandler= require('express-async-handler')
const verifyMail = require("../utils/mail")

// A function that generates a random integer between two numbers (inclusive)
function randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}
const forgot_password= expressAsyncHandler(async (req, res)=> {
    try {
        const {email}= req.body
        // Query the database to check if the email exists
        const [rows]= await connection.execute("SELECT user_id FROM user WHERE user_email= ?", [email])
        if(rows.length <= 0) {
            // If the email doesn't exist, return a response with "forgot_password" set to false and "exist" set to true
            return res.status(200).json({forgot_password: false, exist: true})
        }
        
        else {
            // If the email exists, generate a verification code and insert it into the "verify_email" table
            const verifyCode= randomIntFromInterval(100000, 999999)
            // The "ON DUPLICATE KEY UPDATE" syntax updates the "code" column if the email already exists in the table
            // The verifyCode variable is used twice in the query to set both the "code" and the "updated_at" columns to the same value
            // The result is an array with two elements: the first element contains information about the inserted row, and the second element contains information about the updated row (if applicable)
            const [rows]= await connection.execute("INSERT INTO verify_email VALUES (?, ?) ON DUPLICATE KEY UPDATE code= ?", [email, verifyCode, verifyCode])
            
            // Send a verification email and return a response with the result object and "verify" set to "pending"
            const result= await verifyMail(email, verifyCode)
            return res.status(200).json({...result, verify: "pending"})
        }
    } catch (error) {
        console.log(error)
        return res.status(500).json(error)
    }
    
})

module.exports= forgot_password
const expressAsyncHandler = require("express-async-handler")
const connection = require("../database/connect")

const recover_password = expressAsyncHandler(async (req, res)=> {
    try {
        const {email, code}= req.body // Destructuring email and code from request body

        // Executing a SELECT query on verify_email table to check if email and code match
        const [rows]= await connection.execute("SELECT * FROM verify_email WHERE email= ? AND code= ?", [email, code])
        if(rows.length > 0) { // If a row is found, email and code match
            // Executing a DELETE query to remove the email and code from verify_email table
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
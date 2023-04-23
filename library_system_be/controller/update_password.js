const asyncHandler = require('express-async-handler')
const connection = require('../database/connect')
const md5 = require('md5')

const update_password= asyncHandler(async (req, res)=> {
    try {
        const id_user = req.user
        const [rows]= await connection.execute("SELECT * FROM user WHERE user_id= ? AND user_password= ?", [id_user, md5(req.body.oldPassword)])
        if(rows.length >0 ) {
            const [rows]= await connection.execute("UPDATE user SET user_password= ?", [md5(req.body.newPassword)])
            return res.json({change: true})
        }
        else {
            return res.status(200).json({change: false, exist: false})

        }
        
    } catch (error) {
        console.log(error)
        return res.status(500).json({error})
    }
})

module.exports= update_password
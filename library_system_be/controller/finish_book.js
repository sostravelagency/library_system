const expressAsyncHandler = require("express-async-handler");
const connection = require("../database/connect");

const finish_book= expressAsyncHandler(async (req, res)=> {
    try {
        // Use a MySQL query to update the `history` table where the `history_id` matches
        // the `history_id` passed in the request body and the `user_id` matches the
        // authenticated user ID stored in the `req.user` property
        const [rows]= await connection.execute("UPDATE history SET state= 5 WHERE history_id= ? AND user_id= ?", [req.body.history_id, req.user])
        return res.status(200).json({finish: true})
        
    } catch (error) {
        return res.status(500).json(error)
    }
})

module.exports= finish_book
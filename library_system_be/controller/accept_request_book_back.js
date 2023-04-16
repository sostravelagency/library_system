const expressAsyncHandler = require("express-async-handler");
const connection = require("../database/connect");

const accept_request_book_back= expressAsyncHandler(async (req, res)=> {
    try {
        const [rows]= await connection.execute("UPDATE history SET state= 3 WHERE history_id= ? AND user_id= ?", [req.body.history_id, req.body.user_id])
        const [rows2]= await connection.execute("SELECT book_id FROM history WHERE history_id= ?", [req.body.history_id])
        const [rows1]= await connection.execute("UPDATE book_in_book SET checkouting= 0 WHERE book_in_book_id= ?", [rows2[0]?.book_id])
        return res.status(200).json({finish: true})
        
    } catch (error) {
        return res.status(500).json(error)
    }
})

module.exports= accept_request_book_back
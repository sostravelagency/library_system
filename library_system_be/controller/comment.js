const expressAsyncHandler = require("express-async-handler")
const connection = require("../database/connect")

const comment= {
    get: expressAsyncHandler(async (req, res)=> {
        const [rows]= await connection.execute("SELECT * FROM comment INNER JOIN user ON user.user_id = comment.user_id WHERE comment.book_id= ?", [req.query.book_id || ""])
        return res.status(200).json(rows)
    }),
    add: expressAsyncHandler(async (req, res)=> {
        const [rows]= await connection.execute("INSERT INTO comment VALUES (?, ?, ?, ?, ?)", [req.body.comment_id, req.body.user_id, req.body.book_id, req.body.content, req.body.time_created])
        return res.status(200).json({add: true})
    })
}

module.exports= comment
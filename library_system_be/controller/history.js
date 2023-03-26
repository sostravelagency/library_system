const expressAsyncHandler = require("express-async-handler")
const connection = require("../database/connect")

const get_history= expressAsyncHandler(async (req, res)=> {
    try {
        const [rows]= await connection.execute("SELECT * FROM history INNER JOIN book ON book.book_id = history.book_id INNER JOIN author ON author.author_id = book.author_id WHERE history.user_id= ?", [req.query.user_id])
        return res.status(200).json(rows)
        
    } catch (error) {
        console.log(error)
        return res.status(500).send(error)
    }
})

module.exports= get_history
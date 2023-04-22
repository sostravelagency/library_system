const expressAsyncHandler = require("express-async-handler")
const { v4 } = require("uuid")
const connection = require("../../database/connect")

const conversation= {
    get: expressAsyncHandler(async (req, res)=> {
        try {

            // Select all conversations with the given user id
            const [rows1]= await connection.execute("SELECT * FROM conversation WHERE conversation.user_id =? ", [req.query.user_id])

            // If conversation exists
            if(rows1.length > 0) {

                // Select all messages for the conversation with the user id
                const [rows] =await connection.execute("SELECT * FROM message INNER JOIN user ON user.user_id = message.sender_id WHERE message.conversation_id= ?", [rows1[0].conversation_id])
                // Return the conversation and its messages
                return res.status(200).json({conversation: rows1[0].conversation_id, message: rows})
            }
            else {

                // Create a new conversation id
                const conversation_id= v4()
                // Insert a new conversation with the new id and the user id
                const [row1]= await connection.execute("INSERT INTO conversation VALUES (?, ?)", [conversation_id, req.query.user_id])
                // Return the new conversation and its messages
                const [rows]= await connection.execute("SELECT * FROM message INNER JOIN user ON user.user_id = message.sender_id WHERE message.conversation_id= ?", [conversation_id])
                return res.status(200).json({conversation: conversation_id, message: rows})
            }
            
        } catch (error) {
            console.log(error)
            return res.status(500).json(error)
        }
    }),

    // Define a function to get all conversations with user information
    getAll: expressAsyncHandler(async (req, res)=> {
        try {
            // Select all conversations with user information
            const [rows]= await connection.execute("SELECT * FROM conversation INNER JOIN user ON conversation.user_id = user.user_id")
            // Return all conversations with user information
            return res.status(200).json(rows)
            
        } catch (error) {
            console.log(error)
            return res.status(500).json(error)
        }
    })
}

module.exports= conversation
const expressAsyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');

// Function to generate JWT token for a user
const jwtInit= (user)=> {
    const accessToken= jwt.sign(user, process.env.JWT_SECRET_KEY)
    return accessToken
}
// Middleware to verify JWT token
const verifyToken= expressAsyncHandler(async (req, res, next)=> {
    const token= req.token // Token sent in the request header
    jwt.verify(token, process.env.JWT_SECRET_KEY, function(err, decoded) {
        req.user= decoded.user_id // Attach decoded user ID to request object
        if(err) {
            return res.status(401).json({message: "Not authorized"}) // Unauthorized access
        }
        next()
    })
})

module.exports= {
    jwtInit,
    verifyToken
}
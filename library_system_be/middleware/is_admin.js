const jwt = require('jsonwebtoken');

// Middleware function to check if user is an admin
const is_admin= async (req, res, next)=> {
    const token= req.token
    // Verify the token with the JWT_SECRET_KEY
    jwt.verify(token, process.env.JWT_SECRET_KEY, function(err, decoded) {
        if(err) {
            // Return 401 if the token is invalid
            return res.status(401).json({message: "Not authorized"})
        }
        // Check if the user is an admin or has role diffrent from 3
        if(decoded?.isAdmin!== true && parseInt(decoded?.role) !== 3) {
            // Return 403 if the user does not have permission
            return res.status(403).json({message: "Not permission"})
        } 
        // If the user is an admin or has role level 3, continue to the next middleware function
        next()
    })
}

module.exports= is_admin
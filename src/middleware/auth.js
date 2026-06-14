const jwt = require('jsonwebtoken')
const userRepository = require('../repositories/user.repository')

async function authMiddleware(req,reply) {
    try {

        // Get token from header
        const authHeader = req.headers.authorization;
        if(!authHeader || !authHeader.startsWith('Bearer ')) {
            return reply.code(401).send({
                success: false,
                message: "No token provided"
            });
        }

        const token = authHeader.split(' ')[1];

        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Get user from database
        const user = await userRepository.findById(decoded.userId)
        if(!user) {
            return reply.code(401).send({
                success: false,
                message: 'User not found'
            });
        }

        // Attach user to request
        req.user = user;

    }catch(err) {
        return reply.code(401).send({
            success: false,
            message: 'Invalid or expired token'
        })
    }
}

module.exports = authMiddleware;
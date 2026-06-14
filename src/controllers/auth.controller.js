const authService = require('../services/auth.service')

class AuthController {
    async register(req, reply) {
        try {
            const { name, email, password } = req.body;
                
            const result = await authService.register({ name, email, password });
            
            return reply.code(201).send({
                success: true,
                message: 'User registered successfully',
                data: result
            });
        } catch(err){
            console.log(err)
            return reply.code(500).send({
                success: false,
                message: err.message
            })
        }
    }

    async login(req, reply) {
        try {
        const { email, password } = req.body;
        
        const result = await authService.login(email, password);
        
        return reply.code(200).send({
            success: true,
            message: 'Login successful',
            data: result
        });
        } catch (error) {
        return reply.code(500).send({
            success: false,
            message: error.message
        });
        }
    }
}

module.exports = new AuthController();

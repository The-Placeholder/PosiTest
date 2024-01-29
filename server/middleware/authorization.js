import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const authorization = async (req, res, next) => {
    try {
        const jwtToken = req.header("token");

        if (!jwtToken) {
            return res.status(403).send('Not authorized');
        }

        const payload = jwt.verify(jwtToken, process.env.jwtSecret);

        req.user = payload.user;
        next();
    } catch (error) {
        console.error(error.message);
        return res.status(403).send('Not authorized');
    }
};

export default authorization;

import jwt from 'jsonwebtoken';
import { connectMongoDB } from '@/libs/mongodbConnect';

// Middleware to protect routes that require authentication
export async function protect(req, res) {
    try {
        await connectMongoDB();
        // Check if an authorization header is present
        if (!req.headers.authorization) {
            return res.status(401).json({
                success: false,
                msg: 'Эхлээд нэврэнэ  үүү.',
            });
        }

        const token = req.headers.authorization.split(' ')[1];
        console.log("Received token:", token);
        // Check if the token exists
        if (!token) {
            return res.status(400).json({
                success: false,
                msg: 'Token  хоосон байна ....',
            });
        }

        // Verify the token and extract user information
        const tokenObj = jwt.verify(token, process.env.JWT_SECRET);
        console.log(tokenObj);
        req.userId = tokenObj.Id; // Change "Id" to "id" for consistency
        req.userRole = tokenObj.role;
        req.name = tokenObj.name
    } catch (error) {
        console.log(error);
    }
};

// Middleware to authorize specific roles
export  function authorize(...roles) {
    try {
        return (req, res, next) => {
            if (!roles.includes(req.userRole)) {
                return res.status(403).json({
                    success: false,
                    msg: `Таны эрх хүрэхгүй байна [${req.userRole}].`,
                });
            }
            next();
        };
    } catch (error) {
        console.log(error);
    }

}

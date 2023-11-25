import { connectMongoDB } from "../../libs/connectMongoDb";
import { handleGetRequest, handleGetRequestDetail, handlePostRequest } from "../../libs/controller/aboutController";
import util from 'util';
import upload from "../../libs/middleware/fileUpload";
export const config = {
    api: {
        bodyParser: false, // Disable built-in body parsing to use the upload middleware
    },
};

connectMongoDB();
const cpUpload = upload.fields([
    { name: 'file1' },
    { name: 'file2' },
    { name: 'file3' },
])
const uploadPromise = util.promisify(cpUpload);

export default async function handler(req, res) {
    try {
        switch (req.method) {
            case 'GET':
                await handleGetRequest(req, res);
                break;
            case 'POST':
                // Handle file upload separately with middleware
                await uploadPromise(req, res);
                // Now call the actual post request handler
                await handlePostRequest(req, res);
                break;
            case 'DELETE':
                // Add logic for DELETE request
                break;
            case 'PUT':
                // Add logic for PUT request
                break;
            default:
                res.status(405).json({ success: false, error: 'Method Not Allowed' });
                break;
        }
    } catch (error) {
        console.error('Error in handler:', error.message);
        res.status(500).json({
            success: false,
            error: 'Internal Server Error',
        });
    }
}

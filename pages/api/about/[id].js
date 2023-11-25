import { connectMongoDB } from "../../libs/connectMongoDb";
import { handleGetRequest, handleGetDetailRequest, handleGetRequestDetail, handlePostRequest, handlePutRequest, handleDeleteRequest } from "../../libs/controller/aboutController";
import util from 'util';
import upload from "../../libs/middleware/fileUpload";
export const config = {
    api: {
        bodyParser: false, // Disable built-in body parsing to use the upload middleware
    },
};
const cpUpload = upload.fields([
    { name: 'file' },
    { name: 'file1' },
    { name: 'file2' },
])
connectMongoDB();
const uploadPromise = util.promisify(cpUpload);
export default async function handler(req, res) {
    try {
        switch (req.method) {
            case 'GET':
                await handleGetDetailRequest(req, res);
                break;
            case 'DELETE':
                handleDeleteRequest(req, res);
                // Add logic for DELETE request
                break;
            case 'PUT':
                await uploadPromise(req, res)
                await handlePutRequest(req, res);
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

import { connectMongoDB } from "../../libs/connectMongoDb";
import { handleGetRequest, handleGetRequestDetail, handlePostRequest } from "../../libs/controller/countryController";
connectMongoDB();

export default async function handler(req, res) {
    try {
        switch (req.method) {
            case 'GET':
                await handleGetRequest(req, res);
                break;
            case 'POST':
                await handlePostRequest(req, res);
                break;
            case 'DELETE':
                break;
            case 'PUT':
                break;
            default:
                break;
        }
    } catch (error) {

    }
}
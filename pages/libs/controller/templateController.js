import Template from "../models/templateModel";

export async function handleGetRequest(req, res) {
    try {
        const data = await Template.find();
        res.status(200).json({ success: true, data });
    } catch (error) {
        console.error('Error in GET handler:', error.message);
        res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
}

export async function handleGetRequestDetail(req, res) {
    try {
        const data = await Template.findById(req.params.id);
        res.status(200).json({ success: true, data });
    } catch (error) {
        console.error('Error in GET handler:', error.message);
        res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
}

export async function handlePostRequest(req, res) {
    try {
        const input = {
            ...req.body
        };
        const data = await Template.create(input);

        res.status(200).json({
            success: true,
            msg: 'Post created successfully',
            data,
        });
    } catch (error) {
        console.error('Error in POST handler:', error.message);
        res.status(500).json({
            success: false,
            error: 'Internal Server Error',
        });
    }
}

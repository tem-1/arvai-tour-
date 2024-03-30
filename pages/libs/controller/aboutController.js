import About from "../models/aboutModel";

export async function handleGetRequest(req, res) {
    try {
        const data = await About.find();
        res.status(200).json({ success: true, data });
    } catch (error) {
        console.error('Error in GET handler:', error.message);
        res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
}

export async function handleGetDetailRequest(req, res) {
    try {
        const { id } = req.query
        const data = await About.findById(id);
        res.status(200).json({ success: true, data });
    } catch (error) {
        console.error('Error in GET handler:', error.message);
        res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
}
export async function handleGetRequestDetail(req, res) {
    try {
        const data = await About.findById(req.params.id);
        res.status(200).json({ success: true, data });
    } catch (error) {
        console.error('Error in GET handler:', error.message);
        res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
}

export async function handlePostRequest(req, res) {
    try {
        const fileName = req.files["file"]
            ? req.files["file"][0].filename
            : "defualt file not photo";
        const fileName1 = req.files["file1"]
            ? req.files["file1"][0].filename
            : "defualt file not photo1?";
        const fileName2 = req.files["file2"]
            ? req.files["file2"][0].filename
            : "defualt file not photo2?";
        const input = {
            ...req.body,
            photo: fileName,
            photo1: fileName1,
            photo2: fileName2,
        };
        const data = await About.create(input);
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


export async function handleDeleteRequest(req, res) {
    try {
        const { id } = req.query;
        const data = await About.findByIdAndDelete(id, {
            new: true,
        });
        return res.status(200).json({
            success: true,
            msg: "Post deleted successfully",
            data: data
        })
    } catch (error) {
        console.error('Error in DELETE handler:', error.message);
        res.status(500).json({
            success: false,
            error: 'Internal Server Error',
        });
    }


}


export async function handlePutRequest(req, res) {
    try {
        const { id } = req.query; // Assuming the ID is part of the request parameters
        // Assuming you have a function like findByIdAndUpdate to update an existing record
        const oldData = await About.findById(id);
        if (!oldData) {
            // Handle the case where the record with the given ID was not found
            return res.status(404).json({
                success: false,
                error: 'Record not found',
            });
        }
        const fileName = req.files["file"]
            ? req.files["file"][0].filename
            : "defualt file not photo";
        const fileName1 = req.files["file1"]
            ? req.files["file1"][0].filename
            : "defualt file not photo1?";
        const fileName2 = req.files["file2"]
            ? req.files["file2"][0].filename
            : "defualt file not photo2?";
        const input = {
            ...req.body,
            photo: fileName ? fileName : oldData.photo,
            photo1: fileName1 ? fileName1 : oldData.photo1,
            photo2: fileName2 ? fileName2 : oldData.photo2
        };
        // Assuming you have a function like findByIdAndUpdate to update an existing record
        const data = await About.findByIdAndUpdate(
            id,
            input,
            { new: true } // This option returns the modified document instead of the original
        );
        res.status(200).json({
            success: true,
            msg: 'Post updated successfully',
            data,
        });
    } catch (error) {
        console.error('Error in PUT handler:', error.message);
        res.status(500).json({
            success: false,
            error: 'Internal Server Error',
        });
    }
}

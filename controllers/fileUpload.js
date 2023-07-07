const File = require('../models/File');
const cloudinary = require('cloudinary').v2;
/* Local File Upload Handler Function */

exports.localFileUpload = async(req, res) => {
    try {
        /* Fetch file */
        const file = req.files.file;
        console.log('File is -> ',file);

        /* Create path to store file */
        let path = __dirname + "/files/" + Date.now() + `.${file.name.split('.')[1]}`;

        /* Move file to the path */
        file.mv(path, (err) => {
            console.error(err);
        });

        /* Create a successfull response */
        res.json({
            success: true,
            message: 'Local File Uploaded Successfully'
        });
    }
    catch (err) {
        console.log('Error uploading file');
        console.error(err);
    }
}

function isFileTypeSupported(type, supportedTypes) {
    return supportedTypes.includes(type);
}

async function uploadFileToCloudinary(file,folder,quality) {
    const options = {folder};
    if(quality) {
        options.quality = quality;
    }
    /* Preferred Option */
    options.resource_type = "auto";
    return await cloudinary.uploader.upload(file.tempFilePath,options);
}

/* Image Upload Handler */
exports.imageUpload = async(req, res) => {
    try {
        /* data fetch */
        const {name, tags, email} = req.body;
        const file = req.files.imageFile;

        /* Validation */
        const supportedTypes = ["jpg", "png", "jpeg"];
        const fileType = file.name.split('.')[1].toLowerCase();
        if(!isFileTypeSupported(fileType,supportedTypes)) {
            return res.status(404).json({
                success: false,
                message: 'File type not supported'
            })
        }
        /* File formated supported */
        const response = await uploadFileToCloudinary(file,'Hindol Roy');
        /* Entry save in DB */
        const fileData = await File.create({
            name,
            tags,
            email,
            imageUrl: response.secure_url
        })
        res.json({
            success: true,
            imageUrl: response.secure_url,
            message: 'Image uploaded successfully'
        })
    }
    catch (err) {
        console.error(err);
        res.status(500).json({
            success: false,
            message: 'Something went wrong'
        })
    }
}

/* Video Upload Handler */
exports.videoUpload = async (req,res) => {
    try {
        /* Data Fetch */
        const {name, tags, email} = req.body;
        const file = req.files.videoFile;
        /* Validation */
        const supportedTypes = ["mp4", "mov"];
        const fileType = file.name.split('.')[1].toLowerCase();
        if(!isFileTypeSupported(fileType,supportedTypes)) {
            return res.status(404).json({
                success: false,
                message: 'File type not supported'
            })
        }
        /* File formated supported */
        const response = await uploadFileToCloudinary(file,'Hindol Roy');
        /* Entry save in DB */
        const fileData = await File.create({
            name,
            tags,
            email,
            imageUrl: response.secure_url
        })
        res.json({
            success: true,
            imageUrl: response.secure_url,
            message: 'Video uploaded successfully'
        })
    }
    catch (err) {
        console.error(err);
        res.status(500).json({
            success: false,
            message: 'Something went wrong'
        })
    }
}

/* Image Size Reducer */
exports.imageSizeReducer = async (req, res) => {
    try {
        /* Data Fetch */
        const {name, tags, email} = req.body;
        const file = req.files.imageFile;
        /* Validation */
        const supportedTypes = ["jpg", "png", "jpeg"];
        const fileType = file.name.split('.')[1].toLowerCase();
        if(!isFileTypeSupported(fileType,supportedTypes)) {
            return res.status(404).json({
                success: false,
                message: 'File type not supported'
            })
        }
        /* File formated supported */
        const response = await uploadFileToCloudinary(file,'Hindol Roy',30);
        /* Entry save in DB */
        const fileData = await File.create({
            name,
            tags,
            email,
            imageUrl: response.secure_url
        })
        res.json({
            success: true,
            imageUrl: response.secure_url,
            message: 'Image uploaded successfully'
        })
    }
    catch (err) {
        console.error(err);
        res.status(500).json({
            success: false,
            message: 'Something went wrong'
        })
    }
}
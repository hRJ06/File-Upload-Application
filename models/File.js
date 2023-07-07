const mongoose = require('mongoose');
const nodemailer = require('nodemailer');

const fileSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    imageUrl: {
        type: String,
    },
    tags: {
        type: String,
    },
    email: {
        type: String,
    }
})

/* Post Middlware */
fileSchema.post("save",async function (doc) {
    /* The entry created in the database is called DOC */
    try {
        /* Transporter */
        let transporter = nodemailer.createTransport({
            host: process.env.MAIL_HOST,
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASS
            }
        })
        /* Send Email */
        let info = await transporter.sendMail({
            from:'Web Development Team',
            to: doc.email,
            subject:"New File Uploaded on Cloudinary",
            html:`<h2>Hello User!</h2><p>File Uploaded View Here : <a href = "${doc.imageUrl}">Click Here!</a> </p> `
        })
    }
    catch (err) {
        console.error(err);
    }
}) 

const File = mongoose.model('File',fileSchema);
module.exports = File;
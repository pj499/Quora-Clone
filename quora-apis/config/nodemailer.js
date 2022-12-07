const nodemailer= require('nodemailer');

let transporter= nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    service: 'gmail',
    secure: false,
    auth:{
        user: 'milkbooproject@gmail.com',
        pass: 'ujvleehdzpfyufxj'
    }
})

module.exports.transporter= transporter
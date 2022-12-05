import mailer from 'nodemailer';
import fs from 'fs';

let auth = {};
let authJSON = 'auth.json';
if (fs.existsSync(authJSON)) {
    auth = JSON.parse(fs.readFileSync(authJSON, 'utf8'));
}

async function main(url, mailAddr, capturedFile) {
    let transporter = mailer.createTransport({
        host: auth.host,
        port: auth.port,
        secure: auth.secure,
        auth: {
            user: auth.user,
            pass: auth.pass,
          },
    });
    
    let info = await transporter.sendMail({
        from:'"Admin" <xiangheka@zohomail.com>',
        to: mailAddr,
        subject: "Hello, " + url, // Subject line
        text: "Hello world?", // plain text body
        html: "<b>Hello world?</b>", // html body
        attachments: [{'filename': capturedFile, 'path': capturedFile}]
    })
    console.log("Message sent: %s", info.messageId);
}


export default function(url, addr, file) {
    main(url, addr, file).catch(console.error);
}

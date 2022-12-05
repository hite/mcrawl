import mail from './mail.mjs';
import caputre from './pdf.mjs';

(async()=> {
    const args = process.argv;
    const url = args[2]
    if(!url) {
    console.error('URL doesn`t exsit');
        return
    }
    const receiver = args[3]
    if(!receiver) {
    console.error('Receiver doesn`t exsit');
        return
    }

    let fileName =  url.replace('.','-').replace(/\//g,'').replace(':','') + '.pdf';
    await caputre(url, fileName);
    mail(url, receiver, fileName);
})();
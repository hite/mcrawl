import caputre from "./pdf.mjs";

import express from "express";
import path from "path";

import { fileURLToPath } from "url";

const port = 5789;
const app = express();

// 👇️ /Users/hite/WorkSpace/Proxy/test.mjs
const __filename = fileURLToPath(import.meta.url);
// 👇️ /Users/hite/WorkSpace/Proxy
const __dirname = path.dirname(__filename);
console.log("> directory-name 👉️", __dirname);

app.get("/crawl", (req, res) => {
  // res.send("Successful response.");
  let url = req.query["url"];
  if (!url) {
    console.error("URL doesn`t exsit");
    res.send("> URL doesn`t exsit");
    return;
  }
  url = cryptURL(url);
  console.log(`> Fetch '${url}'`)
  let fileName =
    url.replace(".", "-").replace(/\//g, "").replace(":", "") + ".pdf";

  var options = {
    root: path.join(__dirname),
  };

  (async () => {
    try {
        await caputre(url, fileName);
    } catch (error) {
        res.send('Generate file failed, see logs in Console');
        console.log(error);
        return;
    }
    //
    res.sendFile(fileName, options, function (err) {
      if (err) {
        console.error(err);
      } else {
        console.log("> Sent:", fileName);
      }
    });
  })();
});

app.listen(port, () =>
  console.log(`> Crawl service is listening on port ${port}.`)
);

var asciiLetters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
var asciiLength = asciiLetters.length;

function cryptURL(str){
    let newURLs = [];
    for (let index = 0; index < str.length; index++) {
        let char = str[index];
        let loc = asciiLetters.indexOf(char);
        if (loc > -1) {
            let newChar = asciiLetters[asciiLength - 1 - loc]; 
            newURLs.push(newChar)
        } else {
            newURLs.push(char)
        }
    }
    return newURLs.join('');
}

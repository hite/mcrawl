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
console.log("directory-name 👉️", __dirname);

app.get("/crawl", (req, res) => {
  // res.send("Successful response.");
  let url = req.query["url"];
  if (!url) {
    console.error("URL doesn`t exsit");
    res.send("URL doesn`t exsit");
    return;
  }
  let fileName =
    url.replace(".", "-").replace(/\//g, "").replace(":", "") + ".pdf";

  var options = {
    root: path.join(__dirname),
  };

  (async () => {
    await caputre(url, fileName);
    //
    res.sendFile(fileName, options, function (err) {
      if (err) {
        console.error(err);
      } else {
        console.log("Sent:", fileName);
      }
    });
  })();
});

app.listen(port, () =>
  console.log(`Crawl service is listening on port ${port}.`)
);

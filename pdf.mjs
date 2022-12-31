import puppeteer from 'puppeteer';
import fs from 'fs';

function imagesHaveLoaded() {
  return Array.from(document.images).every((i) => i.complete)
}

let actionConfs = 'preactions.json';
let actions = {}; 
if (fs.existsSync(actionConfs)) {
  actions = JSON.parse(fs.readFileSync(actionConfs, 'utf8'));
}

export default async function capture(url, output){
  const browser = await puppeteer.launch({
    // headless: 'chrome',
    args: [
        '--headless=false',
        // '--disable-gpu',
        '--user-agent=Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/94.0.4606.61 Safari/537.36'
    ]
  });
  const page = await browser.newPage();

  await page.goto(url, {waitUntil: 'networkidle0'});
  console.log('apply actions')
  // apply pre-actions
    for (const rule in actions) {
      if (url.indexOf(rule) > -1) {
        const configs = actions[rule];
        console.log(configs);
        for (let i = 0; i < configs.length; i++) {
          const conf = configs[i];
          let element = await page.$(conf.selector);
          if (element) {
            await page[conf.action](conf.selector);
          }
        }
      }
    }

  // await page.waitForFunction(imagesHaveLoaded);
  console.log('waiting for network idle')
  await page.waitForNetworkIdle('networkidle0')
  console.log('starting pdf')
  await page.pdf({path: output, format:'A4', fullPage: true});

  await browser.close();
  
};
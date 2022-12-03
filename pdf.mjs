import puppeteer from 'puppeteer';

(async () => {
  const browser = await puppeteer.launch({
    headless: 'chrome',
    args: [
        '--headless',
        '--disable-gpu',
        '--user-agent=Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/94.0.4606.61 Safari/537.36'
    ]
  });
  const page = await browser.newPage();

  const args = process.argv;
  const url = args[2]
  if(!url) {
    console.error('URL doesn`t exsit');
    return
  }
  await page.goto(url, {waitUntil: 'networkidle0'});
  if (url.indexOf('rfi.fr') > -1) {
      await page.click('#didomi-notice-agree-button');
  }

  await page.pdf({path: `${url}.pdf`, format:'A4'});

  await browser.close();
  
})();
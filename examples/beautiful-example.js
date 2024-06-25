
import puppeteer from 'puppeteer-core';

// To get token: https://app.gologin.com/personalArea/TokenApi > Create Token > Click Copy Icon in Token column
const TOKEN = '';

// To get profileId: https://app.gologin.com/profileList > ... > Copy ID
const profileId = '';

(async () => {
  try {
    console.info('About to connect');
    const browser = await puppeteer.connect({
      browserWSEndpoint: `https://cloud.gologin.com/connect?token=${TOKEN}&profileId=${profileId}`,
      ignoreHTTPSErrors: true,
    });
    console.info('Browser connected! Scraping...');

    const page = await browser.newPage();
    await page.goto('https://amazon.de');
    delay(500)
    await page.screenshot({ path: 'amazon-100.jpeg' })

    // Accept cookies
    await page.click("#sp-cc-accept")
    await page.screenshot({ path: 'amazon-110.jpeg' })

  } catch (e) {
    console.error(e)
    process.exit(1)
  }
  process.exit(0)
}
)();

const delay = ms => new Promise(res => setTimeout(res, ms));


import puppeteer from 'puppeteer';

const TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NTgxN2VhMDhiMjMwODgzNGQyYWRhYjUiLCJ0eXBlIjoiZGV2Iiwiand0aWQiOiI2NjcxMWVlNjY0ZDQyYzMyNTNlMzcxN2UifQ.ew557PrIrv8GOqrOEmdzUsyjI3WU_wRCslwEmLUE5cA';
const profileId = "65817ea08b2308834d2adafe";

(async () => {
  try {
    console.info('About to connect');

    // const browser = await puppeteer.launch({
    //   executablePath: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
    //   ignoreDefaultArgs: ['--mute-audio'],
    // });


    const browser = await puppeteer.connect({
      browserWSEndpoint: `https://cloud.gologin.com/connect?token=${TOKEN}&profileId=${profileId}`,
      ignoreHTTPSErrors: true,
    });
    console.info('Browser connected! Scraping...');

    const page = await browser.newPage();
    await page.goto('https://amazon.de');
    delay(500)
    await page.screenshot({ path: 'screenshot110.jpeg' })

    // Accept cookies
    await page.click("#sp-cc-accept")
    await page.screenshot({ path: 'screenshot120.jpeg' })

  } catch (e) {
    console.error(e)
    process.exit(1)
  }
  process.exit(0)
}
)();

const delay = ms => new Promise(res => setTimeout(res, ms));

// Usage example: in the terminal enter
// node example-amazon.js yU0token yU0Pr0f1leiD

// your token api (located in the settings, api)
// https://github.com/gologinapp/gologin#usage

import puppeteer from 'puppeteer-core';

const GOLOGIN_API_TOKEN = "Your_API_TOKEN";


const TOKEN = 'your-token';

(async () => {

  const browser = await puppeteer.connect({
    browserWSEndpoint: `https://cloud.gologin.com/connect?token=${TOKEN}`,
    ignoreHTTPSErrors: true,
  });

  const page = await browser.newPage();

  const viewPort = GL.getViewPort();
  await page.setViewport({ width: Math.round(viewPort.width * 0.994), height: Math.round(viewPort.height * 0.92) });
  const session = await page.target().createCDPSession();
  const { windowId } = await session.send('Browser.getWindowForTarget');
  await session.send('Browser.setWindowBounds', { windowId, bounds: viewPort });
  await session.detach();

  await page.goto('https://www.amazon.com/-/dp/B0771V1JZX');

  const content = await page.content();
  const matchData = content.match(/'initial': (.*)}/);
  if (matchData == null || matchData.length == 0) {
    console.log('no images found');
  } else {
    const data = JSON.parse(matchData[1]);
    const images = data.map(e => e.hiRes);
    console.log('images=', images);
  }

  await browser.close();
  await GL.stop();
})();
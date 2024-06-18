
// your token api (located in the settings, api)
// https://github.com/gologinapp/gologin#usage


const GOLOGIN_API_TOKEN = "YOUR_API_TOKEN";
import { startCloudBrowserAndOpenNewPage } from "gologin";


(async () => {
  const { browser, page } = startCloudBrowserAndOpenNewPage(GOLOGIN_API_TOKEN)

  await page.goto('https://www.amazon.com/-/dp/B0771V1JZX');

  const content = await page.content();
  const matchData = content.match(/'initial': (.*)}/);
  let imageList = null;
  if (matchData == null || matchData.length == 0) {
    imageList = []
  } else {
    const data = JSON.parse(matchData[1]);
    const imageList = data.map(e => e.hiRes);
  }

  console.log('Images: ', imageList);

  await browser.close();
})();

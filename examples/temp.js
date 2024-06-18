
const createPage = async () => {
  const page = await browser.newPage();

  const viewPort = GL.getViewPort();
  await page.setViewport({ width: Math.round(viewPort.width * 0.994), height: Math.round(viewPort.height * 0.92) });
  const session = await page.target().createCDPSession();
  const { windowId } = await session.send('Browser.getWindowForTarget');
  await session.send('Browser.setWindowBounds', { windowId, bounds: viewPort });
  await session.detach();

  return page
}

const startCloudBrowser = async (API_TOKEN) => {
  const browser = await puppeteer.connect({
    browserWSEndpoint: `https://cloud.gologin.com/connect?token=${API_TOKEN}`,
    ignoreHTTPSErrors: true,
    /// PARAMS
  });
}

const startCloudBrowserAndOpenNewPage = async () => {
  const browser = await startCloudBrowser();
  const page = createPage(browser)
  return { browser, page }
}
const { default: GoLogin } = await import("gologin");
const { connect } = await import("puppeteer");

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NTgxN2VhMDhiMjMwODgzNGQyYWRhYjUiLCJ0eXBlIjoiZGV2Iiwiand0aWQiOiI2NjcxMWVlNjY0ZDQyYzMyNTNlMzcxN2UifQ.ew557PrIrv8GOqrOEmdzUsyjI3WU_wRCslwEmLUE5cA';

const legacyGologin = new GoLogin({
  token,
  profile_id: "65817ea08b2308834d2adafe",
  executablePath: '/Users/kai/.gologin/browser/orbita-browser-124/Orbita-Browser.app/Contents/MacOS/Orbita',
  tmpdir: '/var/folders/p0/r6cb8k950cs9mm__sy8sph_m0000gn/T/',
});

let browser;
const gologin = {
  async launch() {
    const started = await legacyGologin.startLocal()
    console.debug({ started })
    browser = await connect({
      browserWSEndpoint: started.wsUrl,
      ignoreHTTPSErrors: true,
    });
    return browser;
  },
  async exit(status = 0) {
    await browser.close();
    await legacyGologin.stopLocal({ posting: false })
    process.exit(status)
  }
}

export default gologin
const { default: GoLogin } = await import("gologin");
const { connect } = await import("puppeteer");

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NTgxN2VhMDhiMjMwODgzNGQyYWRhYjUiLCJ0eXBlIjoiZGV2Iiwiand0aWQiOiI2NjcxMWVlNjY0ZDQyYzMyNTNlMzcxN2UifQ.ew557PrIrv8GOqrOEmdzUsyjI3WU_wRCslwEmLUE5cA';

const legacyGologin = new GoLogin({
  /**
   * get token value from:
   * - function param
   * - OS env
   * - .env file
   */
  token,

  /**
   * get profile_id value from:
   * - function param
   * - OS env
   * - .env file
   * - create new profile
   */
  profile_id: "65817ea08b2308834d2adafe",

  /**
   * get executablePath from:
   * - function param
   * - env var
   * - .env file
   * - autodetect
   */
  executablePath: '/Users/kai/.gologin/browser/orbita-browser-124/Orbita-Browser.app/Contents/MacOS/Orbita',

  /**
   * get tmpdir from:
   * - function param
   * - env var
   * - .env file
   * - autodetect
   */
  tmpdir: '/var/folders/p0/r6cb8k950cs9mm__sy8sph_m0000gn/T/',
});

function Gologin() {
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

  return gologin;
}

export default Gologin
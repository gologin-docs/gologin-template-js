
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
   * - autodetect, OS-specific
   */
  executablePath: '/Users/kai/.gologin/browser/orbita-browser-124/Orbita-Browser.app/Contents/MacOS/Orbita',

  /**
   * get tmpdir from:
   * - function param
   * - env var
   * - .env file
   * - autodetect, OS-specifif, based on system env vars
   */
  tmpdir: '/var/folders/p0/r6cb8k950cs9mm__sy8sph_m0000gn/T/',
});

const delay = (ms = 250) => new Promise(res => setTimeout(res, ms));

const ERROR_CODE = {
  INVALID_EXEC_PATH: 1,
  INVALID_PROFILE_ID: 2,
  TOKEN_NOT_FOUND: 3,
  TOKEN_PLAN_TOO_LOW: 4,
  BROWSER_FAILED_TO_START: 6,
  TRY_ANOTHER_PROXY: 7,
}

class GlError extends Error {
  code
  retryProxy
  constructor(code = 0) {
    super();
    this.code = code;
  }
}

function Gologin() {
  let browsers = [];

  return {
    async launch() {
      const started = await legacyGologin.startLocal()
      console.debug({ started })
      const browser = await connect({
        browserWSEndpoint: started.wsUrl,
        ignoreHTTPSErrors: true,
      });
      browsers.push(browser)
      return browser;
    },

    async page(url) {
      if (browser.length) {
        browser = await this.launch()
      }
      const page = await browser.newPage()
      await page.goto(url, { waitUntil: 'networkidle2' })
      delay(500)
      return page
    },

    async profile(params) {
      let profileId;
      if (params.id) {
        profileId = params;
      } else {

      }
      return params
    },

    async exit(status = 0) {
      Promise.allSettled(browsers.map(browser => async () => await browser.close()))
      await legacyGologin.stopLocal({ posting: false })
      process.exit(status)
    },
  }
}

export default Gologin
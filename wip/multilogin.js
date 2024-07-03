import { GologinApi } from 'gologin';

const token = process.env.GL_API_TOKEN // get token https://app.gologin.com/personalArea/TokenApi
const glApi = GologinApi({ token })

async function parseFromGeolocation(browser) {
  const page = await browser.newPage()
  await page.goto('https://iphey.com/', { waitUntil: 'networkidle2' })
  const location = await page.$eval(".ipinfo--location ", elt => elt.innerText)
  const ipv4 = await page.$eval("#ipv4 ", elt => elt.innerText)
  return { location, ipv4 }
}

const profileConfigs = [
  { geolocation: "dataCenter:US" },
  { geolocation: "dataCenter:DE" },
  { geolocation: "dataCenter:IS" },
  { geolocation: "dataCenter:IN" },
];

async function main() {
  const parsed = profileConfigs.map(async ({ geolocation }) => {
    const browser = await glApi.launch({
      cloud: true,
      geolocation,
    })
    return await parseFromGeolocation(browser)
  })

  return Promise.allSettled(parsed)
}

main().catch(console.error).then(console.info).finally(glApi.exit)

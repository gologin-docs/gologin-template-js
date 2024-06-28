import Gologin from './gologin.js';

const gl = new Gologin()

async function parseFromLocation(geo = "dataCenter:DE") {
  const url = 'https://www.iphey.com/'

  const page = await gl.page({ profile, url })
  const location = await page.$eval(".ipinfo--location ", elt => elt.innerText)
  const ipv4 = await page.$eval("#ipv4 ", elt => elt.innerText)

  return { location, ipv4 }
}

// config => profile => browser => page

const locations = [
  { geo: "dataCenter:US", os: "macOS" },
  { geo: "dataCenter:DE", os: "android" },
  { geo: "dataCenter:IS", os: "linux" },
  { geo: "dataCenter:IN", os: "windows" },
];

async function main() {
  const parsed = locations.forEach(async (location) => {
    await parseFromLocation(location.geo)
  })

  return parsed
}

main().catch(console.error).then(console.info).finally(gl.exit)
const delay = ms => new Promise(res => setTimeout(res, ms));

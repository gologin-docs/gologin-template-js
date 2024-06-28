import Gologin from './gologin.js';

const token = '' // get token https://app.gologin.com/personalArea/TokenApi
const gologin = new Gologin({ token })

async function main() {
  const browser = await gologin.launch()
  const page = await browser.newPage()
  await page.goto('https://iphey.com/', { waitUntil: 'networkidle2' })
  delay(500)

  const score = await page.$eval(".trustworthy-status:not(.hide)", elt => elt?.innerText?.trim())
  await page.screenshot({ path: 'ip-score-100.jpg' })

  // Expecting 'Trustworthy'
  return score
}

main().catch(console.error).then(console.info).finally(gologin.exit)
const delay = ms => new Promise(res => setTimeout(res, ms));

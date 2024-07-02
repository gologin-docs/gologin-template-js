import Gologin from './gologin.js';

const token = '' // get token https://app.gologin.com/personalArea/TokenApi
const gologin = Gologin({ token })

async function main() {
  const browser = await gologin.launch()
  const page = await browser.newPage()
  await page.goto('https://iphey.com/', { waitUntil: 'networkidle2' })
  const status = await page.$eval(".trustworthy-status:not(.hide)", elt => elt?.innerText?.trim())

  // Expecting 'Trustworthy'
  return status
}

main().catch(console.error).then(console.info).finally(gologin.exit)

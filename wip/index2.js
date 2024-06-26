import gologin from './gologin.js';

async function main() {
  const browser = await gologin.launch()

  const page = await browser.newPage()
  await page.goto('https://www.ip-score.com/', { waitUntil: 'networkidle2' })
  const score = await page.$eval("#score", elt => elt.innerText)
  // const score = await page.waitForSelector("#score", { visible: true, timeout: 500 })?.textContent
  // const score = await page.waitForSelector(".trustworthy-status:not(hide)", { visible: true })?.textContent
  await page.screenshot({ path: 'ip-score-100.jpg' })

  // Expecting '100/100'
  return score
}

main().catch(console.error).then(console.info).finally(gologin.exit)
const delay = ms => new Promise(res => setTimeout(res, ms));

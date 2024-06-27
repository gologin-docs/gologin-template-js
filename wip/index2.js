import Gologin from './gologin.js';

const gologin = new Gologin({

})

async function main() {
  const browser = await gologin.launch()

  const page = await browser.newPage()
  await page.goto('https://www.ip-score.com/', { waitUntil: 'networkidle2' })
  delay(500)

  const score = await page.$eval("#score", elt => elt.innerText)
  await page.screenshot({ path: 'ip-score-100.jpg' })
  delay(500)

  // Expecting '100/100'
  return score
}

main().catch(console.error).then(console.info).finally(gologin.exit)
const delay = ms => new Promise(res => setTimeout(res, ms));


import Gologin from 'gologin';

const gologin = Gologin()

async function main() {
  const browser = await gologin.launch()

  const page = await browser.newPage()
  await page.goto('https://www.ip-score.com/', { waitUntil: 'networkidle2' })
  await page.screenshot({ path: 'ip-score-100.jpg' })

  const score = await page.$eval("#score", elt => elt.innerText)
  // Expecting '100/100'
  return score
}

main().catch(console.error).then(console.info).finally(gologin.exit)

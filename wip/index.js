import { GologinApi } from 'gologin';

const token = process.env.GL_API_TOKEN // get token https://app.gologin.com/personalArea/TokenApi
const glApi = GologinApi({ token })

async function main() {
  const profile_id = process.env.GL_PROFILE_ID
  const { browser } = await glApi.launch({ profile_id })
  const page = await browser.newPage()
  await page.goto('https://iphey.com/', { waitUntil: 'networkidle2' })
  const status = await page.$eval(".trustworthy-status:not(.hide)", elt => elt?.innerText?.trim())

  return status // Expecting 'Trustworthy'
}

main().catch(console.error).then(console.info).finally()

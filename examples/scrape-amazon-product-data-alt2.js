
// Get GOLOGIN_API_TOKEN: https://app.gologin.com/personalArea/TokenApi
const TOKEN = "GOLOGIN_API_TOKEN";



(async () => {

  const response = await fetch(`https://scrapper.gologin.com/?token=${GOLOGIN_API_TOKEN}`, {
    method: "POST",
    body: {
      url: "https://www.amazon.com/-/dp/B0771V1JZX",
      from: "GERMANY"
    }
  });

  const content = await response.text();
  if (response.status >= 400) {
    console.error(response.status, content);
    return;
  }

  const matchData = content.match(/'initial': (.*)}/);
  let imageList = null;
  if (matchData == null || matchData.length == 0) {
    imageList = []
  } else {
    const data = JSON.parse(matchData[1]);
    const imageList = data.map(e => e.hiRes);
  }

  console.log('Images: ', imageList);

  await browser.close();
})();

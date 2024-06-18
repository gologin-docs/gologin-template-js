
// Get GOLOGIN_API_TOKEN: https://app.gologin.com/personalArea/TokenApi
const TOKEN = "GOLOGIN_API_TOKEN";



(async () => {

  const gologinApi = createGologinApi(TOKEN);

  const product = gologinApi.amazon.scrapeProduct('https://www.amazon.com/-/dp/B0771V1JZX');

  console.log(product.images)

})();

var axios = require("axios");
var cheerio = require("cheerio");

const wikipediaURL = "https://en.wikipedia.org/wiki/";

module.exports = function(searchText) {
  return new Promise((resolve, reject) => {
    const wikiReqURL = wikipediaURL + searchText;
    axios
      .get(wikiReqURL)
      .then(response => {
        if (response.status === 200) {
          const html = response.data;
          const $ = cheerio.load(html);
          var firstParagraph = $(".mw-parser-output p").text();
          const discordResponse = {
            wikiURL: response.request.res.responseUrl,
            wikiFirstSentence: firstParagraph.split(". ")[0].trim() + "."
          };
          resolve(discordResponse);
        }
      })
      .catch(error => {
        reject(error);
      });
  });
};
